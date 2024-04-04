updateCartTotal(); // Update main cart total when the page loads
updateMiniCart(); // Update mini cart total when the page loads

/* Button event listeners */
document.getElementById("emptycart").addEventListener("click", emptyCart);
var btns = document.getElementsByClassName('addtocart');
for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', function() {addToCart(this);});
}

/* Add to cart functions */


function addToCart(elem) {
    // init
    var sibs = [];
    var getprice;
    var getproductName;
    var cart = [];
    var stringCart;
    // cycles siblings for product info near the add button
    while (elem = elem.previousSibling) {
        if (elem.nodeType === 3) continue; // text node
        if (elem.className == "price") {
            getprice = elem.innerText;
        }
        if (elem.className == "productname") {
            getproductName = elem.innerText;
        }
        sibs.push(elem);
    }
    // create product object
    var product = {
        productname: getproductName,
        price: getprice
    };
    // convert product data to JSON for storage
    var stringProduct = JSON.stringify(product);
    /* Send product data to session storage */
    
    if (!sessionStorage.getItem('cart')) {
        // append product JSON object to cart array
        cart.push(stringProduct);
        // cart to JSON
        stringCart = JSON.stringify(cart);
        // create session storage cart item
        sessionStorage.setItem('cart', stringCart);
        addedToCart(getproductName);
    } else {
        // get existing cart data from storage and convert back into array
        cart = JSON.parse(sessionStorage.getItem('cart'));
        // append new product JSON object
        cart.push(stringProduct);
        // cart back to JSON
        stringCart = JSON.stringify(cart);
        // overwrite cart data in session storage 
        sessionStorage.setItem('cart', stringCart);
        addedToCart(getproductName);
    }
    // Update both carts
    updateCartTotal();
    updateMiniCart();
}

/* Calculate Cart Total */
function updateCartTotal() {
    // init
    var total = 0;
    var price = 0;
    var items = 0;
    var productname = "";
    var carttable = "";
    if (sessionStorage.getItem('cart')) {
        // get cart data & parse to array
        var cart = JSON.parse(sessionStorage.getItem('cart'));
        // get no of items in cart 
        items = cart.length;
        // loop over cart array
        for (var i = 0; i < items; i++) {
            // convert each JSON product in array back into object
            var x = JSON.parse(cart[i]);
            // get property value of price
            price = parseFloat(x.price.split('Rs.')[1]);
            productname = x.productname;
            // add price to total
            carttable += "<tr><td>" + productname + "</td><td>Rs." + " " + price.toFixed(2) + "</td></tr>";
            total += price;
        }

    }
    // update total on website HTML
    document.getElementById("total").innerHTML = total.toFixed(2);
    // insert saved products to cart table
    document.getElementById("carttable").innerHTML = carttable;
    // update items in cart on website HTML
    document.getElementById("itemsquantity").innerHTML = items;
    document.getElementById("emptycart").addEventListener("click", emptyCart);
}

// user feedback on successful add
function addedToCart(pname) {
    var message = pname + " was added to the cart";
    var alerts = document.getElementById("alerts");
    alerts.innerHTML = message;
    if (!alerts.classList.contains("message")) {
        alerts.classList.add("message");
    }
}

/* User Manually empty cart */
function emptyCart() {
    // remove cart session storage object & refresh cart totals
    if (sessionStorage.getItem('cart')) {
        sessionStorage.removeItem('cart');
        updateCartTotal();
        // clear message and remove class style
        var alerts = document.getElementById("alerts");
        alerts.innerHTML = "";
        if (alerts.classList.contains("message")) {
            alerts.classList.remove("message");
        }
    }
}

/* Update Mini Cart */
function updateMiniCart() {
    var miniTotal = 0;
    var miniItems = 0;
    var miniCartTable = "";
    if (sessionStorage.getItem('cart')) {
        var cart = JSON.parse(sessionStorage.getItem('cart'));
        miniItems = cart.length;
        for (var i = 0; i < miniItems; i++) {
            var x = JSON.parse(cart[i]);
            var price = parseFloat(x.price.split('Rs.')[1]);
            var productName = x.productname;
            miniTotal += price;
            miniCartTable += "<tr><td>"+"<br>"+ productName + " " +  "</td><td>Rs." + price.toFixed(2) + "</td></tr>";
        }
    }
    document.getElementById("mini-total-items").innerHTML = miniItems;
    document.getElementById("mini-total-price").innerHTML = miniTotal.toFixed(2);
    document.getElementById("mini-cart-items").innerHTML = miniCartTable;
}
/* User Manually empty cart */
function emptyCart() {
    // remove cart session storage object & refresh cart totals for main cart
    if (sessionStorage.getItem('cart')) {
        sessionStorage.removeItem('cart');
        updateCartTotal();
        updateMiniCart(); // Clear the mini cart as well
        // clear message and remove class style
        var alerts = document.getElementById("alerts");
        alerts.innerHTML = "";
        if (alerts.classList.contains("message")) {
            alerts.classList.remove("message");
        }
    }
}

