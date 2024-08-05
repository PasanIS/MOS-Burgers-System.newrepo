function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('expanded');
}


document.addEventListener('DOMContentLoaded', () => {
    const categories = document.querySelectorAll('.cat');
    const items = document.querySelectorAll('.item');

    //--------Hide all items---------
    items.forEach(item => {
        item.style.display = 'none';
    });

    categories.forEach(category => {
        category.addEventListener('click', () => {
            const categoryType = category.getAttribute('data-category');

            items.forEach(item => {
                if (item.classList.contains(categoryType)) {
                    item.style.display = 'flex'; //-------Show item if it matches the category
                    item.classList.add('fade-in');
                } else {
                    item.style.display = 'none'; //-------Hide item if it doesn't match
                    item.classList.remove('fade-in');
                }
            });
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.getElementById('menu-btn');
    const contentDiv = document.getElementById('content');

    menuButton.addEventListener('click', () => {
        fetch('menu.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(data => {
                contentDiv.innerHTML = data;
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    });
});

//------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    const checkoutButton = document.getElementById('checkout-btn');
    const popupForm = document.getElementById('popup-form');
    const closePopupButton = document.querySelector('.close-popup');

    //--------Open Form
    checkoutButton.addEventListener('click', () => {
        popupForm.style.display = 'flex';
    });

    //--------Close Form
    closePopupButton.addEventListener('click', () => {
        popupForm.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === popupForm) {
            popupForm.style.display = 'none';
        }
    });

    document.getElementById('checkout-form').addEventListener('submit', (e) => {
        e.preventDefault();

        popupForm.style.display = 'none';
    });
});

//-------------------------------------------
//-----------------Function to add item to cart
function addToCart(event) {
    event.preventDefault();

    const button = event.target;
    const itemName = button.getAttribute('data-name');
    const itemCode = button.getAttribute('data-code');
    const itemPrice = parseFloat(button.getAttribute('data-price'));
    const itemDiscount = parseFloat(button.getAttribute('data-discount')) || 0;

    const cartItem = {
        name: itemName,
        code: itemCode,
        price: itemPrice,
        discount: itemDiscount
    };

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(cart));

    alert(`${itemName} added to cart!`);
}

//-------------Event listener to all "Add to Cart" buttons
document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('click', addToCart);
});
