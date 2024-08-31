let cart = [];
let wishlist = [];
const shippingFee = 30; 

function addToCart(product, price) {
    cart.push({ product, price });
    updateCart();
    addToWishlist(product); 
}


function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const shippingCost = document.getElementById('shipping-cost');
    const finalTotal = document.getElementById('final-total');
    cartItems.innerHTML = '';
    let subtotal = 0;

    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.product} - ₹${item.price.toLocaleString('en-IN')}`;
        cartItems.appendChild(li);
        subtotal += item.price;
    });

    cartTotal.textContent = `₹${subtotal.toLocaleString('en-IN')}`;
    shippingCost.textContent = `₹${shippingFee}`;
    finalTotal.textContent = `₹${(subtotal + shippingFee).toLocaleString('en-IN')}`;
}


function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty! Please add items to the cart before checking out.');
        return;
    }

    const paymentMethod = prompt('Choose your payment method: (1) Cash on Delivery (2) Online Payment');

    if (paymentMethod !== '1' && paymentMethod !== '2') {
        alert('Invalid payment method selected. Please choose 1 for Cash on Delivery or 2 for Online Payment.');
        return;
    }

    const cartSummary = cart.map(item => `${item.product} - ₹${item.price.toLocaleString('en-IN')}`).join('\n');
    const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
    const total = subtotal + shippingFee;

    const confirmation = confirm(`Your order:\n\n${cartSummary}\n\nSubtotal: ₹${subtotal.toLocaleString('en-IN')}\nShipping Fee: ₹${shippingFee}\nTotal: ₹${total.toLocaleString('en-IN')}\n\nPayment Method: ${paymentMethod === '1' ? 'Cash on Delivery' : 'Online Payment'}\n\nDo you want to proceed to checkout?`);

    if (confirmation) {
        if (paymentMethod === '2') {
            alert('Redirecting to online payment gateway...');
            
        }
        alert('Thank you for your purchase! Your order has been placed.');
        cart = []; 
        updateCart(); 
    }
}


function addToWishlist(product) {
    
    if (!wishlist.includes(product)) {
        wishlist.push(product);
    }
    updateWishlist();
}


function updateWishlist() {
    const wishlistItems = document.getElementById('wishlist-items');
    wishlistItems.innerHTML = '';

    wishlist.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        wishlistItems.appendChild(li);
    });
}