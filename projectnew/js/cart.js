/* ============================================================
   StyleHub — cart.js
   Cart sidebar + cart page rendering
   ============================================================ */

/* ── CART SIDEBAR ── */
function buildCartSidebar() {
  return `
  <div class="overlay" id="cart-overlay" onclick="closeCartSidebar()"></div>
  <div class="side-panel" id="cart-sidebar">
    <div class="panel-header">
      <span class="panel-title">Your Cart <span id="cart-sb-count" style="font-family:'DM Sans';font-size:14px;color:#8c8680;"></span></span>
      <button class="panel-close" onclick="closeCartSidebar()">✕</button>
    </div>
    <div class="panel-body" id="cart-sb-items"></div>
    <div class="panel-footer" id="cart-sb-footer" style="display:none;">
      <div class="order-row" style="margin-bottom:10px;">
        <span>Subtotal</span>
        <span id="cart-sb-total" style="font-weight:700;font-size:18px;font-family:'Playfair Display',serif;"></span>
      </div>
      <div style="font-size:12px;color:#8c8680;margin-bottom:14px;">🎉 Free shipping on this order</div>
      <a href="cart.html" class="btn btn-primary btn-full">View Cart & Checkout →</a>
      <button class="btn btn-ghost btn-full" style="margin-top:10px;" onclick="closeCartSidebar()">Continue Shopping</button>
    </div>
  </div>`;
}

function openCartSidebar() {
  renderCartSidebar();
  document.getElementById('cart-overlay').classList.add('open');
  document.getElementById('cart-sidebar').classList.add('open');
}
function closeCartSidebar() {
  document.getElementById('cart-overlay').classList.remove('open');
  document.getElementById('cart-sidebar').classList.remove('open');
}

function renderCartSidebar() {
  const cart = getCart();
  const wrap = document.getElementById('cart-sb-items');
  const footer = document.getElementById('cart-sb-footer');
  const count = document.getElementById('cart-sb-count');
  const total = document.getElementById('cart-sb-total');

  const totalQty = cart.reduce((s, x) => s + x.qty, 0);
  count.textContent = totalQty ? `(${totalQty} items)` : '';

  if (!cart.length) {
    wrap.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🛒</div>
        <h3>Cart is empty</h3>
        <p>Add some items to get started!</p>
        <a href="products.html" class="btn btn-primary">Shop Now</a>
      </div>`;
    footer.style.display = 'none';
    return;
  }
  footer.style.display = 'block';
  total.textContent = `₹${getCartTotal().toLocaleString()}`;
  wrap.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-img">
        <img src="${item.img}" alt="${item.name}"
          onerror="this.parentNode.style.background='#ede9e0';this.remove()">
      </div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-meta">Size: ${item.size}</div>
        <div class="cart-item-row">
          <div class="qty-wrap" style="transform:scale(0.9);transform-origin:left;">
            <button class="qty-btn" onclick="sbQty('${item.key}',-1)">−</button>
            <input class="qty-input" value="${item.qty}" readonly style="width:36px;">
            <button class="qty-btn" onclick="sbQty('${item.key}',1)">+</button>
          </div>
          <span class="cart-item-price">₹${(item.price * item.qty).toLocaleString()}</span>
          <button class="cart-item-remove" onclick="sbRemove('${item.key}')">✕</button>
        </div>
      </div>
    </div>`).join('');
}

function sbQty(key, delta) {
  const cart = getCart();
  const item = cart.find(x => x.key === key);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(key);
  else saveCart(cart);
  renderCartSidebar();
}
function sbRemove(key) {
  removeFromCart(key);
  renderCartSidebar();
}

/* ── FULL CART PAGE RENDER ── */
function renderCartPage() {
  const container = document.getElementById('cart-page-content');
  if (!container) return;
  const cart = getCart();

  if (!cart.length) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🛒</div>
        <h3>Your cart is empty</h3>
        <p>Looks like you haven't added anything yet.</p>
        <a href="products.html" class="btn btn-primary btn-lg">Start Shopping</a>
      </div>`;
    return;
  }

  const subtotal = getCartTotal();
  const shipping = subtotal >= 999 ? 0 : 99;
  const discount = Math.round(subtotal * 0.05);
  const total = subtotal - discount + shipping;

  container.innerHTML = `
    <div style="display:grid;grid-template-columns:1fr 380px;gap:28px;align-items:start;">
      <div>
        <div style="background:#fff;border-radius:14px;border:1.5px solid #e5e0d8;overflow:hidden;">
          <div style="padding:20px 24px;border-bottom:1px solid #e5e0d8;display:flex;justify-content:space-between;align-items:center;">
            <h2 style="font-family:'Playfair Display',serif;font-size:20px;">Cart Items (${cart.reduce((s, x) => s + x.qty, 0)})</h2>
            <button onclick="clearAllCart()" style="font-size:13px;color:#c9622f;background:none;border:none;cursor:pointer;font-weight:500;">Clear All</button>
          </div>
          <div style="padding:0 24px;" id="cart-items-list">
            ${cart.map(item => `
            <div class="cart-item" id="ci-${item.key}">
              <div class="cart-item-img">
                <img src="${item.img}" alt="${item.name}" onerror="this.parentNode.style.background='#ede9e0';this.remove()">
              </div>
              <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-meta">Size: ${item.size} &nbsp;|&nbsp; Unit Price: ₹${item.price.toLocaleString()}</div>
                <div class="cart-item-row">
                  <div class="qty-wrap">
                    <button class="qty-btn" onclick="cartPageQty('${item.key}',-1)">−</button>
                    <input class="qty-input" value="${item.qty}" id="qty-${item.key}" readonly>
                    <button class="qty-btn" onclick="cartPageQty('${item.key}',1)">+</button>
                  </div>
                  <span class="cart-item-price">₹${(item.price * item.qty).toLocaleString()}</span>
                  <button class="cart-item-remove" onclick="cartPageRemove('${item.key}')">✕ Remove</button>
                </div>
              </div>
            </div>`).join('')}
          </div>
        </div>

        <div style="margin-top:18px;background:#fff;border-radius:14px;border:1.5px solid #e5e0d8;padding:20px 24px;">
          <h3 style="font-size:14px;font-weight:600;margin-bottom:12px;">Have a coupon?</h3>
          <div style="display:flex;gap:10px;">
            <input class="form-input" id="coupon-input" placeholder="Enter coupon code" style="flex:1;">
            <button class="btn btn-outline" onclick="applyCoupon()">Apply</button>
          </div>
        </div>
      </div>

      <div class="order-summary" style="position:sticky;top:80px;">
        <div class="order-summary-title">Order Summary</div>
        <div class="order-row"><span>Subtotal</span><span>₹${subtotal.toLocaleString()}</span></div>
        <div class="order-row"><span>Discount (5%)</span><span style="color:#2e7d32;">- ₹${discount.toLocaleString()}</span></div>
        <div class="order-row"><span>Shipping</span><span>${shipping === 0 ? '<span style="color:#2e7d32;">FREE</span>' : '₹' + shipping}</span></div>
        <div class="order-row total"><span>Total</span><span>₹${total.toLocaleString()}</span></div>
        <a href="checkout.html" class="btn btn-secondary btn-full btn-lg" style="margin-top:18px;">Proceed to Checkout →</a>
        <a href="products.html" class="btn btn-ghost btn-full" style="margin-top:10px;">Continue Shopping</a>
        <div style="margin-top:16px;padding-top:16px;border-top:1px solid #e5e0d8;">
          <div style="font-size:12px;color:#8c8680;text-align:center;">🔒 Secure Checkout &nbsp;|&nbsp; 100% Safe Payments</div>
          <div style="display:flex;gap:6px;justify-content:center;margin-top:10px;">
            <span class="footer-pay">VISA</span><span class="footer-pay">MC</span>
            <span class="footer-pay">UPI</span><span class="footer-pay">Paytm</span>
          </div>
        </div>
      </div>
    </div>`;
}

function cartPageQty(key, delta) {
  const cart = getCart();
  const item = cart.find(x => x.key === key);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  saveCart(cart);
  renderCartPage();
}
function cartPageRemove(key) {
  removeFromCart(key);
  renderCartPage();
}
function clearAllCart() {
  if (confirm('Remove all items from cart?')) { saveCart([]); renderCartPage(); }
}
function applyCoupon() {
  const code = document.getElementById('coupon-input').value.trim().toUpperCase();
  if (code === 'STYLE20') showToast('🎉 Coupon applied! 20% extra off.', 'success');
  else showToast('Invalid coupon code.', 'error');
}
