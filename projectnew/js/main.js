/* ============================================================
   StyleHub — main.js
   Shared utilities: product data, toast, navbar, marquee, footer
   ============================================================ */

/* ── PRODUCT DATA ── */
const PRODUCTS = [
  // WOMEN
  { id:1,  name:'Floral Wrap Dress',       cat:'women', sub:'Dresses',    price:1499, old:2499, badge:'new',   stars:5, reviews:342, sizes:['XS','S','M','L','XL'],     color:'#c0392b', img:'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&q=75' },
  { id:2,  name:'Classic White Kurti',     cat:'women', sub:'Ethnic Tops',price:899,  old:1299, badge:'',      stars:4, reviews:218, sizes:['S','M','L','XL','XXL'],    color:'#f5f5f5', img:'https://wforwoman.com/cdn/shop/files/20FEW13783-211283_2_cc07b2f9-7b0a-4302-ae90-cd214ac80182.jpg?v=1725022804' },
  { id:3,  name:'High-Waist Jeans',        cat:'women', sub:'Bottoms',    price:1299, old:1999, badge:'hot',   stars:5, reviews:567, sizes:['26','28','30','32','34'],   color:'#37474f', img:'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&q=75' },
  { id:4,  name:'Silk Blend Saree',        cat:'women', sub:'Sarees',     price:3499, old:5499, badge:'trend', stars:5, reviews:189, sizes:['Free Size'],               color:'#8e24aa', img:'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&q=75' },
  { id:5,  name:'Printed Crop Top',        cat:'women', sub:'Tops',       price:599,  old:999,  badge:'sale',  stars:4, reviews:421, sizes:['XS','S','M','L'],          color:'#e91e63', img:'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=400&q=75' },
  { id:6,  name:'A-Line Midi Skirt',       cat:'women', sub:'Skirts',     price:1099, old:1699, badge:'',      stars:4, reviews:156, sizes:['XS','S','M','L','XL'],     color:'#795548', img:'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&q=75' },
  // MEN
  { id:7,  name:'Oxford Formal Shirt',     cat:'men',   sub:'Shirts',     price:1199, old:1799, badge:'new',   stars:5, reviews:298, sizes:['S','M','L','XL','XXL'],    color:'#2980b9', img:'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=400&q=75' },
  { id:8,  name:'Slim Fit Chinos',         cat:'men',   sub:'Trousers',   price:1499, old:2299, badge:'',      stars:4, reviews:334, sizes:['28','30','32','34','36'],   color:'#795548', img:'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&q=75' },
  { id:9,  name:'Linen Kurta Set',         cat:'men',   sub:'Ethnic',     price:1999, old:2999, badge:'hot',   stars:5, reviews:445, sizes:['S','M','L','XL','XXL'],    color:'#f5e6d0', img:'https://img.faballey.com/images/Product/XMS06200A/d4.jpg' },
  { id:10, name:'Graphic Streetwear Tee',  cat:'men',   sub:'T-Shirts',   price:699,  old:1099, badge:'trend', stars:4, reviews:789, sizes:['S','M','L','XL','XXL'],    color:'#333',    img:'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400&q=75' },
  { id:11, name:'Denim Jacket',            cat:'men',   sub:'Jackets',    price:2499, old:3999, badge:'sale',  stars:5, reviews:231, sizes:['S','M','L','XL'],          color:'#5c6bc0', img:'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=75' },
  { id:12, name:'Classic Polo Shirt',      cat:'men',   sub:'Polo',       price:899,  old:1299, badge:'',      stars:4, reviews:512, sizes:['S','M','L','XL','XXL'],    color:'#1565c0', img:'https://nobero.com/cdn/shop/files/navy_1.jpg?v=1737959021' },
  // KIDS
  { id:13, name:'Bunny Print Onesie',      cat:'kids',  sub:'Baby (0-2y)',price:599,  old:899,  badge:'new',   stars:5, reviews:167, sizes:['0-6m','6-12m','1y','2y'],  color:'#f8bbd0', img:'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=400&q=75' },
  { id:14, name:'Denim Dungaree Set',      cat:'kids',  sub:'Toddler',    price:899,  old:1299, badge:'hot',   stars:5, reviews:223, sizes:['2y','3y','4y','5y'],       color:'#5c6bc0', img:'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=400&q=75' },
  { id:15, name:'School Uniform Pack',     cat:'kids',  sub:'School',     price:1299, old:1799, badge:'',      stars:4, reviews:389, sizes:['S','M','L','XL'],          color:'#1565c0', img:'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=400&q=75' },
  { id:16, name:'Festive Ethnic Set',      cat:'kids',  sub:'Festive',    price:1799, old:2799, badge:'trend', stars:5, reviews:134, sizes:['4y','6y','8y','10y'],      color:'#d81b60', img:'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=400&q=75' },
  // ETHNIC
  { id:17, name:'Banarasi Silk Saree',     cat:'ethnic',sub:'Sarees',     price:4999, old:7999, badge:'hot',   stars:5, reviews:278, sizes:['Free Size'],               color:'#8e24aa', img:'https://tse1.mm.bing.net/th/id/OIP.R01y0S-BmrrOH9uJzjQrvQHaHa?pid=Api&P=0&h=180' },
  { id:18, name:'Designer Sherwani',       cat:'ethnic',sub:'Men Ethnic', price:7999, old:12999,badge:'new',   stars:5, reviews:143, sizes:['S','M','L','XL','XXL'],    color:'#1a237e', img:'https://www.charchaand.com/cdn/shop/files/D751544-Edit.jpg?v=1734681607&width=%7Bwidth%7D' },
  { id:19, name:'Embroidered Lehenga',     cat:'ethnic',sub:'Women Ethnic',price:5999,old:9999, badge:'trend', stars:5, reviews:189, sizes:['XS','S','M','L','XL'],     color:'#d81b60', img:'https://tse2.mm.bing.net/th/id/OIP.UuC7b8QF8LNu5rLk2HUK7wHaLH?pid=Api&P=0&w=300&h=300' },
  { id:20, name:'Anarkali Suit Set',       cat:'ethnic',sub:'Suits',      price:2999, old:4499, badge:'',      stars:4, reviews:312, sizes:['XS','S','M','L','XL'],     color:'#6a1b9a', img:'https://tse2.mm.bing.net/th/id/OIP.8cj-gCZipNRbvEy-G7BTKwHaJ4?pid=Api&P=0&w=300&h=300' },
  // SPORTS
  { id:21, name:'Performance Dry-Fit Tee', cat:'sports',sub:'Activewear', price:799,  old:1199, badge:'new',   stars:5, reviews:567, sizes:['S','M','L','XL','XXL'],    color:'#1565c0', img:'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=400&q=75' },
  { id:22, name:'Yoga Leggings',           cat:'sports',sub:'Yoga',       price:999,  old:1599, badge:'hot',   stars:5, reviews:689, sizes:['XS','S','M','L','XL'],     color:'#333',    img:'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400&q=75' },
  { id:23, name:'Sports Hoodie',           cat:'sports',sub:'Hoodies',    price:1799, old:2599, badge:'',      stars:4, reviews:234, sizes:['S','M','L','XL','XXL'],    color:'#424242', img:'https://tse4.mm.bing.net/th/id/OIP.62SOqqe_4vbl5b_L7A__IAHaJd?pid=Api&P=0&w=300&h=300' },
  { id:24, name:'Running Shorts',          cat:'sports',sub:'Shorts',     price:699,  old:999,  badge:'sale',  stars:4, reviews:198, sizes:['S','M','L','XL'],          color:'#0277bd', img:'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=75' },
];

/* ── CART STORAGE ── */
function getCart() {
  try { return JSON.parse(localStorage.getItem('sh_cart') || '[]'); } catch { return []; }
}
function saveCart(cart) {
  localStorage.setItem('sh_cart', JSON.stringify(cart));
  updateCartCount();
}
function addToCart(productId, size, qty = 1) {
  const cart = getCart();
  const key = `${productId}_${size}`;
  const existing = cart.find(x => x.key === key);
  if (existing) existing.qty += qty;
  else {
    const p = PRODUCTS.find(x => x.id === productId);
    if (p) cart.push({ key, id: productId, name: p.name, img: p.img, price: p.price, size, qty });
  }
  saveCart(cart);
  showToast(`🛍️ Added to cart!`);
}
function removeFromCart(key) {
  saveCart(getCart().filter(x => x.key !== key));
}
function updateCartQty(key, qty) {
  const cart = getCart();
  const item = cart.find(x => x.key === key);
  if (item) { item.qty = qty; if (item.qty <= 0) return removeFromCart(key); }
  saveCart(cart);
}
function getCartTotal() {
  return getCart().reduce((s, x) => s + x.price * x.qty, 0);
}
function getCartCount() {
  return getCart().reduce((s, x) => s + x.qty, 0);
}
function updateCartCount() {
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = getCartCount();
    el.style.display = getCartCount() > 0 ? 'flex' : 'none';
  });
}

/* ── WISHLIST STORAGE ── */
function getWishlist() {
  try { return JSON.parse(localStorage.getItem('sh_wish') || '[]'); } catch { return []; }
}
function toggleWishlist(id) {
  const wish = getWishlist();
  const idx = wish.indexOf(id);
  if (idx > -1) { wish.splice(idx, 1); showToast('Removed from wishlist'); }
  else { wish.push(id); showToast('❤️ Added to wishlist!'); }
  localStorage.setItem('sh_wish', JSON.stringify(wish));
  updateWishCount();
  return wish.includes(id);
}
function isWishlisted(id) { return getWishlist().includes(id); }
function updateWishCount() {
  const count = getWishlist().length;
  document.querySelectorAll('.wish-count').forEach(el => {
    el.textContent = count;
    el.style.display = count > 0 ? 'flex' : 'none';
  });
}

/* ── TOAST ── */
let toastTimer;
function showToast(msg, type = '') {
  let toast = document.getElementById('global-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'global-toast';
    toast.className = 'toast';
    toast.innerHTML = '<span class="toast-icon">✓</span><span id="toast-msg"></span>';
    document.body.appendChild(toast);
  }
  toast.className = 'toast' + (type ? ` toast-${type}` : '');
  document.getElementById('toast-msg').textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}

/* ── PRODUCT CARD HTML ── */
function productCardHTML(p) {
  const disc = Math.round((1 - p.price / p.old) * 100);
  const wished = isWishlisted(p.id);
  const badgeHTML = p.badge ? `<div class="product-badge badge-${p.badge}">${p.badge.toUpperCase()}</div>` : '';
  const stars = '★'.repeat(p.stars) + '☆'.repeat(5 - p.stars);
  const sizesHTML = p.sizes.slice(0, 3).map(s => `<span class="product-size-tag">${s}</span>`).join('');
  const more = p.sizes.length > 3 ? `<span class="product-size-tag">+${p.sizes.length - 3}</span>` : '';
  return `
  <div class="product-card" data-id="${p.id}">
    <div class="product-img-wrap">
      <img src="${p.img}" alt="${p.name}" loading="lazy"
           onerror="this.style.background='${p.color}';this.style.minHeight='200px';this.removeAttribute('src')">
      ${badgeHTML}
      <button class="product-wish${wished ? ' active' : ''}" onclick="handleWish(event,${p.id})" title="Wishlist">
        ${wished ? '♥' : '♡'}
      </button>
      <button class="product-quick-add" onclick="handleQuickAdd(event,${p.id})">Quick Add +</button>
    </div>
    <div class="product-info">
      <div class="product-category">${p.sub}</div>
      <a href="product-details.html?id=${p.id}">
        <div class="product-name">${p.name}</div>
      </a>
      <div class="product-stars">${stars} <span>(${p.reviews})</span></div>
      <div class="product-sizes">${sizesHTML}${more}</div>
      <div class="product-price-row">
        <div>
          <span class="product-price">₹${p.price.toLocaleString()}</span>
          <span class="product-old-price">₹${p.old.toLocaleString()}</span>
          <span class="product-discount">${disc}% off</span>
        </div>
        <button class="product-add-btn" onclick="handleQuickAdd(event,${p.id})" title="Add to cart">+</button>
      </div>
    </div>
  </div>`;
}

/* ── QUICK ADD (opens size picker) ── */
function handleQuickAdd(e, id) {
  e.stopPropagation();
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  openSizePicker(p);
}
function handleWish(e, id) {
  e.stopPropagation();
  const btn = e.currentTarget;
  const inWish = toggleWishlist(id);
  btn.textContent = inWish ? '♥' : '♡';
  btn.classList.toggle('active', inWish);
}

/* ── SIZE PICKER MODAL ── */
function openSizePicker(p) {
  let modal = document.getElementById('size-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'size-modal';
    modal.style.cssText = `position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:1000;display:flex;align-items:center;justify-content:center;`;
    document.body.appendChild(modal);
  }
  modal.innerHTML = `
    <div style="background:#fff;border-radius:14px;padding:32px;width:340px;position:relative;">
      <button onclick="document.getElementById('size-modal').remove()"
        style="position:absolute;top:14px;right:16px;font-size:20px;color:#888;background:none;border:none;cursor:pointer;">✕</button>
      <h3 style="font-family:'Playfair Display',serif;font-size:21px;margin-bottom:6px;">Choose Size</h3>
      <p style="font-size:13px;color:#8c8680;margin-bottom:16px;">${p.name}</p>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:22px;">
        ${p.sizes.map(s => `<button onclick="selectSize(this,'${s}')" style="border:1.5px solid #e5e0d8;border-radius:6px;padding:9px 14px;font-size:13px;font-weight:500;cursor:pointer;transition:all 0.2s;background:#fff;" onmouseover="this.style.background='#111';this.style.color='#fff'" onmouseout="if(!this.classList.contains('sel')){this.style.background='#fff';this.style.color='#111'}">${s}</button>`).join('')}
      </div>
      <button onclick="confirmSize(${p.id})"
        style="width:100%;background:#111;color:#fff;border:none;padding:13px;border-radius:6px;font-size:14px;font-weight:600;cursor:pointer;">Add to Cart</button>
    </div>`;
  modal._selectedSize = '';
}
function selectSize(btn, size) {
  const modal = document.getElementById('size-modal');
  modal.querySelectorAll('button').forEach(b => {
    if (b.style.border) { b.style.background = '#fff'; b.style.color = '#111'; b.classList.remove('sel'); }
  });
  btn.style.background = '#111'; btn.style.color = '#fff'; btn.classList.add('sel');
  modal._selectedSize = size;
}
function confirmSize(id) {
  const modal = document.getElementById('size-modal');
  if (!modal._selectedSize) { showToast('⚠️ Please select a size!'); return; }
  addToCart(id, modal._selectedSize);
  modal.remove();
}

/* ── NAVBAR BUILDER ── */
function buildNavbar(activePage = '') {
  const navLinks = [
    { href: 'index.html',      label: 'Home' },
    { href: 'products.html',   label: 'Shop' },
    { href: 'categories.html', label: 'Categories' },
    { href: 'offers.html',     label: 'Offers' },
    { href: 'about.html',      label: 'About' },
  ];
  const linksHTML = navLinks.map(l =>
    `<li><a href="${l.href}" class="${activePage === l.href ? 'active' : ''}">${l.label}</a></li>`
  ).join('');

  return `
  <div class="announce-bar">
    FREE SHIPPING above ₹999 &nbsp;|&nbsp; <b>Code: STYLE20</b> for 20% Off &nbsp;|&nbsp; Easy 30-Day Returns
  </div>
  <nav class="navbar">
    <div class="nav-inner">
      <a href="index.html" class="nav-logo">Style<span>Hub</span></a>
      <ul class="nav-links">${linksHTML}</ul>
      <div class="nav-actions">
        <div class="nav-search-wrap">
          <span class="nav-search-icon">🔍</span>
          <input class="nav-search" type="text" placeholder="Search..." id="nav-search-input"
            onkeydown="if(event.key==='Enter')window.location='products.html?q='+encodeURIComponent(this.value)">
        </div>
        <a href="wishlist.html" class="nav-btn" title="Wishlist">
          ♡<span class="nav-count wish-count" style="display:none;">0</span>
        </a>
        <a href="profile.html" class="nav-btn" title="Account">👤</a>
        <a href="cart.html" class="nav-btn" title="Cart">
          🛒<span class="nav-count cart-count" style="display:none;">0</span>
        </a>
      </div>
    </div>
  </nav>`;
}

/* ── FOOTER BUILDER ── */
function buildFooter() {
  return `
  <footer class="footer">
    <div class="footer-grid">
      <div>
        <a href="index.html" class="footer-logo">Style<span>Hub</span></a>
        <p class="footer-desc">Your ultimate fashion destination. Style for every age, occasion, and story.</p>
        <div class="footer-social">
          <button class="footer-soc-btn">FB</button>
          <button class="footer-soc-btn">IG</button>
          <button class="footer-soc-btn">TW</button>
          <button class="footer-soc-btn">YT</button>
        </div>
      </div>
      <div class="footer-col"><h4>Shop</h4><ul>
        <li><a href="products.html?cat=women">Women</a></li>
        <li><a href="products.html?cat=men">Men</a></li>
        <li><a href="products.html?cat=kids">Kids</a></li>
        <li><a href="products.html?cat=ethnic">Ethnic</a></li>
        <li><a href="offers.html">Sale</a></li>
      </ul></div>
      <div class="footer-col"><h4>Help</h4><ul>
        <li><a href="faq.html">FAQ</a></li>
        <li><a href="contact.html">Contact Us</a></li>
        <li><a href="faq.html#shipping">Shipping Info</a></li>
        <li><a href="faq.html#returns">Returns</a></li>
      </ul></div>
      <div class="footer-col"><h4>Account</h4><ul>
        <li><a href="profile.html">My Profile</a></li>
        <li><a href="wishlist.html">Wishlist</a></li>
        <li><a href="cart.html">Cart</a></li>
        <li><a href="login.html">Login</a></li>
      </ul></div>
      <div class="footer-col"><h4>Company</h4><ul>
        <li><a href="about.html">About Us</a></li>
        <li><a href="contact.html">Careers</a></li>
        <li><a href="about.html#press">Press</a></li>
        <li><a href="about.html#sustainability">Sustainability</a></li>
      </ul></div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 StyleHub. Made with ♥ in India.</span>
      <div class="footer-payments">
        <span class="footer-pay">VISA</span><span class="footer-pay">MC</span>
        <span class="footer-pay">UPI</span><span class="footer-pay">Paytm</span>
        <span class="footer-pay">COD</span>
      </div>
    </div>
  </footer>`;
}

/* ── MARQUEE BUILDER ── */
function buildMarquee() {
  const items = ['Free Shipping above ₹999','New Season Arrivals','Ethnic Wear — Up to 50% Off','Kids Collection Live','Express Delivery Available','COD Available','Easy 30-Day Returns'];
  const html = [...items, ...items].map(t => `<span class="marquee-item"><b>✦</b> ${t} &nbsp;</span>`).join('');
  return `<div class="marquee-bar"><div class="marquee-track">${html}</div></div>`;
}

/* ── INIT ON DOM READY ── */
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  updateWishCount();
});
