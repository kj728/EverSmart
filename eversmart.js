
const baseURL = "http://localhost:3000/"


let myCart = [];

// const  products = [];


const products = [
    {
        id: 1,
        name: "Denim Jeans",
        description: "Classic fit jeans with a modern twist, perfect for casual outings.",
        price: 60 * 25.00,
        imageUrl: "https://images.unsplash.com/photo-1715532846484-1b10ddf694d0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fGplYW5zJTIwZm9sZGVkfGVufDB8MXwwfHx8Mg%3D%3D",
        category: "Pants",
        stock: 40,
    },
    {
        id: 2,
        name: "Graphic T-Shirt",
        description: "Comfortable and stylish t-shirt with a unique graphic design.",
        price: 25 * 25.00,
        imageUrl: "https://images.unsplash.com/photo-1628068431732-b8d752c52523?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dCUyMHNoaXJ0JTIwZGVzaWdufGVufDB8MXwwfHx8Mg%3D%3D",
        category: "Shirts",
        stock: 60,
    },
    {
        id: 3,
        name: "Leather Jacket",
        description: "Premium leather jacket for a timeless and rugged look.",
        price: 200 * 25.00,
        imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGVhdGhlciUyMGphY2tldHxlbnwwfDF8MHx8fDI%3D",
        category: "Jackets",
        stock: 25,
    },
    {
        id: 4,
        name: "Polo Shirt",
        description: "Classic polo shirt made from breathable cotton for everyday wear.",
        price: 40 * 25.00,
        imageUrl: "https://images.unsplash.com/photo-1625910513413-c23b8bb81cba?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG9sbyUyMHNoaXJ0fGVufDB8MXwwfHx8Mg%3D%3D",
        category: "Shirts",
        stock: 30,
    },
    {
        id: 5,
        name: "Cap",
        description: "Stylish and comfortable cap, perfect for everyday wear and outdoor activities.",
        price: 4 * 25.00,
        imageUrl: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2Fwc3xlbnwwfDF8MHx8fDI%3D",
        category: "Accessories",
        stock: 45
    },


    {
        id: 6,
        name: "Floral Blouse",
        description: "Light and airy blouse with a beautiful floral print, perfect for spring and summer.",
        price: 35 * 25.00,
        imageUrl: "https://images.pexels.com/photos/7796194/pexels-photo-7796194.jpeg?auto=compress&cs=tinysrgb&w=600",
        category: "Tops",
        stock: 25,
    },
    {
        id: 7,
        name: "Summer Dress",
        description: "Flowy and comfortable summer dress, perfect for hot days or a night out.",
        price: 50 * 25.00,
        imageUrl: "https://images.unsplash.com/photo-1509755512670-9e7af886e7e9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fHN1biUyMGRyZXNzfGVufDB8MXwwfHx8Mg%3D%3D",
        category: "Dresses",
        stock: 22,
    },
    {
        id: 8,
        name: "Classic White T-Shirt",
        description: "A staple piece for any wardrobe, this classic white t-shirt is both comfortable and stylish.",
        price: 15 * 25.00,
        imageUrl: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8V2hpdGUlMjB0JTIwc2hpcnR8ZW58MHwxfDB8fHwy",
        category: "Tops",
        stock: 50
    },
    {
        id: 9,
        name: "Knit Sweater",
        description: "Warm and cozy knit sweater, perfect for layering on colder days.",
        price: 55 * 25.00,
        imageUrl: "https://images.unsplash.com/photo-1715176531842-7ffda4acdfa9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDR8fGtuaXQlMjBzd2VhdGVyfGVufDB8MXwwfHx8Mg%3D%3D",
        category: "Sweaters",
        stock: 30,
    },
    {
        id: 10,
        name: "Trench Coat",
        description: "Classic and stylish trench coat, perfect for a timeless and sophisticated look.",
        price: 120 * 25.00,
        imageUrl: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fFRyZW5jaCUyMGNvYXR8ZW58MHwxfDB8fHwy",
        category: "Coats",
        stock: 15,
    },
    {
        id: 11,
        name: "Running Shoes",
        description: "Lightweight and breathable running shoes for ultimate performance.",
        price: 50 * 25.00,
        imageUrl: " https://images.unsplash.com/photo-1562183241-840b8af0721e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cnVubmluZyUyMHNob2VzfGVufDB8MXwwfHx8Mg%3D%3D",
        category: "Shoes",
        stock: 50,
    },
    {
        id: 12,
        name: "Casual Sneakers",
        description: "Stylish and comfortable sneakers for everyday wear.",
        price: 80 * 25.00,
        imageUrl: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=600",
        category: "Shoes",
        stock: 20,
    },
    {
        id: 13,
        name: "Basketball Shoes",
        description: "Supportive and high-performance basketball shoes for maximum control.",
        price: 120 * 25.00,
        imageUrl: "https://images.unsplash.com/photo-1613839817782-6c41fef752ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YmFza2V0YmFsbCUyMHNob2VzfGVufDB8MXwwfHx8Mg%3D%3D",
        category: "Shoes",
        stock: 35,
    },
    {
        id: 14,
        name: "Hiking Boots",
        description: "Durable and waterproof boots for outdoor adventures.",
        price: 150 * 25.00,
        imageUrl: "https://images.unsplash.com/photo-1621996659546-b0dd8b7e57af?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGhpa2luZyUyMGJvb3RzfGVufDB8MXwwfHx8Mg%3D%3D",
        category: "Shoes",
        stock: 15,
    },

    {
        id: 15,
        name: "Leather Loafers",
        description: "Sleek and stylish leather loafers for a polished look.",
        price: 79.99 * 50,
        imageUrl: "https://images.pexels.com/photos/19556446/pexels-photo-19556446/free-photo-of-black-leather-loafers.jpeg?auto=compress&cs=tinysrgb&w=600",
        category: "Shoes",
        stock: 8,
    },

    {
        id: 16,
        name: "High Heel Pumps",
        description: "Elegant high heel pumps, perfect for formal occasions or a night out.",
        price: 59.99 * 50,
        imageUrl: "https://images.pexels.com/photos/4959848/pexels-photo-4959848.jpeg?auto=compress&cs=tinysrgb&w=600",
        category: "Shoes",
        stock: 40
    },
    {
        id: 17,
        name: "Ankle Boots",
        description: "Stylish ankle boots, perfect for pairing with jeans or a dress.",
        price: 79.99 * 50,
        imageUrl: "https://images.unsplash.com/photo-1571489555750-c932b569ef5d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YW5rbGUlMjBib290c3xlbnwwfDF8MHx8fDI%3D",
        category: "Shoes",
        stock: 30
    },

    {
        id: 18,
        name: "Strappy Sandals",
        description: "Trendy strappy sandals, perfect for warm weather and beach outings.",
        price: 34.99 * 50,
        imageUrl: "https://images.unsplash.com/photo-1630407332126-70ebb700976b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8U3RyYXBweSUyMFNhbmRhbHN8ZW58MHwxfDB8fHwy",
        category: "Shoes",
        stock: 45
    },
    {
        id: 19,
        name: "Pointed-Toe Pumps",
        description: "Classic and elegant black pointed-toe pumps with a stiletto heel, perfect for a sophisticated look.",
        price: 89.99 * 50,
        imageUrl: "https://images.pexels.com/photos/18935118/pexels-photo-18935118/free-photo-of-pair-of-pumps.jpeg?auto=compress&cs=tinysrgb&w=600",
        category: "Women's Shoes",
        stock: 15,
    },
    {
        id: 20,
        name: "Espadrille Wedges",
        description: "Chic espadrille wedges, perfect for adding height and style to your summer outfits.",
        price: 65.99 * 50,
        imageUrl: "https://images.pexels.com/photos/8125844/pexels-photo-8125844.jpeg?auto=compress&cs=tinysrgb&w=600",
        category: "Shoes",
        stock: 35
    },

    {
        id: 21,
        name: "Classic Pullover Hoodie",
        description: "A comfortable and versatile pullover hoodie, perfect for casual wear or layering.",
        price: 39.99 * 50,
        imageUrl: "https://images.pexels.com/photos/6311317/pexels-photo-6311317.jpeg?auto=compress&cs=tinysrgb&w=600",
        category: "Hoodies",
        stock: 50,
    },
    {
        id: 22,
        name: "Zip-Up Hoodie Jacket",
        description: "A stylish zip-up hoodie jacket with a cozy fleece lining, perfect for chilly days.",
        price: 49.99 * 50,
        imageUrl: "https://images.pexels.com/photos/3657429/pexels-photo-3657429.jpeg?auto=compress&cs=tinysrgb&w=600",
        category: "Hoodies",
        stock: 35,
    },
    {
        id: 23,
        name: "Graphic Print Hoodie",
        description: "A trendy hoodie featuring a bold graphic print, perfect for making a statement.",
        price: 29.99 * 50,
        imageUrl: "https://images.pexels.com/photos/10211683/pexels-photo-10211683.jpeg?auto=compress&cs=tinysrgb&w=600",
        category: "Hoodies",
        stock: 40,
    },
    {
        id: 24,
        name: "Oversized Hoodie",
        description: "A cozy oversized hoodie for maximum comfort and style, perfect for lounging or casual outings.",
        price: 59.99 * 50,
        imageUrl: "https://images.pexels.com/photos/16982868/pexels-photo-16982868/free-photo-of-smiling-model-in-an-oversized-brown-hoodie.jpeg?auto=compress&cs=tinysrgb&w=600",
        category: "Hoodies",
        stock: 30,
    },
    {
        id: 25,
        name: "Sherpa-Lined Hoodie",
        description: "A warm and cozy sherpa-lined hoodie, perfect for colder weather and outdoor activities.",
        price: 69.99 * 50,
        imageUrl: "https://images.unsplash.com/photo-1526476148966-98bd039463ea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTJ8fEhvb2RpZXxlbnwwfDF8MHx8fDI%3D",
        category: "Hoodies",
        stock: 20,
    }

];


//******************************************MAIN CODE BEGINS HERE*************************************************//

let isLoggedIn = false;
let currentUser = {}


document.addEventListener("DOMContentLoaded", () => {

    const homeBtn = document.getElementById("app-home");
    const cartBtn = document.getElementById("app-cart");
    const authBtn = document.getElementById("app-auth");


    const homeView = document.getElementById('dc-home');
    const cartView = document.getElementById('dc-cart');
    const authView = document.getElementById('dc-auth');
    const prodView = document.getElementById('dc-prod');

    //   Switch view 
    const views = [homeView, cartView, authView, prodView];

    function showView(viewToShow) {
        views.forEach(view => {
            if (view === viewToShow) {
                if (view === cartView && !isLoggedIn) {

                    alert("Please log in to access the cart");
                    showView(homeView);
                    return;
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

    cartBtn.onclick = () => {

        loadCartData(myCart)
    }

    //  Initialize to home view
    // showView(homeView);
    showView(prodView);



});



loadAllProducts();
function loadAllProducts() {

    const productsTV = document.getElementById("displayProducts")
    products.forEach((product) => {

        productsTV.innerHTML += `
        <div class="product-card">
            <img src="${product.imageUrl}"
                alt="product">
            <div class="card-text">
                <h3>${product.name}</h3>
                <p>${product.stock} in stock</p>
            </div>
            <p>Ksh ${product.price.toFixed(2)} </p>
            <input type="button" value="Add to Cart" onclick="addToCart(${product.id},${product.stock} )">
        </div>
      `;

    });
}


function addToCart(id, inStock) {
    let productQuantity = getUserQuantityInput();

    if (productQuantity <= 0) {
        alert("Please enter a valid quantity");
        return;
    }
    if (productQuantity > inStock) {
        alert("Sorry, we only have " + inStock + " in stock");
        return;
    }

    const product = products.find(product => product.id === id);



    const cartItem = {
        id: product.id,
        imageUrl: product.imageUrl,
        name: product.name,
        price: product.price,
        cartItemSubTotal: product.price * productQuantity,
        quantity: productQuantity,
        description: product.description
    };

    myCart.push(cartItem);


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


function loadCartData(myCartArray) {
    console.log("Loading Cart")
    const cartTV = document.getElementById("displayCartItems");
    myCartArray.forEach((cartItem) => {
        const existingItem = document.querySelector(`div.cart-item-card img[src="${cartItem.imageUrl}"]`);

        if (existingItem) {
            // Update the existing cart item
            existingItem.parentElement.querySelector('span').textContent = cartItem.quantity;
            existingItem.parentElement.querySelector('h4').textContent = "Total Ksh: " + cartItem.price.toFixed(2) * cartItem.quantity;
        } else {
            // Add a new cart item
            cartTV.innerHTML += `
                <div class="cart-item-card">
                    <img src="${cartItem.imageUrl}">
                    <div class="card-content">
                        <ion-icon onclick="removeCartItem(${cartItem.id},myCart)" name="trash-outline"></ion-icon>
                        <h3>${cartItem.name}</h3>
                        <p>Ksh: ${cartItem.price.toFixed(2)} </p>
                        <p id="desc">${cartItem.description}<p>
                        <h4>Sub Total Ksh: ${cartItem.cartItemSubTotal}</h4>
                        
                        <!-- <p>Comfortable and stylish t-shirt with a unique graphic design.</p> -->

                        <div class="modify-cart">
                            <input onclick="reduceQuantity(${cartItem.id},myCart)" id="btnMinus" type="button" value="-">
                            <span>${cartItem.quantity}</span>
                            <input onclick="increaseQuantity(${cartItem.id},myCart)" id="btnPlus" type="button" value="+">
                        </div>

                    </div>
                </div>
            `;
        }
    });

    calculateCartGrandTotal(myCartArray);
}

function reduceQuantity(id, myCartArray) {
    myCartArray.forEach(cartItem => {
        if (cartItem.id === id) {
            if (cartItem.quantity > 1) {
                cartItem.quantity -= 1;
                let newCartSubtotal = cartItem.price * cartItem.quantity

                cartItem.cartItemSubTotal = newCartSubtotal;
                // console.log("Quantity before", cartItem.quantity);
                // console.log(cartItem)
                // console.log(myCartArray);


            } else {
                alert("Quantity cannot be reduced further");
                return;
            }
        }

        console.log("Quantity after", cartItem.quantity);
        console.log(cartItem)
        console.log(myCartArray);
    });

    // Refresh the layout by calling loadCartData()
    loadCartData(myCartArray);



}

function increaseQuantity(id, myCartArray) {


    myCartArray.forEach(cartItem => {
        if (cartItem.id === id) {
            const product = products.find(product => product.id === id);

            if (cartItem.quantity < product.stock) {
                cartItem.quantity += 1;

                let newCartSubtotal = cartItem.price * cartItem.quantity

                cartItem.cartItemSubTotal = newCartSubtotal;
                console.log("Quantity before", cartItem.quantity);
                console.log(cartItem)
                console.log(myCartArray);

            } else {
                alert("Quantity cannot be increased further. Only " + product.stock + " in stock.");
                cartItem.quantity = product.stock;
            }
        }
    });

    // Refresh the layout by calling loadCartData()
    loadCartData(myCartArray);
}

function removeCartItem(id, myCartArray) {

    // Find the index of the item with the given id in the cart array
    const cartItemIndex = myCartArray.findIndex(cartItem => cartItem.id === id);

    // If the item exists in the cart, remove it
    if (cartItemIndex !== -1) {
        const cartItem = myCartArray[cartItemIndex];
        myCart.splice(cartItemIndex, 1);

        // Refresh the cart display
        loadCartData(myCart);

        // Remove the card from the DOM
        const cartItemCard = document.querySelector(`div.cart-item-card img[src="${cartItem.imageUrl}"]`);
        if (cartItemCard) {
            cartItemCard.parentElement.remove();
        }
    }


}

function calculateCartGrandTotal(myCartArray) {
    let total = 0;
    myCartArray.forEach(cartItem => {
        total += cartItem.cartItemSubTotal;
    });

    // Update the HTML content of the cart total element
    const cartTotalTv = document.getElementById('displayCartGrandTotal');
    cartTotalTv.innerHTML = "Ksh " + total.toFixed(2);

    return total;
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
            //show registration success message
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
    let url = "http://localhost:3000/products/"+ prodID

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









































