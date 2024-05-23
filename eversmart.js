
const baseURL = "http://localhost:3000/"


// let myCart = [];
let productsArray = [];


//******************************************MAIN CODE BEGINS HERE*************************************************//

let isLoggedIn = false;
let currentUser = {}


document.addEventListener("DOMContentLoaded", () => {

    const homeBtn = document.getElementById("app-home");
    const cartBtn = document.getElementById("app-cart");
    const authBtn = document.getElementById("app-auth");

    const btnProceed=document.getElementById("app-order");


    const homeView = document.getElementById('dc-home');
    const cartView = document.getElementById('dc-cart');
    const authView = document.getElementById('dc-auth');
    const prodView = document.getElementById('dc-prod');
    const orderView = document.getElementById('dc-orders');

    //   Switch view 
    const views = [homeView, cartView, authView, prodView,orderView];

    function showView(viewToShow) {
        views.forEach(view => {
            if (view === viewToShow) {
                // if (view === cartView && !isLoggedIn) {

                //     alert("Please log in to access the cart");
                //     showView(homeView);
                //     return;
                // }


                if (view === cartView) {
                    loadCartData()
                }

                view.style.display = 'flex';
            } else {
                view.style.display = 'none';
            }
        });
    }

    homeBtn.addEventListener('click', () => showView(homeView));

    cartBtn.addEventListener('click', () => showView(cartView));

    authBtn.addEventListener('click', () => showView(authView));
    btnProceed.addEventListener('click', () => showView(orderView));

    cartBtn.onclick = () => {

        loadCartData();

    }

    //  Initialize to home view
    // showView(homeView);
    // showView(prodView);

    showView(cartView);



});



loadAllProducts();
async function loadAllProducts() {

    const url = "http://localhost:3000/products";

    let response = await fetch(url);
    productsArray = await response.json();



    const productsTV = document.getElementById("displayProducts");

    for (let prod of productsArray) {

        let formattedPrice = parseFloat(prod.price);

        let priceString = formattedPrice.toFixed(2);


        productsTV.innerHTML += `
        <div class="product-card">
            <img src="${prod.imageUrl}"
                alt="product">
            <div class="card-text">
                <h3>${prod.name}</h3>
                <p>${prod.stock} in stock</p>
            </div>
            <p>Ksh ${priceString} </p>
            <input type="button" value="Add to Cart" onclick="addToCart(${prod.id},${prod.stock} )">
        </div>
      `;

    }

}


async function addToCart(id, inStock) {
    let productQuantity = getUserQuantityInput();

    if (productQuantity <= 0) {
        alert("Please enter a valid quantity");
        return;
    }
    if (productQuantity > inStock) {
        alert("Sorry, we only have " + inStock + " in stock");
        return;
    }



    await fetch('http://localhost:3000/products')  // Replace with your actual server URL
        .then(response => response.json())
        .then(data => {
            const products = data;
            // console.log(products);  // This will log the entire "products" array

            // Access individual product objects within the array
            for (const product of products) {
                if (product.id == id) {
                    const cartItem = {
                        id: product.id,
                        imageUrl: product.imageUrl,
                        name: product.name,
                        price: product.price,
                        cartItemSubTotal: product.price * productQuantity,
                        quantity: productQuantity,
                        description: product.description
                    };

                    // myCart.push(cartItem);
                    sendRequest(cartItem)

                    break;
                }
            }
        })
        .catch(error => console.error(error));


}

async function sendRequest(cart_item) {

    console.log("Passed item", cart_item)

    // Make the POST request to save the added product to the cart
    await fetch('http://localhost:3000/mycart', {
        method: "POST",
        body: JSON.stringify(cart_item),
        headers: {
            "Content-Type": "application/json"
        }
    });


}

function getUserQuantityInput() {
    let quantity;
    let usrInput;
    do {
        usrInput = prompt("Please enter the quantity:");
        if (usrInput !== "") {
            quantity = parseInt(usrInput);
            if (isNaN(quantity)) {
                alert("Please enter a valid number");
            }
        } else {
            alert("Please enter a valid quantity");
        }
    } while (isNaN(quantity) || quantity <= 0);

    return quantity;
}


function loadCartData() {

    console.log("Loading Cart")
    const cartTV = document.getElementById("displayCartItems");

    fetch('http://localhost:3000/mycart')  // Replace with your actual server URL
        .then(response => response.json())
        .then(data => {
            const allCartItems = data;

            // Access individual product objects within the array
            for (const cartItem of allCartItems) {

                const existingItem = document.querySelector(`div.cart-item-card img[src="${cartItem.imageUrl}"]`);

                if (existingItem) {
                    // Update the existing cart item
                    existingItem.parentElement.querySelector('span').textContent = cartItem.quantity;
                    existingItem.parentElement.querySelector('h4').textContent = "Total Ksh: " + cartItem.price.toFixed(2) * cartItem.quantity;


                } else {
                    // Add a new cart item

                    let formattedPrice = parseFloat(cartItem.price);

                    let priceString = formattedPrice.toFixed(2);

                    cartTV.innerHTML += `
                        <div class="cart-item-card">
                            <img src="${cartItem.imageUrl}">
                            <div class="card-content">
                                <ion-icon onclick="removeCartItem(${cartItem.id})" name="trash-outline"></ion-icon>
                                <h3>${cartItem.name}</h3>
                                <p>Ksh: ${priceString} </p>
                                <p id="desc">${cartItem.description}<p>
                                <h4>Sub Total Ksh: ${cartItem.cartItemSubTotal}</h4>
           
                                <div class="modify-cart">
                                    <input onclick="reduceQuantity(${cartItem.id})" id="btnMinus" type="button" value="-">
                                    <span>${cartItem.quantity}</span>
                                    <input onclick="increaseQuantity(${cartItem.id})" id="btnPlus" type="button" value="+">
                                </div>

                            </div>
                        </div>
                    `;
                }






                //console.log(cartItem.name);  // Replace "name" with the actual property you want to access
            }
        })
        .catch(error => console.error(error));


     calculateCartGrandTotal();
}

// async function getData(url) {
//     await fetch(url)  // Replace with your actual server URL
//         .then(response => response.json())
//         .then(data => {
//             const resopnseArray = data;
//             return resopnseArray.json();
//         })
//         .catch(error => console.error(error));
// }




async function reduceQuantity(id) {


    await fetch('http://localhost:3000/mycart')
        .then(response => response.json())
        .then(data => {
            const allCartItems = data;
            // Access individual product objects within the array
            for (const cartItem of allCartItems) {

                if (cartItem.id == id) {

                    if (cartItem.quantity > 1) {
                        cartItem.quantity -= 1;
                        let newCartSubtotal = cartItem.price * cartItem.quantity


                        const updatedCartItem = {
                            id: cartItem.id,
                            imageUrl: cartItem.imageUrl,
                            name: cartItem.name,
                            price: cartItem.price,
                            cartItemSubTotal: newCartSubtotal,
                            quantity: cartItem.quantity,
                            description: cartItem.description
                        };
                        sendUpdateRequest('http://localhost:3000/mycart/', updatedCartItem);


                    } else {
                        alert("Quantity cannot be reduced further");
                        return;
                    }
                }

            }

        })
        .catch(error => console.error(error));

    // loadCartData();

}

function sendUpdateRequest(url, { id, ...obj }) {


    console.log("sendUpdate request HAS BEEN CALLED");
    // Make the POST request to save the added product to the cart
    fetch(url + id, {
        method: "PUT",
        body: JSON.stringify(obj),
        headers: {
            "Content-Type": "application/json"
        }
    });

}



async function increaseQuantity(id) {

    let product = {};

    fetch('http://localhost:3000/products/' + id)
        .then(response => response.json())
        .then(data => {
            product = data;




            fetch('http://localhost:3000/mycart/' + id)
                .then(response => response.json())
                .then(data => {
                    const cartItem = data;

                    if (cartItem.quantity < product.stock) {
                        cartItem.quantity += 1;

                        let newCartSubtotal = cartItem.price * cartItem.quantity


                        const updatedCartItem = {
                            id: cartItem.id,
                            imageUrl: cartItem.imageUrl,
                            name: cartItem.name,
                            price: cartItem.price,
                            cartItemSubTotal: newCartSubtotal,
                            quantity: cartItem.quantity,
                            description: cartItem.description
                        };
                        sendUpdateRequest('http://localhost:3000/mycart/', updatedCartItem);


                    } else {
                        alert("Quantity cannot be increased further. Only " + product.stock + " in stock.");
                        return;
                    }
                }
                );


        });


}

async function removeCartItem(id) {

    let url = "http://localhost:3000/mycart/" + id;

    await fetch(url, {
        method: "DELETE"
    });


}

function calculateCartGrandTotal() {


    fetch('http://localhost:3000/mycart')
        .then(response => response.json())
        .then(data => {
            const allCartItems = data;


            let total = 0;
            const cartTotalTv = document.getElementById('displayCartGrandTotal');

            // Access individual product objects within the array
            for (const cartItem of allCartItems) {

                // console.log(cartItem.cartItemSubTotal);

                total += cartItem.cartItemSubTotal;
                cartTotalTv.innerHTML = "Ksh " + total.toFixed(2);
            }







        })
        .catch(error => console.error(error));


    // let total = 0;
    // myCartArray.forEach(cartItem => {
    //     total += cartItem.cartItemSubTotal;
    // });

    // // Update the HTML content of the cart total element
    // const cartTotalTv = document.getElementById('displayCartGrandTotal');
    // cartTotalTv.innerHTML = "Ksh " + total.toFixed(2);

}



const registerBtn = document.getElementById("btnRegister");
registerBtn.addEventListener("click", registerUser);


async function registerUser() {

    let url = "http://localhost:3000/users";
    let userName = document.getElementById("edtUsrNameReg").value;
    let userEmail = document.getElementById("edtUsrEmailReg").value;
    let userPassword = document.getElementById("edtUsrPasswordReg").value;

    if (userName === "") {
        alert("Please enter a username");
        return false;
    }
    if (userEmail === "") {
        alert("Please enter an email");
        return false;
    }
    if (userPassword === "") {
        alert("Please enter a password");
        return false;
    }

    if (userPassword.length < 8) {
        alert("Password must be at least 8 characters");
        return false;
    }

    if (userPassword.search(/[0-9]/) === -1) {
        alert("Password must contain at least one number");
        return false;
    }
    if (userPassword.search(/[a-z]/) === -1) {
        alert("Password must contain at least one lowercase letter");
        return false;
    }
    if (userPassword.search(/[A-Z]/) === -1) {
        alert("Password must contain at least one uppercase letter");
        return false;
    }
    if (userPassword.search(/[!@#$%^&*]/) === -1) {
        alert("Password must contain at least one special character");
        return false;
    }
    if (userPassword.search(/\s/) !== -1) {
        alert("Password must not contain any spaces");
        return false;
    }




    let allusers = [];
    let userExists = false;

    await fetch(url).then(function (response) {
        return response.json();
    }).then(function (response) {
        allusers = response;
    });

    //check if user exists
    for (let user of allusers) {
        if (userName === user.username) {
            userExists = true;
            break;
        }
    }

    //the user exists show an error message
    if (userExists) {
        alert("Username already exists. Kindly choose a different username");
        return;
    } else {



        //the user does not exist save user information
        let newUser = {
            id: Math.floor(Math.random() * 1000000000),
            username: userName,
            email: userEmail,
            password: userPassword,
            role: "CUST"
        };

        await fetch(url, {
            method: "POST",
            body: JSON.stringify(newUser),
            headers: {
                "Content-Type": "application/json"
            }
        });

        //show registration success message
        alert("Registration successful.");

        // document.getElementById("edtUsrNameReg").value = "";
        // document.getElementById("edtUsrEmailReg").value = "";
        // document.getElementById("edtUsrPasswordReg").value = "";
    }






}


const logInBtn = document.getElementById("btnLogin");
logInBtn.addEventListener("click", logInUser);
// let currentUser={};
// console.log(typeof currentUser)
// console.log(currentUser.username)


async function logInUser() {
    console.log("clicked")

    let url = "http://localhost:3000/users";
    let userName = document.getElementById("edtUsrNameLog").value;
    let userPassword = document.getElementById("edtUsrPasswordLog").value;
    const userNameTv = document.getElementById("app-user");

    if (userName === "") {
        alert("Please enter a username");
        return false;
    }

    if (userPassword === "") {
        alert("Please enter a password");
        return false;
    }

    if (userPassword.length < 8) {
        alert("Password must be at least 8 characters");
        return false;
    }

    if (userPassword.search(/[0-9]/) === -1) {
        alert("Password must contain at least one number");
        return false;
    }
    if (userPassword.search(/[a-z]/) === -1) {
        alert("Password must contain at least one lowercase letter");
        return false;
    }
    if (userPassword.search(/[A-Z]/) === -1) {
        alert("Password must contain at least one uppercase letter");
        return false;
    }
    if (userPassword.search(/[!@#$%^&*]/) === -1) {
        alert("Password must contain at least one special character");
        return false;
    }
    if (userPassword.search(/\s/) !== -1) {
        alert("Password must not contain any spaces");
        return false;
    }



    let allusers = [];
    let userExists = false;

    await fetch(url).then(function (response) {
        return response.json();
    }).then(function (response) {
        allusers = response;
    });

    //check if user exists
    for (let user of allusers) {
        if (userName === user.username) {
            userExists = true;
            currentUser = user;
            break;
        }
    }

    if (userExists) {

        if (userPassword === currentUser.password) {

            isLoggedIn = true;
            //show login success message
            alert("Login successful.");

            // window.location.href = "index.html";
            // console.log(currentUser);
        }

        // Check if the user is logged in
        if (isLoggedIn) {
            // Display the username
            userNameTv.textContent = currentUser.username;
        } else {
            // Hide the username element
            userNameTv.style.display = "none";
        }





    } else {
        //the user does not exist show an error message
        alert("Username or password is incorrect");
        return;
    }

    // document.getElementById("edtUsrNameLog").value = "";
    // document.getElementById("edtUsrPasswordLog").value = "";
    // document.getElementById("app-user");



}


const menuIcon = document.getElementById("app-menu");
menuIcon.addEventListener("click", showMenu);

function showMenu() {

    console.log("clicked")


    // const dropdowncontent = document.getElementById("menu-dropdown-content");

    // if (dropdowncontent.style.display === "none"){
    //     dropdowncontent.style.display = "block";
    // } else {
    //     dropdowncontent.style.display = "none";
    // }


}





const btnAddProduct = document.getElementById("btnAddProd");
btnAddProduct.addEventListener('click', addProduct);

let productID;




async function addProduct() {
    let url = "http://localhost:3000/products/";
    const edtProdName = document.getElementById("prodName").value;
    const edtProdDesc = document.getElementById("prodDesc").value;
    const edtProdPrice = document.getElementById("prodPrice").value;
    const edtProdImage = document.getElementById("prodImgUrl").value;
    const edtProdCategory = document.getElementById("prodCat").value;
    const edtProdStock = document.getElementById("prodStock").value;

    if (btnAddProduct.value === "Update Product") {

        //update an existing product

        let updatedProduct = {
            id: productID,
            name: edtProdName,
            description: edtProdDesc,
            price: edtProdPrice,
            imageUrl: edtProdImage,
            category: edtProdCategory,
            stock: edtProdStock
        };
        await fetch(url + productID, {
            method: "PUT",
            body: JSON.stringify(updatedProduct),
            headers: {
                "Content-Type": "application/json"
            }
        })


    } else {

        //create a new product

        // Validation
        if (edtProdName === "") {
            alert("Product name is required");
            return;
        }

        if (edtProdDesc === "") {
            alert("Product description is required");
            return;
        }

        if (isNaN(edtProdPrice) || edtProdPrice <= 0) {
            alert("Product price must be a positive number");
            return;
        }

        if (edtProdImage === "") {
            alert("Product image URL is required");
            return;
        }

        if (edtProdCategory === "") {
            alert("Product category is required");
            return;
        }

        if (isNaN(edtProdStock) || edtProdStock <= 0) {
            alert("Product stock must be a positive number");
            return;
        }


        let allProducts = [];
        let prodExists = false;

        await fetch(url).then(function (response) {
            return response.json();
        }).then(function (response) {
            allProducts = response;
        });

        //check if product exists
        for (let prod of allProducts) {
            if (edtProdName === prod.name) {
                prodExists = true;
                break;
            }
        }
        //the product exists show an error message
        if (prodExists) {
            alert("Product already exists. Kindly choose a different product name");
            return;
        } else {

            //the product does not exist save product information
            let newProduct = {
                id: Math.floor(Math.random() * 1000000000),
                name: edtProdName,
                description: edtProdDesc,
                price: edtProdPrice,
                imageUrl: edtProdImage,
                category: edtProdCategory,
                stock: edtProdStock
            };

            await fetch(url, {
                method: "POST",
                body: JSON.stringify(newProduct),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            //show products success message
            alert("Product added successfully.");
        }

    }



}


document.addEventListener("DOMContentLoaded", () => {


    viewProductAdmin();

})


async function viewProductAdmin() {

    let url = "http://localhost:3000/products";
    let allProducts = [];


    await fetch(url).then(function (response) {
        return response.json();
    }).then(function (response) {
        allProducts = response;
    });


    const productsTV = document.getElementById("displayProductsAdmin")

    for (let prod of allProducts) {
        // console.log(prod.imageUrl);

        productsTV.innerHTML += `
        <div class="product-card">
            <img src="${prod.imageUrl}"
                alt="product">
            <div class="card-text">
                <ion-icon id="prod-delete" onclick="deleteProduct('${prod.id}')" name="trash-outline"></ion-icon>

                <h3>${prod.name}</h3>
                <p>${prod.stock} in stock</p>
            </div>
            <p>Ksh ${prod.price} </p>
            <input type="button" value="Edit Product" onclick="editProduct('${prod.id}')">
        </div>
      `;

    }


}










async function editProduct(prodID) {
    let url = "http://localhost:3000/products/" + prodID

    let response = await this.fetch(url);
    let prod = await response.json();

    document.getElementById("prodName").value = prod.name;
    document.getElementById("prodDesc").value = prod.description;
    document.getElementById("prodPrice").value = prod.price;
    document.getElementById("prodImgUrl").value = prod.imageUrl;
    document.getElementById("prodCat").value = prod.category;
    document.getElementById("prodStock").value = prod.stock;
    btnAddProduct.value = "Update Product"

    productID = prod.id;

}



async function deleteProduct(productID) {
    let url = "http://localhost:3000/products/" + productID;

    await fetch(url, {
        method: "DELETE"
    });
}









































