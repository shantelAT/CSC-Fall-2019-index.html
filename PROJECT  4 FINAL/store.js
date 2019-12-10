var nameOfItemInCart = []
var priceOfItemInCart = []
var quantityOfItemInCart = []


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
        var nameElement = cartRow.getElementsByClassName ("cart-item-title")[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
        var eachName = nameElement.innerHTML   
       // 
   // nameOfItemInCart.push(eachName) 

    //priceElement = cartRow.getElementsByClassName('cart-price')[0]
    //var eachPrice = priceElement.innerHTML 
   // priceOfItemInCart.push(eachPrice)

    //var eachQuantity = quantityElement.value
    //quantityOfItemInCart.push(eachQuantity)

    var t_index = nameOfItemInCart.indexOf(eachName);

	if (t_index == -1){
        nameOfItemInCart.push(eachName);
        priceOfItemInCart.push(price);
        quantityOfItemInCart.push(quantity); 
    } else {
        quantityOfItemInCart[t_index]= quantity;
    }
   
 }
    total = Math.round(total * 100) / 100

    document.getElementsByClassName('cart-total-price')[0].innerText = total
}


function shantelwallet(){

    var inputValue =document.getElementById("inputvalue").value;
    var Balance = document.getElementById("balances").innerHTML;
    var finaltotal= +inputValue + +Balance

document.getElementById("balances").innerHTML = finaltotal;
document.getElementById("inputvalue").value = "";

}


function shantelpurchase() {

var walletbalances = document.getElementById("balances").innerHTML
var cartTotal = document.getElementsByClassName('cart-total-price')[0].innerText 
var CartnameOfItemInCart = nameOfItemInCart;



if (cartTotal <= walletbalances ){

var finalwalletbalance = walletbalances- cartTotal;
document.getElementById("balances").innerHTML = finalwalletbalance 


var cartItems = "<ul>"; 
for (var i=0; i < nameOfItemInCart.length; i++){
	cartItems += "<li> " + quantityOfItemInCart[i]  + nameOfItemInCart[i] +  " for $" + priceOfItemInCart[i] + "</li>" ; 
	 } 
 cartItems += "</ul>"; 


document.getElementById("receipt").innerHTML = "<h2> Thank You for Your Order!</h2>" + "<h3> Your Receipt  </h3>" + "<br/> Total Product Cost: $" + cartTotal +"<br/> Remainding Balance: $" + finalwalletbalance + cartItems;

   var allreciept = document.getElementById("body");
   allreciept.parentNode.removeChild(allreciept);
}

else{ 

alert("sorry, You do not have enough fund.")
}


}






