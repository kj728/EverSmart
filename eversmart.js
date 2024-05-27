
const baseURL = "http://localhost:3000/"


// let myCart = [];
let productsArray = [];


//******************************************MAIN CODE BEGINS HERE*************************************************//

let isLoggedIn = false;
let currentUser = {}
retrieveUserCredentialsSessionStorage();
const userNameTv = document.getElementById("app-user");
const menu = document.getElementById('app-menu');

let USER_ID; /// global user identifier

// Check if the user is logged in
if (currentUser) {
    // Display the username
    userNameTv.textContent = currentUser.username;
    USER_ID = currentUser.id;

    if (currentUser.role == "ADM") {
        menu.style.display = "block";
    } else {
        menu.style.display = "none";
    }

} else {
    // Hide the username element
    userNameTv.style.display = "none";
}


document.addEventListener("DOMContentLoaded", async (e) => {
    e.preventDefault();
    //create on behalf of the user a cart
    if (currentUser) {
        createCartIfNotExists(USER_ID);
    }

    /**
     * Event listener for navigation buttons.
     * Shows the corresponding view based on the clicked button.
     */
    const homeBtn = document.getElementById("app-home");
    const cartBtn = document.getElementById("app-cart");
    const authBtn = document.getElementById("app-auth");
    const productsBtn = document.getElementById("app-products");
    const myOrdersBtn = document.getElementById("app-orders");
    const adminOrdersBtn = document.getElementById("app-orders-admin");


    /**
     * HTML elements representing the views.
     */
    const homeView = document.getElementById('dc-home');
    const cartView = document.getElementById('dc-cart');
    const authView = document.getElementById('dc-auth');
    const prodView = document.getElementById('dc-prod');
    const ordersView = document.getElementById('dc-orders');
    const adminOrdersView = document.getElementById('dc-orders-admin');


    /**
     * Array of HTML elements representing the views.
     */
    const views = [homeView, cartView, authView, prodView, ordersView, adminOrdersView];

    /**
     * Function to show a specific view and hide the others.
     * @param {HTMLElement} viewToShow - The view to be shown.
     */


    function showView(viewToShow) {
        views.forEach(view => {


            if (view === viewToShow) {
                if (view === cartView && !currentUser) {
                    alert("Please log in to access the cart");
                    showView(homeView);
                    return;
                }
                if (view === cartView) {
                    loadCartData();
                }
                if (view === prodView) {
                    viewProductAdmin();
                }
                if (view === homeView) {

                }
                if (view === ordersView) {
                    loadCtrOrders();
                }

                if (view == adminOrdersView) {
                    loadAdminOrders();
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
    myOrdersBtn.addEventListener('click', () => showView(ordersView));

    productsBtn.addEventListener('click', () => showView(prodView));
    adminOrdersBtn.addEventListener('click', () => showView(adminOrdersView));

    // Initialize to home view by default
    showView(homeView);

    //clear all inputs
    clearAllInputs();
});


function clearAllInputs() {
    //clear all inputs
    const textInputs = document.querySelectorAll('input[type="text"]');
    textInputs.forEach(input => {
        input.value = '';
    });
    const passInputs = document.querySelectorAll('input[type="password"]');
    passInputs.forEach(input => {
        input.value = '';
    });
}


//------------------------------------------HOME VIEW METHODS---------------------------------------------
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
            <p>Ksh: ${priceString} </p>
            <input type="button" value="Add to Cart" onclick="addToCart(${prod.id},${prod.stock} )">
        </div>
      `;

    }

}

// Function to create a cart for a user if it doesn't exist
async function createCartIfNotExists(userId) {

    const baseUrl = 'http://localhost:3000';
    // Check if the cart exists
    const response = await fetch(`${baseUrl}/carts?id=${userId}`);
    const carts = await response.json();

    // If cart doesn't exist, create it
    if (carts.length === 0) {
        const newCart = { id: userId, items: [] };
        await fetch(`${baseUrl}/carts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCart)
        });
    }
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

async function addToCart(prodId, inStock) {
    let productQuantity = getUserQuantityInput();

    if (productQuantity <= 0) {
        alert("Please enter a valid quantity");
        return;
    }
    if (productQuantity > inStock) {
        alert("Sorry, we only have " + inStock + " in stock");
        return;
    }

    await fetch('http://localhost:3000/products')  // server URL
        .then(response => response.json())
        .then(data => {
            const products = data;

            // Access individual product objects within the array
            for (const product of products) {
                if (product.id == prodId) {

                    if (currentUser) {

                        const cartItem = {
                            id: product.id,
                            imageUrl: product.imageUrl,
                            name: product.name,
                            price: product.price,
                            cartItemSubTotal: product.price * productQuantity,
                            quantity: productQuantity,
                            description: product.description,
                            placedby: {
                                id: currentUser.id,
                                username: currentUser.username,
                            }
                        };

                        // let url = 'http://localhost:3000/carts';

                        // sendPostRequest(url, cartItem)
                        sendProductToCart(USER_ID, cartItem)

                    } else {
                        console.log("Something went wrong")
                        alert('Please sign in and try again')
                    }

                    break;
                }
            }



        })
        .catch(error => console.error(error));

}

async function sendProductToCart(userId, cartItem) {


    // Fetch the user's cart
    const response = await fetch(`http://localhost:3000/carts?id=${userId}`);
    const carts = await response.json();
    let mycart = carts[0];
    // Add the cartitem to the cart
    mycart.items.push(cartItem);

    // Update the cart in the server
    await fetch(`http://localhost:3000/carts/${mycart.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(mycart)
    });


}

//------------------------------------------CART VIEW METHODS---------------------------------------------
//creat an array of current user cart items
let userCartItems = [];
// userCartItems.length = 0;
async function loadCartData() {
    console.log("Loading Cart")
    const cartTV = document.getElementById("displayCartItems");


    const response = await fetch(`http://localhost:3000/carts?id=${USER_ID}`);
    const carts = await response.json().catch(error => console.error(error));
    let allCartItems = carts[0].items;

    // Access individual product objects within the array
    for (const cartItem of allCartItems) {

        // add the items that the current user has placed
        userCartItems.push(cartItem);

        const existingItem = document.querySelector(`div.cart-item-card img[src="${cartItem.imageUrl}"]`);
        if (existingItem) {
            // Update the existing cart item
            let totalPrice = cartItem.price * cartItem.quantity;
            let formattedPrice = parseFloat(totalPrice);
            let priceString = formattedPrice.toFixed(2);

            existingItem.parentElement.querySelector('span').textContent = cartItem.quantity;
            existingItem.parentElement.querySelector('h4').textContent = "Total Ksh: " + priceString;

        } else {
            // Add a new cart item to display
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
    }
    calculateCartGrandTotal();
}

async function updateProductQuantity(prodID, obj) {

    console.log("Updating product quantity")
    const response = await fetch(`http://localhost:3000/carts?id=${USER_ID}`);
    const carts = await response.json().catch(error => console.error(error));
    mycart = carts[0];
    let allCartItems = mycart.items;
    // Access individual product objects within the array
    let productIndex;

    for (let i = 0; i < allCartItems.length; i++) {
        if (allCartItems[i].id == prodID) {
            productIndex = i;
            break;
        }
    }

    mycart.items[productIndex] = obj;

    // Update the cart in the server
    await fetch(`http://localhost:3000/carts/${mycart.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(mycart)
    });

}

async function reduceQuantity(prodID) {
    const response = await fetch(`http://localhost:3000/carts?id=${USER_ID}`);
    const carts = await response.json().catch(error => console.error(error));
    mycart = carts[0];
    let allCartItems = mycart.items;
    // Access individual product objects within the array
    for (const cartItem of allCartItems) {

        if (cartItem.id == prodID) {

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
                    description: cartItem.description,
                    placedby: {
                        id: currentUser.id,
                        username: currentUser.username,
                    }
                };
                updateProductQuantity(prodID, updatedCartItem)

            } else {
                alert("Quantity cannot be reduced further");
                return;
            }
        }

    }

}
async function increaseQuantity(prodID) {
    let product = {};
    fetch('http://localhost:3000/products/' + prodID)
        .then(response => response.json())
        .then(data => {
            product = data;


        });

    const response = await fetch(`http://localhost:3000/carts?id=${USER_ID}`);
    const carts = await response.json().catch(error => console.error(error));

    mycart = carts[0];

    let allCartItems = mycart.items;

    // Access individual product objects within the array
    for (const cartItem of allCartItems) {

        if (cartItem.id == prodID) {

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
                    description: cartItem.description,
                    placedby: {
                        id: currentUser.id,
                        username: currentUser.username,
                    }
                };

                // Update the cart in the server
                updateProductQuantity(prodID, updatedCartItem)


            } else {
                alert("Quantity cannot be increased further. Only " + product.stock + " in stock.");
                return;
            }

        }
    }
}

async function removeCartItem(prodID) {

    console.log("Removing product from the cart");
    const response = await fetch(`http://localhost:3000/carts?id=${USER_ID}`);
    const carts = await response.json().catch(error => console.error(error));
    mycart = carts[0];
    let allCartItems = mycart.items;
    // Access individual product objects within the array
    let productIndex;

    for (let i = 0; i < allCartItems.length; i++) {
        if (allCartItems[i].id == prodID) {
            productIndex = i;
            break;
        }
    }

    mycart.items.splice(productIndex, 1);



    // Update the cart in the server
    await fetch(`http://localhost:3000/carts/${mycart.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(mycart)
    });

}

async function calculateCartGrandTotal() {
    let cartTotal = 0;
    const cartTotalTv = document.getElementById('displayCartGrandTotal');


    const response = await fetch(`http://localhost:3000/carts?id=${USER_ID}`);
    const carts = await response.json().catch(error => console.error(error));
    let allCartItems = carts[0].items;


    // Access individual product objects within the array
    for (const cartItem of allCartItems) {

        // console.log(cartItem.cartItemSubTotal);
        cartTotal += cartItem.cartItemSubTotal;
        cartTotalTv.innerHTML = "Ksh " + cartTotal.toFixed(2);



    }

}

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero for single-digit months
    const day = String(date.getDate()).padStart(2, '0'); // Add leading zero for single-digit days
    return `${year}-${month}-${day}`;
}

async function sendOrderToDatabase(url, obj) {
    // Make the POST request to save the added product to the cart
    await fetch(url, {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
            "Content-Type": "application/json"
        }
    });



}

async function placeOrder() {
    cartTotal = 0;


    let totalQuantity = 0;
    for (const cartItem of userCartItems) {
        totalQuantity += cartItem.quantity;
        cartTotal += cartItem.cartItemSubTotal;

    }
    // console.log("TOTAL", totalQuantity);
    // console.log("mbesha", cartTotal);
    const today = new Date()
    const formattedDate = formatDate(today);
    const newOrder = {
        id: Math.floor(Math.random() * 1000000000),
        customerName: currentUser.username,
        customerID: currentUser.id,
        orderDate: formattedDate,
        status: 'Pending',
        total: cartTotal,
        quantity: totalQuantity,
        items: userCartItems,

    }

    //reduce the stock quantity of the products in the user cart
    reduceStockQuantity(userCartItems)

    //clear the user cart for use next time
    clearUserCart(USER_ID);

    url = 'http://localhost:3000/orders'


    // send the order request
    sendOrderToDatabase(url, newOrder);

}

function reduceStockQuantity(cartArray) {


    for (let i = 0; i < cartArray.length; i++) {
        console.log(cartArray[i].quantity);
        let product = {};
        fetch('http://localhost:3000/products/' + cartArray[i].id)
            .then(response => response.json())
            .then(data => {
                product = data;
                product.stock -= cartArray[i].quantity;
                console.log(product.stock);
                fetch('http://localhost:3000/products/' + cartArray[i].id, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(product)
                })
            })
    }


}

async function clearUserCart(userId) {
    console.log("CLEAR CART EXECUTED")

    // Fetch the user's cart
    const response = await fetch(`http://localhost:3000/carts?id=${userId}`);
    const carts = await response.json();
    let mycart = carts[0];

    // Clear the items
    mycart.items = [];

    // Update the cart in the server
    await fetch(`http://localhost:3000/carts/${mycart.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(mycart)
    });

}


//------------------------------------------AUTH VIEW METHODS---------------------------------------------

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
            role: "CTR"
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

    }

}

const logInBtn = document.getElementById("btnLogin");
logInBtn.addEventListener("click", logInUser);
async function logInUser() {

    let url = "http://localhost:3000/users";
    let userName = document.getElementById("edtUsrNameLog").value;
    let userPassword = document.getElementById("edtUsrPasswordLog").value;

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
            // alert("Login successful.");
            // Display the username
            userNameTv.style.display = "flex";
            userNameTv.textContent = currentUser.username;

            //store the user credentials in the session storage
            storeUserCredentialsSessionStorage(currentUser);

            if (currentUser.role == "ADM") {
                menu.style.display = "block";
            } else {
                menu.style.display = "none";
            }

            //redirect to home page
            window.location.href = "/eversmart.html";
        }

    } else {
        //the user does not exist show an error message
        alert("Username or password is incorrect");
        return;
    }

}

function storeUserCredentialsSessionStorage(userData) {
    const signedInUser = {
        id: userData.id,
        username: userData.username,
        email: userData.email,
        role: userData.role
    };
    // Store user data as a JSON string in session storage
    sessionStorage.setItem('loggedInUser', JSON.stringify(signedInUser));

}
function retrieveUserCredentialsSessionStorage() {
    // Retrieve user data from session storage as a JSON string
    const userData = sessionStorage.getItem('loggedInUser');
    //set current credentials
    currentUser = JSON.parse(userData);

}

const logoutBtn = document.getElementById('app-logout');
logoutBtn.addEventListener('click', deleteUserCredentialsSessionStorage)

function deleteUserCredentialsSessionStorage() {
    if (currentUser) {
        // Remove user data from session storage 
        sessionStorage.removeItem('loggedInUser');
        // alert("Logout successfully completed")
        //refresh the page
        window.location.href = "/eversmart.html"
    }
}

//------------------------------------------PROD VIEW METHODS---------------------------------------------

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
        let formattedPrice = parseFloat(prod.price);

        let priceString = formattedPrice.toFixed(2);


        productsTV.innerHTML += `
        <div class="product-card">
            <img src="${prod.imageUrl}"
                alt="product">
            <div class="card-text">
                <ion-icon id="prod-delete" onclick="deleteProduct('${prod.id}')" name="trash-outline"></ion-icon>

                <h3>${prod.name}</h3>
                <p>${prod.stock} in stock</p>
            </div>
            <p>Ksh: ${priceString} </p>
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
    // document.getElementById("form-title").textContent="Update Product" ;
    let title = document.getElementById("form-title");
    title.textContent = "Update Product"
    btnAddProduct.value = "Update Product"
    productID = prod.id;

}

async function deleteProduct(productID) {
    let url = "http://localhost:3000/products/" + productID;
    await fetch(url, {
        method: "DELETE"
    });
}


//------------------------------------------ODERS VIEW METHODS---------------------------------------------

let addedOrderIDs = [];  // Array to store IDs of added orders
function loadCtrOrders() { //load customer orders
    let ordersTV = document.getElementById("displayOrdersCtr");
    fetch('http://localhost:3000/orders')  // Replace with your actual server URL
        .then(response => response.json())
        .then(data => {
            const allOrders = data;
            // Access individual order objects within the array
            for (const order of allOrders) {

                let formattedPrice = parseFloat(order.total);

                let priceString = formattedPrice.toFixed(2);



                if (currentUser.id == order.customerID && !addedOrderIDs.includes(order.id)) {
                    addedOrderIDs.push(order.id);  // Add the order ID to the array
                    ordersTV.innerHTML += `
                    <div class="order-record" id="app-record" onclick="recordClick('${order.id}')">
                        <div class="equal-2">
                            <p>${order.id}</p>
                        </div>
                        <div class="equal-2">
                            <p id="cust-name">${order.customerName}</p>
                        </div>
                        <div class="equal-2">
                            <p>${order.orderDate}</p>
                        </div>
                        <div class="equal-2">
                            <p>${order.quantity}</p>
                        </div>
                        <div class="equal-2">
                            <p>Ksh: ${priceString}</p>
                        </div>
                        <div class="equal-2">
                            <p>${order.status}</p>
                        </div>

                        <div id="record-actions" class="equal-2">
                            <input id="app-order-cancel" type="button" value="Cancel Order" onclick="">
                            <!-- <ion-icon name="trash-outline"></ion-icon> -->
                        </div>

                    </div>
                    `;
                }

            }
        })
        .catch(error => console.error(error));

}

function recordClick(rec_id) {
    // console.log('recordClicked');
    // console.log(rec_id);
}

//------------------------------------------ADMIN ODERS VIEW METHODS---------------------------------------------

let addedOrderIDsAdminSide = [];
function loadAdminOrders() {
    let ordersTV = document.getElementById("displayOrdersAdmin");
    fetch('http://localhost:3000/orders')  // Replace with your actual server URL
        .then(response => response.json())
        .then(data => {

            const allOrders = data;
            for (const order of allOrders) {

                let formattedPrice = parseFloat(order.total);

                let priceString = formattedPrice.toFixed(2);


                if (!addedOrderIDsAdminSide.includes(order.id)) {
                    addedOrderIDsAdminSide.push(order.id);  // Add the order ID to the array

                    ordersTV.innerHTML += `
                    <div class="order-record" id="app-record" onclick="recordClick('${order.id}')">
                        <div class="equal-2">
                            <p>${order.id}</p>
                        </div>
                        <div class="equal-2">
                            <p id="cust-name">${order.customerName}</p>
                        </div>
                        <div class="equal-2">
                            <p>${order.orderDate}</p>
                        </div>
                        <div class="equal-2">
                            <p>${order.quantity}</p>
                        </div>
                        <div class="equal-2">
                            <p>Ksh: ${priceString}</p>
                        </div>
                        <div class="equal-2">
                            <p>${order.status}</p>
                        </div>

                        <div id="record-actions" class="equal-2">
                            <input id="app-order-deets" type="button" value="Details">
                            <ion-icon name="trash-outline"></ion-icon>
                        </div>

                    </div>
              `;
                }
            }
        }).catch(error => console.error(error));

}


//******************************************MAIN CODE ENDS HERE*************************************************//

