/* ============================================
   StyleHub - wishlist.js
   Wishlist page rendering and actions
   ============================================ */


/* ============================================
   RENDER WISHLIST PAGE
   ============================================ */
function renderWishlistPage() {
    var container = document.getElementById("wishlist-content");
    if (!container) return;

    var wishIds = getWishlist();
    var products = [];

    for (var i = 0; i < wishIds.length; i++) {
        var p = getProductById(wishIds[i]);
        if (p) products.push(p);
    }

    if (products.length === 0) {
        container.innerHTML = ''
            + '<div class="empty-state">'
            + '<div class="empty-state-icon">♡</div>'
            + '<h3>Your wishlist is empty</h3>'
            + '<p>Save items you love and come back to them anytime.</p>'
            + '<a href="products.html" class="btn btn-primary btn-lg">Start Browsing</a>'
            + '</div>';
        return;
    }

    var countText = products.length + " saved item" + (products.length !== 1 ? "s" : "");

    var cardsHtml = "";
    for (var j = 0; j < products.length; j++) {
        cardsHtml += buildProductCard(products[j]);
    }

    container.innerText
     = ''
        + '<div class="wishlist-top-bar">'
        + '<p class="wishlist-count">' + countText + '</p>'
        + '<button class="btn btn-ghost btn-sm" onclick="clearWishlist()">Clear All</button>'
        + '</div>'
        + '<div class="products-grid">' + cardsHtml + '</div>';
}


/* ============================================
   CLEAR ALL WISHLIST ITEMS
   ============================================ */
function clearWishlist() {
    if (confirm("Remove all items from your wishlist?")) {
        localStorage.removeItem("sh_wish");
        updateWishBadge();
        renderWishlistPage();
    }
}
