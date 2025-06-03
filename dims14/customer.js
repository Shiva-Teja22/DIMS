
    // Sample product data
    const products = [
      {
        name: "Paracetamol",
        price: 2,
        description: "Pain reliever and fever reducer",
        image: "https://5.imimg.com/data5/SELLER/Default/2025/5/511449998/VL/OC/OK/66023219/product-jpeg-500x500.jpeg"
      },
      {
        name: "Amoxicillin",
        price: 5.0,
        description: "Antibiotic for bacterial infections",
        image: "https://images.unsplash.com/photo-1606813909339-cff1ddac278a?auto=format&fit=crop&w=400&q=60"
      },
      {
        name: "Ibuprofen",
        price: 2.0,
        description: "Anti-inflammatory and pain relief",
        image: "https://images.unsplash.com/photo-1576765607923-900a95ce0b44?auto=format&fit=crop&w=400&q=60"
      },
      {
        name: "Cetirizine",
        price: 1.5,
        description: "Allergy relief medication",
        image: "https://images.unsplash.com/photo-1604908177524-1225b639e121?auto=format&fit=crop&w=400&q=60"
      },
      {
        name: "Amoxicillin",
        price: 5.0,
        description: "Antibiotic for bacterial infections",
        image: "https://images.unsplash.com/photo-1606813909339-cff1ddac278a?auto=format&fit=crop&w=400&q=60"
      },
      {
        name: "Amoxicillin",
        price: 5.0,
        description: "Antibiotic for bacterial infections",
        image: "https://images.unsplash.com/photo-1606813909339-cff1ddac278a?auto=format&fit=crop&w=400&q=60"
      },
      {
        name: "Amoxicillin",
        price: 5.0,
        description: "Antibiotic for bacterial infections",
        image: "https://images.unsplash.com/photo-1606813909339-cff1ddac278a?auto=format&fit=crop&w=400&q=60"
      },
      {
        name: "Amoxicillin",
        price: 5.0,
        description: "Antibiotic for bacterial infections",
        image: "https://images.unsplash.com/photo-1606813909339-cff1ddac278a?auto=format&fit=crop&w=400&q=60"
      }
    ];

    const pageproducts = [
       {
        name: "Adderall",
        price: 5.0,
        description: "prescribe Adhd",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxUGuT4KkugcRvMuyOyNjvVEZgFjYU6XyWqy0XKrh2Ct8-PDNr3KU9UVB0mxlNDgkXMYc&usqp=CAU"
      },

      {
        name: "Botox",
        price: 10,
        description: "",
        image: "https://qtxasset.com/quartz/qcloud5/media/image/fiercepharma/1525114362/botox-cosmetic-100-units-vial.jpg/botox-cosmetic-100-units-vial.jpg?VersionId=eF_7tq9mMuOKr2Q2Wj3iSQGibu_kYIVZ",
      },
      {
        name: "Plan B",
        price: 1.1,
        description: "",
        image: "https://bevmo.com/cdn/shop/files/dc41e614-7bf9-47a3-a21e-28db5f8778cc-padded.png?v=1737123249&width=1445",
      },
      {
        name: "Metformin",
        price: 3,
        description: "",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtGvHvhgNNNw8uRwAW3hvXP8u4Dou7q8z46Q&s"
      },
      {
        name: "",
        price: 0,
        description: "",
        image: ""
      },
      {
        name: "",
        price: 0,
        description: "",
        image: ""
      },
      {
        name: "",
        price: 0,
        description: "",
        image: ""
      },
      {
        name: "",
        price: 0,
        description: "",
        image: ""
      },{
        name: "",
        price: 0,
        description: "",
        image: ""
      }


    ];

const cartBtn = document.getElementById('cartBtn');
const cartPanel = document.getElementById('cartPanel');
const closeCartBtn = document.getElementById('closeCartBtn');
const searchInput = document.getElementById('searchInput');
const darkModeToggle = document.getElementById('darkModeToggle');
const cartCountElem = document.getElementById('cartCount');
const placeOrderBtn = document.getElementById('placeOrderBtn');
const USD_TO_INR = 83.0; // or your preferred current rate

let cart = {};

  const shopContainer = document.querySelector(".shop-container");

  // Clear container (optional if empty)
  shopContainer.innerHTML = "";

  // Render only first 8 products
  products.slice(0, 8).forEach(product => {
    const productEl = document.createElement("article");
    productEl.classList.add("shop-item");
    productEl.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h2>${product.name}</h2>
      <p class="description">${product.description}</p>
      <div class="price">₹${product.price.toFixed(2)}</div>
      <button>Add to Cart</button>
    `;
    shopContainer.appendChild(productEl);
  });

  const allProducts = document.querySelectorAll(".shop-item");

allProducts.forEach((item, index) => {
  if (index >= 8) {
    item.style.display = "none";
  } else {
    item.style.display = "block";
  }
});



if (localStorage.getItem('cart')) {
  try {
    cart = JSON.parse(localStorage.getItem('cart'));
  } catch {
    cart = {};
  }
}

function renderProducts(filter = '') {
  shopContainer.innerHTML = '';
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(filter.toLowerCase())
  );
  if (filteredProducts.length === 0) {
    shopContainer.innerHTML = '<p>No products found.</p>';
    return;
  }
  filteredProducts.forEach(product => {
    const productEl = document.createElement('article');
    productEl.className = 'shop-item';
    productEl.setAttribute('tabindex', '0');
    productEl.innerHTML = `
      <img src="${product.image}" alt="${product.name}" loading="lazy" />
      <h2>${product.name}</h2>
      <p class="description">${product.description}</p>
      <p class="price">₹${(product.price * USD_TO_INR).toFixed(2)}</p>
      <button aria-label="Add ${product.name} to cart">Add to Cart</button>
    `;
    productEl.querySelector('button').addEventListener('click', () => {
      addToCart(product.name, product.price);
    });
    shopContainer.appendChild(productEl);
  });
}

function addToCart(name, price) {
  if (cart[name]) {
    cart[name].quantity += 1;
  } else {
    cart[name] = { price: price, quantity: 1 };
  }
  saveCart();
  updateCartUI();
  openCart();
}

function removeFromCart(name) {
  if (cart[name]) {
    delete cart[name];
    saveCart();
    updateCartUI();
  }
}

function updateQuantity(name, qty) {
  const quantity = parseInt(qty, 10);
  if (!Number.isInteger(quantity) || quantity < 1) {
    updateCartUI();
    return;
  }
  if (cart[name]) {
    cart[name].quantity = quantity;
    saveCart();
    updateCartUI();
  }
}

function changeQuantity(name, delta) {
  if (cart[name]) {
    cart[name].quantity += delta;
    if (cart[name].quantity < 1) {
      removeFromCart(name);
    } else {
      saveCart();
      updateCartUI();
    }
  }
}

function calculateTotal() {
  return Object.values(cart).reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartUI() {
  cartCountElem.textContent = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);

  const cartItems = document.getElementById('cartItems');
  cartItems.innerHTML = '';

  if (Object.keys(cart).length === 0) {
    cartItems.innerHTML = '<p>Your cart is empty.</p>';
    document.getElementById('cartTotal').textContent = 'Total: ₹ 0.00';
    updatePlaceOrderButton();
    return;
  }

  for (const [name, item] of Object.entries(cart)) {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `
      <div>
        <h3>${name}</h3>
        <p>₹${(item.price * USD_TO_INR).toFixed(2)} x ${item.quantity} = ₹${(item.price * item.quantity * USD_TO_INR).toFixed(2)}</p>
      </div>
      <div class="cart-item-controls">
        <div class="quantity-controls" aria-label="Adjust quantity for ${name}">
          <button class="quantity-btn" aria-label="Decrease quantity of ${name}" tabindex="0">-</button>
          <input class="quantity-input" type="number" min="1" aria-label="Quantity of ${name}" value="${item.quantity}" />
          <button class="quantity-btn" aria-label="Increase quantity of ${name}" tabindex="0">+</button>
        </div>
        <button class="remove-item" aria-label="Remove ${name} from cart" tabindex="0">&times;</button>
      </div>
    `;

    const [decBtn, qtyInput, incBtn] = cartItem.querySelectorAll('.quantity-controls > *');
    decBtn.addEventListener('click', () => changeQuantity(name, -1));
    incBtn.addEventListener('click', () => changeQuantity(name, 1));
    qtyInput.addEventListener('change', (e) => updateQuantity(name, e.target.value));
    cartItem.querySelector('.remove-item').addEventListener('click', () => removeFromCart(name));

    cartItems.appendChild(cartItem);
  }

document.getElementById('cartTotal').textContent = `Total: ₹${(calculateTotal() * USD_TO_INR).toFixed(2)}`;

  updatePlaceOrderButton();
}

function updatePlaceOrderButton() {
  placeOrderBtn.disabled = Object.keys(cart).length === 0;
}

function openCart() {
  cartPanel.classList.add('open');
  cartPanel.focus();
}

function closeCart() {
  cartPanel.classList.remove('open');
  cartBtn.focus();
}

function toggleDarkMode() {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
  darkModeToggle.setAttribute('aria-pressed', isDark.toString());
  darkModeToggle.textContent = isDark ? 'Light Mode' : 'Dark Mode';
}

function loadDarkMode() {
  if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark');
    darkModeToggle.setAttribute('aria-pressed', 'true');
    darkModeToggle.textContent = 'Light Mode';
  }
}

cartBtn.addEventListener('click', openCart);
closeCartBtn.addEventListener('click', closeCart);
darkModeToggle.addEventListener('click', toggleDarkMode);
searchInput.addEventListener('input', (e) => {
  renderProducts(e.target.value.trim());
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && cartPanel.classList.contains('open')) {
    closeCart();
  }
});
placeOrderBtn.addEventListener('click', () => {
  if (Object.keys(cart).length === 0) {
    alert("Your cart is empty!");
    return;
  }
  alert("Thank you for your order! We'll process it soon.");
  cart = {};
  saveCart();
  updateCartUI();
  closeCart();
});

loadDarkMode();
renderProducts();
updateCartUI();
