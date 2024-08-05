document.addEventListener('DOMContentLoaded', () => {
    //---------Add item to cart
    function addToCart(item) {
        const itemName = item.querySelector('.card-title').textContent;
        const itemPrice = item.querySelector('.card-text').textContent;
        const itemCode = item.querySelector('.card-text').textContent.match(/\(B\d+\)/)[0];

        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        cart.push({ name: itemName, price: itemPrice, code: itemCode });

        localStorage.setItem('cart', JSON.stringify(cart));

        window.location.href = 'cart.html';
    }

    //---------Add event listeners
    document.querySelectorAll('.btn-primary').forEach(button => {
        button.addEventListener('click', event => {
            event.preventDefault();
            addToCart(event.target.closest('.item'));
        });
    });
});

//----------------------------------------------------------------------------

//--------------Display cart items
function displayCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('card', 'my-3');
        itemElement.style.width = '18rem';

        itemElement.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${item.name}</h5>
                <p class="card-text">Price: ${item.price} <br>Discount: ${item.discount}%</p>
                <p class="card-text">Item Code: ${item.code}</p>
            </div>
        `;

        cartItemsContainer.appendChild(itemElement);
    });
}

//------------------Display cart items on page load
document.addEventListener('DOMContentLoaded', displayCart);
