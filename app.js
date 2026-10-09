// =========================================================
// SHOPZONE E-COMMERCE JAVASCRIPT
// =========================================================

// 1. DATA: List of available products in our store
const products = [
  {
    id: 1,
    name: "Wireless Over-Ear Headphones",
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
    price: 3299,
    originalPrice: 5499,
    discount: "40% off",
    rating: "⭐⭐⭐⭐⭐",
    ratingScore: "4.7",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80"
  }
];

// 2. STATE: Our shopping cart starts empty
let cart = [];

// 3. SELECTING HTML ELEMENTS (connecting JS to the screen)
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

// =========================================================
// 4. FUNCTION: Render Product Cards on screen dynamically
// =========================================================
function renderProducts() {
  productGrid.innerHTML = ""; // Clear existing static cards

  products.forEach((product) => {
    // Create card HTML for each item
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
// 5. FUNCTION: Open and Close the Cart Drawer
// =========================================================
function openCart() {
  cartDrawer.classList.add("open");
  cartOverlay.classList.add("active");
}

function closeCart() {
  cartDrawer.classList.remove("open");
  cartOverlay.classList.remove("active");
}

// Listen for clicks to open / close
cartBox.addEventListener("click", openCart);
closeCartBtn.addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);

// =========================================================
// 6. FUNCTION: Add an item to the Cart
// =========================================================
function addToCart(productId) {
  // Find product from list by its ID
  const productToAdd = products.find((p) => p.id === productId);

  if (productToAdd) {
    // Add to our cart list
    cart.push(productToAdd);

    // Refresh UI
    updateCartUI();

    // Automatically slide drawer open so user sees their added item!
    openCart();
  }
}

// =========================================================
// 7. FUNCTION: Remove an item from the Cart
// =========================================================
function removeFromCart(index) {
  // Remove 1 item at specified index
  cart.splice(index, 1);
  updateCartUI();
}

// =========================================================
// 8. FUNCTION: Update everything related to the Cart on screen
// =========================================================
function updateCartUI() {
  // Update badge counter in Navbar and Drawer Header
  cartCountNav.textContent = cart.length;
  drawerCartCount.textContent = cart.length;

  // If empty, show empty message
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p class="empty-cart-msg">Your cart is currently empty.</p>';
    cartTotalPrice.textContent = "₹0";
    return;
  }

  // If items exist, render them inside the drawer
  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;

    const itemHTML = `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img">
        <div class="cart-item-details">
          <div class="cart-item-title">${item.name}</div>
          <div class="cart-item-price">₹${item.price.toLocaleString("en-IN")}</div>
          <button class="cart-item-remove-btn" onclick="removeFromCart(${index})">Remove</button>
        </div>
      </div>
    `;
    cartItemsContainer.innerHTML += itemHTML;
  });

  // Update total price display
  cartTotalPrice.textContent = `₹${total.toLocaleString("en-IN")}`;
}

// =========================================================
// 9. Checkout Button Demo Action
// =========================================================
checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty! Add some products first.");
  } else {
    alert(`Thank you for shopping with ShopZone! Total to pay: ${cartTotalPrice.textContent}`);
    cart = [];
    updateCartUI();
    closeCart();
  }
});

// Run once on page load to render products
renderProducts();

