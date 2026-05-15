/* ============================================
   StyleHub - product.js
   Single product detail page logic
   ============================================ */

var currentProduct = null;
var selectedProductSize = "";
var productQty = 1;


/* ============================================
   LOAD AND RENDER PRODUCT DETAILS
   ============================================ */
function loadProductDetails() {
    var params  = new URLSearchParams(window.location.search);
    var id      = parseInt(params.get("id")) || 1;
    var product = getProductById(id);

    if (!product) {
        product = PRODUCTS[0];
    }

    currentProduct = product;
    document.title = product.name + " – StyleHub";

    renderProductMain(product);
    renderRelatedProducts(product);
}


/* ============================================
   RENDER MAIN PRODUCT SECTION
   ============================================ */
function renderProductMain(product) {
    var disc    = getDiscountPercent(product.price, product.oldPrice);
    var stars   = buildStars(product.stars);
    var wished  = isWishlisted(product.id);

    /* breadcrumb */
    var breadcrumbEl = document.getElementById("product-breadcrumb-name");
    if (breadcrumbEl) breadcrumbEl.textContent = product.name;

    /* gallery */
    var mainImg = document.getElementById("product-main-img");
    if (mainImg) mainImg.src = product.img;

    /* thumbnails - show same image 3 times as placeholders */
    var thumbsEl = document.getElementById("product-thumbs");
    if (thumbsEl) {
        var thumbHtml = "";
        for (var t = 0; t < 3; t++) {
            var activeClass = t === 0 ? " active" : "";
            thumbHtml += ''
                + '<div class="product-thumb' + activeClass + '" onclick="switchMainImage(this, \'' + product.img + '\')">'
                +   '<img src="' + product.img + '" alt="View ' + (t + 1) + '">'
                + '</div>';
        }
        thumbsEl.innerHTML = thumbHtml;
    }

    /* product info */
    var nameEl = document.getElementById("product-name");
    if (nameEl) nameEl.textContent = product.name;

    var starsEl = document.getElementById("product-stars-text");
    if (starsEl) starsEl.innerHTML = stars + ' <span class="product-review-count">(' + product.reviews + ' reviews)</span>';

    var priceEl = document.getElementById("product-price");
    if (priceEl) priceEl.textContent = "₹" + product.price.toLocaleString();

    var oldPriceEl = document.getElementById("product-old-price");
    if (oldPriceEl) oldPriceEl.textContent = "₹" + product.oldPrice.toLocaleString();

    var discEl = document.getElementById("product-discount-badge");
    if (discEl) discEl.textContent = disc + "% OFF";

    /* sizes */
    var sizesEl = document.getElementById("product-size-list");
    if (sizesEl) {
        var sizeHtml = "";
        for (var s = 0; s < product.sizes.length; s++) {
            sizeHtml += '<button class="size-option" data-size="' + product.sizes[s] + '" onclick="selectProductSize(this, \'' + product.sizes[s] + '\')">' + product.sizes[s] + '</button>';
        }
        sizesEl.innerHTML = sizeHtml;
    }

    /* wishlist button */
    var wishBtn = document.getElementById("product-wish-btn");
    if (wishBtn) {
        wishBtn.textContent = wished ? "♥ Wishlisted" : "♡ Wishlist";
        wishBtn.classList.toggle("wishlisted", wished);
    }
}


/* ============================================
   GALLERY - SWITCH MAIN IMAGE
   ============================================ */
function switchMainImage(thumbEl, src) {
    var mainImg = document.getElementById("product-main-img");
    if (mainImg) mainImg.src = src;

    var allThumbs = document.querySelectorAll(".product-thumb");
    for (var i = 0; i < allThumbs.length; i++) {
        allThumbs[i].classList.remove("active");
    }
    thumbEl.classList.add("active");
}


/* ============================================
   SIZE SELECTION
   ============================================ */
function selectProductSize(btn, size) {
    selectedProductSize = size;

    var allSizes = document.querySelectorAll(".size-option");
    for (var i = 0; i < allSizes.length; i++) {
        allSizes[i].classList.remove("selected");
    }
    btn.classList.add("selected");
}


/* ============================================
   QUANTITY CONTROLS
   ============================================ */
function changeProductQty(delta) {
    productQty = Math.max(1, productQty + delta);
    var qtyEl = document.getElementById("product-qty");
    if (qtyEl) qtyEl.textContent = productQty;
}


/* ============================================
   ADD TO CART FROM PRODUCT PAGE
   ============================================ */
function addProductToCart() {
    if (!selectedProductSize) {
        showToast("Please select a size first!");
        return;
    }
    addToCart(currentProduct.id, selectedProductSize, productQty);
}


/* ============================================
   WISHLIST TOGGLE FROM PRODUCT PAGE
   ============================================ */
function toggleProductWish() {
    if (!currentProduct) return;
    var inWish = toggleWishlist(currentProduct.id);
    var btn = document.getElementById("product-wish-btn");
    if (btn) {
        btn.textContent = inWish ? "♥ Wishlisted" : "♡ Wishlist";
        btn.classList.toggle("wishlisted", inWish);
    }
}


/* ============================================
   TABS (Description / Size Guide / Reviews)
   ============================================ */
function switchProductTab(btn, tabId) {
    /* hide all tab contents */
    var allContents = document.querySelectorAll(".product-tab-content");
    for (var i = 0; i < allContents.length; i++) {
        allContents[i].classList.remove("active");
    }

    /* deactivate all tab buttons */
    var allBtns = document.querySelectorAll(".product-tab-btn");
    for (var j = 0; j < allBtns.length; j++) {
        allBtns[j].classList.remove("active");
    }

    /* activate the chosen tab */
    btn.classList.add("active");
    var target = document.getElementById("tab-" + tabId);
    if (target) target.classList.add("active");
}


/* ============================================
   RENDER RELATED PRODUCTS
   ============================================ */
function renderRelatedProducts(product) {
    var grid = document.getElementById("related-products-grid");
    if (!grid) return;

    var related = PRODUCTS.filter(function(p) {
        return p.category === product.category && p.id !== product.id;
    }).slice(0, 4);

    if (related.length === 0) {
        grid.parentElement.style.display = "none";
        return;
    }

    var html = "";
    for (var i = 0; i < related.length; i++) {
        html += buildProductCard(related[i]);
    }
    grid.innerHTML = html;
}
