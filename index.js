document.addEventListener('DOMContentLoaded', function(event) {
      
    document.querySelectorAll('.remove').forEach(function(element) {
        element.addEventListener('click', remove);
    });
    document.querySelectorAll('.cart-items input').forEach(function(element) {
        element.addEventListener('change', quantityChange);
    })
    document.querySelectorAll('.addToCart').forEach(function(element) {
        element.addEventListener('click', addCartItem);
    })
    document.querySelector('.purchase').addEventListener('click', purchased);

    function purchased(event) {
        alert('Thank you for your purchase');
        let cartItems = document.querySelector('.cart-rows');
        while (cartItems.hasChildNodes()) {
            cartItems.removeChild(cartItems.firstChild)
        }
        updateTotal();
    }

    function addCartItem(event) {
        let button = event.target;
        let shopItem = button.parentElement.parentElement;
        let title = shopItem.querySelector('h2').innerText;
        let price = shopItem.querySelector('span').innerText;
        let imgSrc = shopItem.querySelector('img').src;
        addItemToCart(title, price, imgSrc);
        updateTotal()
    }

    function addItemToCart(title, price, imgSrc) {
        let cartRow = document.createElement('div');
        let cartItems = document.querySelector('.cart-rows');
        let cartRowContents = `
            <div class="cart-items">
                <div class="cart-items-1">
                    <img src=${imgSrc} alt="nice pic">
                    <span class="title">${title}</span>
                </div>
                <span class="cart-items-price">${price}</span>
                <div>
                    <input type="number" value="1">
                    <button class="remove" type="button">Remove</button>
                </div>
            </div>`
        cartRow.innerHTML = cartRowContents;
        cartItems.append(cartRow)
        cartRow.querySelector('.remove').addEventListener('click', remove);
        cartRow.querySelector('.cart-items input').addEventListener('change', quantityChange);
    }

    function quantityChange(event) {
        // let input = event.target;  --->>> can use this instead of input:
        if (isNaN(this.value) || this.value <= 0) {
            this.value = 1;
        }
        updateTotal();
    }

    function remove(event) {
        this.parentElement.parentElement.remove();
        updateTotal();
    }

    function updateTotal() {
        let cartRows = document.querySelectorAll('.cart-items');
        let total = 0;
        for (let i = 0; i < cartRows.length; i++) {
            let cartRow = cartRows[i];
            let priceElement = cartRow.querySelector('.cart-items-price');
            let quantityElement = cartRow.querySelector('.cart-items input');
            let price = parseFloat(priceElement.innerText.replace('$', ''));
            let quantity = parseFloat(quantityElement.value);
            total = total + (price * quantity);
        }
        total = parseFloat(total).toFixed(2);
        document.querySelector('.total span').innerText ='$' + total;
    }
    updateTotal();



})

