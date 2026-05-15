/* ============================================
   StyleHub - profile.js
   Profile page - display, update, tabs
   ============================================ */


/* ============================================
   LOAD PROFILE DATA INTO PAGE
   ============================================ */
function loadProfile() {
    var user = getUser();

    /* if not logged in, redirect to login */
    if (!user) {
        window.location.href = "login.html";
        return;
    }

    /* fill avatar letter */
    var avatarEl = document.getElementById("profile-avatar-letter");
    if (avatarEl) avatarEl.textContent = user.name.charAt(0).toUpperCase();

    /* fill sidebar display info */
    var displayName = document.getElementById("profile-display-name");
    if (displayName) displayName.textContent = user.name;

    var displayEmail = document.getElementById("profile-display-email");
    if (displayEmail) displayEmail.textContent = user.email;

    var displayJoined = document.getElementById("profile-joined");
    if (displayJoined) displayJoined.textContent = "Member since " + (user.joined || "recently");

    /* fill form fields */
    var nameInput = document.getElementById("profile-name");
    if (nameInput) nameInput.value = user.name;

    var emailInput = document.getElementById("profile-email");
    if (emailInput) emailInput.value = user.email;

    var phoneInput = document.getElementById("profile-phone");
    if (phoneInput) phoneInput.value = user.phone || "";

    var addressInput = document.getElementById("profile-address");
    if (addressInput) addressInput.value = user.address || "";
}


/* ============================================
   UPDATE PROFILE
   ============================================ */
function handleProfileUpdate(event) {
    event.preventDefault();

    var user = getUser();
    if (!user) return;

    var nameInput = document.getElementById("profile-name");
    var phoneInput = document.getElementById("profile-phone");
    var addressInput = document.getElementById("profile-address");

    if (nameInput) user.name = nameInput.value.trim();
    if (phoneInput) user.phone = phoneInput.value.trim();
    if (addressInput) user.address = addressInput.value.trim();

    if (!user.name || user.name.length < 2) {
        showToast("Please enter a valid name.");
        return;
    }

    saveUser(user);
    showToast("Profile updated successfully!");
    loadProfile();
}


/* ============================================
   SWITCH PROFILE TABS
   ============================================ */
function switchProfileTab(linkEl, tabId) {
    /* hide all tab panels */
    var allPanels = document.querySelectorAll(".profile-tab-panel");
    for (var i = 0; i < allPanels.length; i++) {
        allPanels[i].style.display = "none";
    }

    /* deactivate all sidebar links */
    var allLinks = document.querySelectorAll(".profile-nav-link");
    for (var j = 0; j < allLinks.length; j++) {
        allLinks[j].classList.remove("active");
    }

    /* show the chosen panel */
    var panel = document.getElementById("panel-" + tabId);
    if (panel) panel.style.display = "block";

    /* mark this link as active */
    if (linkEl) linkEl.classList.add("active");
}


/* ============================================
   RENDER DEMO ORDERS LIST
   ============================================ */
function renderOrdersList() {
    var container = document.getElementById("orders-list");
    if (!container) return;

    /* show last order if it exists */
    var lastOrder = null;
    try {
        lastOrder = JSON.parse(localStorage.getItem("sh_last_order") || "null");
    } catch (e) { }

    if (!lastOrder) {
        container.innerHTML = ''
            + '<div class="empty-state" style="padding:40px 0;">'
            + '<div class="empty-state-icon">📦</div>'
            + '<h3>No orders yet</h3>'
            + '<p>Your order history will appear here.</p>'
            + '<a href="products.html" class="btn btn-primary btn-sm">Shop Now</a>'
            + '</div>';
        return;
    }

    container.innerHTML = ''
        + '<div class="order-row-card">'
        + '<div class="order-row-top">'
        + '<div>'
        + '<div class="order-row-id">Order #' + lastOrder.orderId + '</div>'
        + '<div class="order-row-date">' + lastOrder.placedOn + '</div>'
        + '</div>'
        + '<span class="order-status-badge delivered">Delivered</span>'
        + '</div>'
        + '<div class="order-row-bottom">'
        + '<span>' + lastOrder.itemCount + ' item(s)</span>'
        + '<span class="order-row-total">₹' + Number(lastOrder.total).toLocaleString() + '</span>'
        + '</div>'
        + '</div>';
}
