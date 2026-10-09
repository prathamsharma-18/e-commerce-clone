// =========================================================
// SHOPZONE E-COMMERCE JAVASCRIPT
// =========================================================

// 1. DATA: List of available products in our store
const products = [
  {
    id: 1,
    name: "Wireless Over-Ear Headphones",
    category: "electronics",
    price: 1999,
    originalPrice: 3999,
    discount: "50% off",
    rating: "⭐⭐⭐⭐☆",
    ratingScore: "4.2",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80"
  },
  {
    id: 2,
    name: "Fitness Smartwatch v2",
    category: "accessories",
    price: 2499,
    originalPrice: 4999,
    discount: "50% off",
    rating: "⭐⭐⭐⭐⭐",
    ratingScore: "4.8",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80"
  },
  {
    id: 3,
    name: "Pro Athletic Running Shoes",
    category: "fashion",
    price: 1499,
    originalPrice: 2999,
    discount: "50% off",
    rating: "⭐⭐⭐⭐☆",
    ratingScore: "4.3",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80"
  },
  {
    id: 4,
    name: "RGB Mechanical Keyboard",
    category: "electronics",
    price: 3299,
    originalPrice: 5499,
    discount: "40% off",
    rating: "⭐⭐⭐⭐⭐",
    ratingScore: "4.7",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80"
  },
  {
    id: 5,
    name: "Classic Polarized Sunglasses",
    category: "accessories",
    price: 899,
    originalPrice: 1999,
    discount: "55% off",
    rating: "⭐⭐⭐⭐☆",
    ratingScore: "4.1",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&q=80"
  },
  {
    id: 6,
    name: "Cotton Casual Denim Jacket",
    category: "fashion",
    price: 2199,
    originalPrice: 4399,
    discount: "50% off",
    rating: "⭐⭐⭐⭐⭐",
    ratingScore: "4.6",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80"
  }
];

// 2. STATE
let cart = [];
let currentCategory = "all";
let searchQuery = "";

// 3. SELECTING HTML ELEMENTS
const cartBox = document.querySelector(".cart-box");
const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");
const closeCartBtn = document.getElementById("closeCartBtn");
const cartCountNav = document.querySelector(".cart-count");
const drawerCartCount = document.getElementById("drawerCartCount");
const cartItemsContainer = document.getElementById("cartItemsContainer");
const cartTotalPrice = document.getElementById("cartTotalPrice");
const checkoutBtn = document.getElementById("checkoutBtn");
const productGrid = document.querySelector(".product-grid");
const searchInput = document.querySelector(".search-input");
const categoryButtons = document.querySelectorAll(".category-btn");
const sectionTitle = document.getElementById("sectionTitle");

// =========================================================
// 4. FUNCTION: Render Filtered Products on screen
// =========================================================
function renderProducts() {
  productGrid.innerHTML = "";

  // Filter based on both Category and Search Query!
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      currentCategory === "all" || product.category === currentCategory;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (filteredProducts.length === 0) {
    productGrid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #555;">
        <h3>No products found matching "${searchQuery}"</h3>
        <p style="margin-top: 8px;">Try searching for another term or click 'All Products' above.</p>
      </div>
    `;
    return;
  }

  filteredProducts.forEach((product) => {
    const cardHTML = `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}" class="product-img">
        <div class="product-info">
          <h4 class="product-name">${product.name}</h4>
          <div class="product-rating">${product.rating} <span>(${product.ratingScore})</span></div>
          <div class="product-price">
            <span class="currency">₹</span><span class="price-value">${product.price.toLocaleString("en-IN")}</span>
            <span class="original-price">₹${product.originalPrice.toLocaleString("en-IN")}</span>
            <span class="discount">(${product.discount})</span>
          </div>
          <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
      </div>
    `;
    productGrid.innerHTML += cardHTML;
  });
}

// =========================================================
// 5. SEARCH & CATEGORY FILTERING
// =========================================================

// Listen as the user types into the search box
searchInput.addEventListener("input", (e) => {
  searchQuery = e.target.value.trim();
  renderProducts();
});

// Listen for clicks on Category Pills
categoryButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Update active button styling
    categoryButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    // Filter products
    currentCategory = btn.getAttribute("data-category");
    renderProducts();
  });
});

// =========================================================
// 6. OPEN & CLOSE CART DRAWER
// =========================================================
function openCart() {
  cartDrawer.classList.add("open");
  cartOverlay.classList.add("active");
}

function closeCart() {
  cartDrawer.classList.remove("open");
  cartOverlay.classList.remove("active");
}

cartBox.addEventListener("click", openCart);
closeCartBtn.addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);

// =========================================================
// 7. CART FUNCTIONALITY (Add, Quantity +/- , Remove)
// =========================================================

// Add to Cart
function addToCart(productId) {
  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    // If product already in cart, just increase quantity
    existingItem.quantity += 1;
  } else {
    // Add product with starting quantity of 1
    const productToAdd = products.find((p) => p.id === productId);
    if (productToAdd) {
      cart.push({ ...productToAdd, quantity: 1 });
    }
  }

  updateCartUI();
  openCart();
}

// Increase Quantity (+)
function increaseQuantity(productId) {
  const item = cart.find((i) => i.id === productId);
  if (item) {
    item.quantity += 1;
    updateCartUI();
  }
}

// Decrease Quantity (-)
function decreaseQuantity(productId) {
  const item = cart.find((i) => i.id === productId);
  if (item) {
    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      // If quantity is 1 and user clicks minus, remove item from cart
      cart = cart.filter((i) => i.id !== productId);
    }
    updateCartUI();
  }
}

// Remove completely
function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  updateCartUI();
}

// =========================================================
// 8. UPDATE CART ON SCREEN
// =========================================================
function updateCartUI() {
  // Total quantity count (e.g. 2 headphones + 1 watch = 3 items)
  const totalItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCountNav.textContent = totalItemCount;
  drawerCartCount.textContent = totalItemCount;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p class="empty-cart-msg">Your cart is currently empty.</p>';
    cartTotalPrice.textContent = "₹0";
    return;
  }

  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    const itemSubtotal = item.price * item.quantity;
    total += itemSubtotal;

    const itemHTML = `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img">
        <div class="cart-item-details">
          <div class="cart-item-title">${item.name}</div>
          <div class="cart-item-price">₹${itemSubtotal.toLocaleString("en-IN")}</div>
          <div class="cart-qty-controls">
            <button class="qty-btn" onclick="decreaseQuantity(${item.id})">-</button>
            <span class="qty-number">${item.quantity}</span>
            <button class="qty-btn" onclick="increaseQuantity(${item.id})">+</button>
            <button class="cart-item-remove-btn" onclick="removeFromCart(${item.id})">Delete</button>
          </div>
        </div>
      </div>
    `;
    cartItemsContainer.innerHTML += itemHTML;
  });

  cartTotalPrice.textContent = `₹${total.toLocaleString("en-IN")}`;
}

// Checkout Button Demo
checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty! Add some products first.");
  } else {
    alert(`Thank you for shopping with ShopZone! Total: ${cartTotalPrice.textContent}`);
    cart = [];
    updateCartUI();
    closeCart();
  }
});

// Initial Render
renderProducts();
