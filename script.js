let cart = [];
let wishlist = [];

function addToCart(product, price) {
  if (!product || !price) {
    console.error('Invalid product or price');
    return;
  }
  console.log(`Adding to cart: ${product}, Price: ₹${price}`);
  cart.push({ product, price });
  updateCart();
}

function addToWishlist(product) {
  if (!product) {
    console.error('Invalid product');
    return;
  }
  console.log(`Adding to wishlist: ${product}`);
  wishlist.push(product);
  updateWishlist();
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
    li.textContent = `${item.product} - ₹${item.price}`;
    cartItems.appendChild(li);
    subtotal += item.price;
  });

  cartTotal.textContent = `₹${subtotal}`;
  shippingCost.textContent = `₹30`; // Static value for now
  finalTotal.textContent = `₹${subtotal + 30}`;
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

function checkout() {
  if (cart.length > 0) {
    const paymentOption = prompt('Select Payment Option:\n1. COD (Cash on Delivery)\n2. Online Payment');
    if (paymentOption === '1') {
      alert('Thanks for shopping!');
      cart = []; // Clear cart after checkout
      updateCart(); // Update cart UI
    } else if (paymentOption === '2') {
      // Online Payment Option
      const options = {
        key: 'YOUR_RAZORPAY_KEY_ID',
        amount: finalTotal.textContent.replace('₹', '') * 100, // Get the total amount
        currency: 'INR',
        name: 'Your Company Name',
        description: 'Test Transaction',
        image: '(link unavailable)',
        handler: function(response) {
          alert('Payment successful!');
          alert('Thanks for shopping!');
          cart = []; // Clear cart after checkout
          updateCart(); // Update cart UI
        },
        prefill: {
          name: 'Your Name',
          email: 'your.email@example.com',
          contact: '9999999999'
        },
        notes: {
          address: 'Your Address'
        },
        theme: {
          color: '#F37254'
        }
      };
      const rzp1 = new Razorpay(options);
      rzp1.open();
    } else {
      alert('Invalid payment option');
    }
  } else {
    alert('Cart is empty!');
  }
}
