const localStorageProducts = [];
// Get Products
const getProductsFromShopify = async () => {
    const result = await fetch("/.netlify/functions/load-products")
        .then((res) => res.json())
        .catch((err) => {
            console.log(err);
        });

    const data = await result;
    // display products
    displayData(data);
};
getProductsFromShopify();

// display all products
// function displayData(data) {
//     const products = data.data.products.edges;
//     const output = document.querySelector("#landing");
//     let results = "";
//     products.forEach((prod) => {
//         // add products to global array
//         localStorageProducts.push(prod);
//         const product = prod.node.variants.edges[0].node;
//         results += `
//             <div id='product'>
//               <div class='header'>
//                 <img src='${prod.node.images.edges[0].node.src}' />
//               </div>
//               <h1>${prod.node.handle}</h1>
//               <h2>Variant: ${product.title}</h2>
//               <p>Price: $${product.price}</p>
//               <p>Total Inventory: ${product.quantityAvailable}</p>
//               <button id='addToCartBtn' data-id='${product.id}' class='btn'>Add To Cart</button>
//             </div>
//     `;
//     });
//     console.log(localStorageProducts);
//     output.innerHTML = results;
//     attachEventListeners();
//     console.log("Products have been received and rendered onto the DOM.");
// }

// attach event listeners to all products for add to cart functionality
// function attachEventListeners() {
//     const allAddToCartBtns = document.querySelectorAll("#addToCartBtn");
//     allAddToCartBtns.forEach((btn) => {
//         btn.addEventListener("click", addToCart);
//     });
// }
// get cart
async function createCart() {
    const response = await fetch("/.netlify/functions/create-cart").then((res) =>
        res.json()
    );
    const data = await response;
    // get items and set data
    const cartId = data.cartId;
    const checkoutUrl = data.checkoutUrl;

    const shopifyLocalStorageObj = {
        shopifyCartId: cartId,
        checkoutUrl: checkoutUrl,
        estimatedCost: null,
        lines: [],
    };
    // set to local storage
    localStorage.setItem(
        "Shopify-Cart-data",
        JSON.stringify(shopifyLocalStorageObj)
    );
    console.log("new cart created");
}

const shopifyLocalStorageAvailable = localStorage.getItem("Shopify-Cart-data");

// if there is a shopify local storage available, dont fetch new cart id \
if (shopifyLocalStorageAvailable) {
    // console.log("Shopify object in local storage");
} else {
    createCart();
}

// empty cart by removing object from local storage and creating a new cart session
// function emptyCart() {
//     localStorage.removeItem("Shopify-Cart-data");
//     // create cart and load cart to set new values to local storage
//     createCart().then(() => {
//         const newId = JSON.parse(localStorage.getItem("Shopify-Cart-data"))
//             .shopifyCartId;
//         loadCart(newId);
//     });
//     document.querySelector("#cart-items").innerHTML = "";
//     console.log("Cart has been emptied.");
// }
// document.querySelector("#clear-cart").addEventListener("click", emptyCart);
async function addToCart(e) {
    const id = e.target.dataset.id;
    const cartId = JSON.parse(localStorage.getItem("Shopify-Cart-data"))
        .shopifyCartId;

    if (!id || !cartId) {
        alert("Somethig went wrong.");
    }

    await fetch("/.netlify/functions/add-to-cart", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            cartId: cartId,
            variantId: id,
        }),
    }).then((res) => res.json());
    addElToDomCart(id);
    loadCart(cartId);
    console.log("Item added to cart.");
}

// function addElToDomCart(id = null) {
//     if (id) {
//         const output = document.querySelector("#cart-items");
//         const foundProdFromLocalStorage = localStorageProducts.find(
//             (prod) => prod.node.variants.edges[0].node.id === id
//         );
//         let cartItem = document.createElement("div");
//         cartItem.className = "cart-item";
//         cartItem.innerHTML = `
//     <h1>${foundProdFromLocalStorage.node.title}</h1>
//     <p>Quantity:</p>
//   `;
//         output.append(cartItem);
//         console.log(foundProdFromLocalStorage);
//     } else {
//         console.log("no items");
//     }
// }
// grab cart id from local storage and send it to server => receive cart data
const cartId = JSON.parse(localStorage.getItem("Shopify-Cart-data"))
    .shopifyCartId;
async function loadCart(id) {
    const response = await fetch("/.netlify/functions/load-cart", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(id),
    }).then((res) => res.json());
    const data = await response;

    // get total cost and products and set it
    const estimatedCost = data.cart.estimatedCost.totalAmount.amount;
    // const cartTotalDom = document.querySelector("#cart-total");
    const productsInCart = data.cart.lines.edges;
    // cartTotalDom.textContent = estimatedCost;

    const localStorageItem = JSON.parse(
        localStorage.getItem("Shopify-Cart-data")
    );
    localStorageItem.estimatedCost = estimatedCost;
    localStorageItem.lines = productsInCart;
    localStorage.setItem("Shopify-Cart-data", JSON.stringify(localStorageItem));
    console.log("Cart has been updated.");
}
loadCart(cartId);

// if there are no items => disable checkout btn

const checkoutBtn = document.querySelector("#checkout-btn");

function checkCartLength() {
    const itemsInCart = JSON.parse(localStorage.getItem("Shopify-Cart-data"))
        .lines;
    if (itemsInCart.length == 0) {
        checkoutBtn.disabled = true;
    }
    console.log(
        "Cart length has been checked and btn has been set to correct state."
    );
}
// checkCartLength();
checkoutBtn.addEventListener("click", checkout);

function checkout() {
    const url = JSON.parse(localStorage.getItem("Shopify-Cart-data")).checkoutUrl;
    window.location = url;
}