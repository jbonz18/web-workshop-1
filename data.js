var products = [{"name":"bed","price":225.0},{"name":"bench","price":29.99},{"name":"chair","price":9.99},{"name":"couch","price":50.0},{"name":"pillow","price":5.0}];


function onLoading(){
    var shopItems = document.getElementById("shop-items");

    console.log(shopItems);
    var newItem = document.createElement("div");
    newItem.innerHTML = 
               `<span class="shop-item-title">Bed</span>
                    <img class="shop-item-image" src="bed.jpg">
                    <div class="shop-item-details">
                        <span class="shop-item-price">$225.00</span>
                        <button class="btn btn-primary shop-item-button" type="button">ADD TO CART</button>
                    </div>
    
                <span class="shop-item-title">Bench</span>
                     <img class="shop-item-image" src="bench.jpg">
                     <div class="shop-item-details">
                        <span class="shop-item-price">$29.99</span>
                        <button class="btn btn-primary shop-item-button"type="button">ADD TO CART</button>
                    </div>`;
              

    shopItems.appendChild(newItem);

    ready()
    
    // while (i < products.length)
    // {
    //     var listItem = document.createElement("section");
    //     listItem.classList.add("row");
        
    //     var name = document.createElement("div");
    //     name.classList.add("col-sm");
    //     name.innerText =  products[i].name;

    //     var price = document.createElement("div");
    //     price.classList.add("col-sm");
    //     price.innerText =  products[i].price;

    //     console.log(products[i]);

    //     dataList.appendChild(listItem);

    //     listItem.appendChild(name);
    //     listItem.appendChild(price);

    //     i = i + 1; // Alternatively, use i++;

    //     // Other ways:
    //     // i += 2;
    //     // i += 3;
    // }
    
}

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}


function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)

}

function purchaseClicked() {
    alert('Thank you for your purchase!! Come back soon!!')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()

}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}

function fetchData() {
    var request = new XMLHttpRequest();
    request.open('GET', '/api/products', true);
    
    request.onload = function() {
      if (request.status !== 200) {
        body.innerHTML = 'An error occurred during your request: ' +  request.status + ' ' + request.statusText;
        return;
      }
      renderTable(JSON.parse(request.responseText));
    };
    request.onerror = function() {
        body.innerHTML = 'An error occurred during your request: ' +  request.status + ' ' + request.statusText;
    };
    request.send();
}