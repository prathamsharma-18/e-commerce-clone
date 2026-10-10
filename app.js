// =========================================================
// SHOPZONE E-COMMERCE JAVASCRIPT
// =========================================================

// 1. DATA: Product Catalog with descriptions & categories
const products = [
  {
    id: 1,
    name: "Wireless Over-Ear Headphones",
    category: "electronics",
    price: 1999,
    originalPrice: 3999,
    discount: "50% off",
    rating: "⭐⭐⭐⭐☆",
    ratingScore: 4.2,
    description: "High-fidelity wireless sound with active noise cancellation, ultra-soft memory foam ear cups, and 30-hour battery life.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80"
  },
  {
    id: 2,
    name: "Fitness Smartwatch v2",
    category: "accessories",
    price: 2499,
    originalPrice: 4999,
    discount: "50% off",
    rating: "⭐⭐⭐⭐⭐",
    ratingScore: 4.8,
    description: "Track your health metrics 24/7 with AMOLED display, SpO2 sensor, heart-rate tracking, and 5ATM water resistance.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80"
  },
  {
    id: 3,
    name: "Pro Athletic Running Shoes",
    category: "fashion",
    price: 1499,
    originalPrice: 2999,
    discount: "50% off",
    rating: "⭐⭐⭐⭐☆",
    ratingScore: 4.3,
    description: "Lightweight and breathable mesh construction with responsive air cushioning designed for long-distance comfort.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80"
  },
  {
    id: 4,
    name: "RGB Mechanical Keyboard",
    category: "electronics",
    price: 3299,
    originalPrice: 5499,
    discount: "40% off",
    rating: "⭐⭐⭐⭐⭐",
    ratingScore: 4.7,
    description: "Tactile mechanical switches with per-key customizable RGB lighting, aluminum frame, and detachable USB-C braided cable.",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&q=80"
  },
  {
    id: 5,
    name: "Classic Polarized Sunglasses",
    category: "accessories",
    price: 899,
    originalPrice: 1999,
    discount: "55% off",
    rating: "⭐⭐⭐⭐☆",
    ratingScore: 4.1,
    description: "Timeless retro frames with 100% UV400 protective polarized lenses that eliminate glare while driving and outdoors.",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80"
  },
  {
    id: 6,
    name: "Cotton Casual Denim Jacket",
    category: "fashion",
    price: 2199,
    originalPrice: 4399,
    discount: "50% off",
    rating: "⭐⭐⭐⭐⭐",
    ratingScore: 4.6,
    description: "Premium washed cotton denim with classic metal button closures, multiple pockets, and all-weather stylish fit.",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80"
  },
  {
    id: 7,
    name: "Portable Bluetooth Speaker",
    category: "electronics",
    price: 1799,
    originalPrice: 3499,
    discount: "48% off",
    rating: "⭐⭐⭐⭐☆",
    ratingScore: 4.4,
    description: "Compact 360-degree surround sound with booming bass, IPX7 waterproof rating, and 12-hour continuous playtime.",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&q=80"
  },
  {
    id: 8,
    name: "Minimalist Leather Backpack",
    category: "fashion",
    price: 2899,
    originalPrice: 5999,
    discount: "51% off",
    rating: "⭐⭐⭐⭐⭐",
    ratingScore: 4.9,
    description: "Handcrafted water-resistant leather with dedicated 15.6-inch padded laptop sleeve and ergonomic shoulder straps.",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80"
  }
];

// 2. STATE (Persistent with localStorage!)
let cart = JSON.parse(localStorage.getItem("shopzone_cart")) || [];
let currentCategory = "all";
let searchQuery = "";
let currentSort = "default";

// 3. SELECTING DOM ELEMENTS
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
const sortSelect = document.getElementById("sortSelect");
const productCountBadge = document.getElementById("productCountBadge");
const backToTopBtn = document.getElementById("backToTopBtn");
const toastContainer = document.getElementById("toastContainer");

// Modal Elements
const productModal = document.getElementById("productModal");
const productModalOverlay = document.getElementById("productModalOverlay");
const closeModalBtn = document.getElementById("closeModalBtn");
const modalProductDetails = document.getElementById("modalProductDetails");

// =========================================================
// 4. FUNCTION: Save Cart to LocalStorage
// =========================================================
function saveCart() {
  localStorage.setItem("shopzone_cart", JSON.stringify(cart));
}

// =========================================================
// 5. TOAST NOTIFICATION HELPER
// =========================================================
function showToast(message, icon = "✅") {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
  toastContainer.appendChild(toast);

  // Auto-remove after 3 seconds
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

// =========================================================
// 6. RENDER PRODUCTS (With Filters & Sorting)
// =========================================================
function renderProducts() {
  productGrid.innerHTML = "";

  // 1. Filter
  let filtered = products.filter((product) => {
    const matchesCategory =
      currentCategory === "all" || product.category === currentCategory;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // 2. Sort
  if (currentSort === "price-low") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (currentSort === "price-high") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (currentSort === "rating") {
    filtered.sort((a, b) => b.ratingScore - a.ratingScore);
  }

  // Update badge count
  productCountBadge.textContent = `Showing ${filtered.length} products`;

  if (filtered.length === 0) {
    productGrid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #555;">
        <h3>No products found matching "${searchQuery}"</h3>
        <p style="margin-top: 8px;">Try searching for another keyword or select 'All Products'.</p>
      </div>
    `;
    return;
  }

  filtered.forEach((product) => {
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
          <button class="quick-view-btn" onclick="openProductModal(${product.id})">Quick View</button>
        </div>
      </div>
    `;
    productGrid.innerHTML += cardHTML;
  });
}

// =========================================================
// 7. PRODUCT QUICK VIEW MODAL
// =========================================================
function openProductModal(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  modalProductDetails.innerHTML = `
    <div class="modal-grid">
      <img src="${product.image}" alt="${product.name}" class="modal-img">
      <div class="modal-info">
        <span class="modal-category-tag">${product.category}</span>
        <h2 class="modal-title">${product.name}</h2>
        <div class="product-rating">${product.rating} <span>(${product.ratingScore} / 5)</span></div>
        <div class="product-price">
          <span class="currency">₹</span><span class="price-value">${product.price.toLocaleString("en-IN")}</span>
          <span class="original-price">₹${product.originalPrice.toLocaleString("en-IN")}</span>
          <span class="discount">(${product.discount})</span>
        </div>
        <p class="modal-desc">${product.description}</p>
        <button class="add-to-cart-btn" style="margin-top: 15px;" onclick="addToCart(${product.id}); closeProductModal();">
          Add to Cart
        </button>
      </div>
    </div>
  `;

  productModal.classList.add("open");
  productModalOverlay.classList.add("active");
}

function closeProductModal() {
  productModal.classList.remove("open");
  productModalOverlay.classList.remove("active");
}

closeModalBtn.addEventListener("click", closeProductModal);
productModalOverlay.addEventListener("click", closeProductModal);

// =========================================================
// 8. EVENT LISTENERS: Search, Sort, Categories, Scroll
// =========================================================
searchInput.addEventListener("input", (e) => {
  searchQuery = e.target.value.trim();
  renderProducts();
});

sortSelect.addEventListener("change", (e) => {
  currentSort = e.target.value;
  renderProducts();
});

categoryButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    categoryButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentCategory = btn.getAttribute("data-category");
    renderProducts();
  });
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// =========================================================
// 9. CART DRAWER (Open / Close)
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
// 10. CART LOGIC (Add, Quantity, Remove, Clear)
// =========================================================
function addToCart(productId) {
  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
    showToast(`Increased quantity for ${existingItem.name}`, "🛒");
  } else {
    const productToAdd = products.find((p) => p.id === productId);
    if (productToAdd) {
      cart.push({ ...productToAdd, quantity: 1 });
      showToast(`Added ${productToAdd.name} to Cart!`, "🛒");
    }
  }

  saveCart();
  updateCartUI();
  openCart();
}

function increaseQuantity(productId) {
  const item = cart.find((i) => i.id === productId);
  if (item) {
    item.quantity += 1;
    saveCart();
    updateCartUI();
  }
}

function decreaseQuantity(productId) {
  const item = cart.find((i) => i.id === productId);
  if (item) {
    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      cart = cart.filter((i) => i.id !== productId);
      showToast("Item removed from cart", "🗑️");
    }
    saveCart();
    updateCartUI();
  }
}

function removeFromCart(productId) {
  const removedItem = cart.find((item) => item.id === productId);
  cart = cart.filter((item) => item.id !== productId);
  if (removedItem) {
    showToast(`Removed ${removedItem.name}`, "🗑️");
  }
  saveCart();
  updateCartUI();
}

// =========================================================
// 11. UPDATE CART UI
// =========================================================
function updateCartUI() {
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
    showToast("Your cart is empty! Add items first.", "⚠️");
  } else {
    alert(`🎉 Order Placed Successfully!\nTotal Paid: ${cartTotalPrice.textContent}\nThank you for shopping with ShopZone.`);
    cart = [];
    saveCart();
    updateCartUI();
    closeCart();
  }
});

// Run on page load
renderProducts();
updateCartUI(); // Restore cart items from localStorage if any
