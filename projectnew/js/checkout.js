/* ============================================
   StyleHub - checkout.js
   Checkout page - form, summary, place order
   ============================================ */


/* ============================================
   RENDER CHECKOUT ORDER SUMMARY
   ============================================ */
function renderCheckoutSummary() {
    var cart = getCart();
    var subtotal = getCartTotal();
    var discount = Math.round(subtotal * 0.05);
    var shipping = subtotal >= 999 ? 0 : 99;
    var total = subtotal - discount + shipping;

    /* item list */
    var itemsEl = document.getElementById("checkout-items-list");
    if (itemsEl) {
        if (cart.length === 0) {
            itemsEl.innerHTML = '<p style="color:#8c8680; font-size:13px;">No items in cart.</p>';
        } else {
            var html = "";
            for (var i = 0; i < cart.length; i++) {
                var item = cart[i];
                html += ''
                    + '<div class="checkout-item">'
                    + '<div class="checkout-item-img">'
                    + '<img src="' + item.img + '" alt="' + item.name + '">'
                    + '</div>'
                    + '<div class="checkout-item-info">'
                    + '<div class="checkout-item-name">' + item.name + '</div>'
                    + '<div class="checkout-item-meta">Size: ' + item.size + ' × ' + item.qty + '</div>'
                    + '</div>'
                    + '<div class="checkout-item-price">₹' + (item.price * item.qty).toLocaleString() + '</div>'
                    + '</div>';
            }
            itemsEl.innerHTML = html;
        }
    }

    /* totals */
    var subtotalEl = document.getElementById("co-subtotal");
    if (subtotalEl) subtotalEl.textContent = "₹" + subtotal.toLocaleString();

    var discountEl = document.getElementById("co-discount");
    if (discountEl) discountEl.textContent = "- ₹" + discount.toLocaleString();

    var shippingEl = document.getElementById("co-shipping");
    if (shippingEl) {
        shippingEl.innerHTML = shipping === 0 ? '<span style="color:#2e7d32;">FREE</span>' : "₹" + shipping;
    }

    var totalEl = document.getElementById("co-total");
    if (totalEl) totalEl.textContent = "₹" + total.toLocaleString();

    /* store total for order success */
    window._checkoutTotal = total;
}


/* ============================================
   PAYMENT METHOD SELECTION
   ============================================ */
function selectPaymentMethod(el, method) {
    /* remove selected from all options */
    var allOptions = document.querySelectorAll(".payment-option");
    for (var i = 0; i < allOptions.length; i++) {
        allOptions[i].classList.remove("selected");
    }

    /* select clicked option */
    el.classList.add("selected");
    el.querySelector("input[type='radio']").checked = true;

    /* show/hide card fields */
    var cardFields = document.getElementById("card-fields");
    if (cardFields) {
        cardFields.style.display = method === "card" ? "block" : "none";
    }
}


/* ============================================
   FORMAT CARD NUMBER INPUT
   ============================================ */
function formatCardNumber(input) {
    var value = input.value.replace(/\D/g, "").substring(0, 16);
    var formatted = value.replace(/(.{4})/g, "$1 ").trim();
    input.value = formatted;
}


/* ============================================
   VALIDATE SHIPPING FORM
   ============================================ */
function validateShippingForm() {
    var fields = [
        { id: "co-fname", label: "First name" },
        { id: "co-lname", label: "Last name" },
        { id: "co-email", label: "Email address" },
        { id: "co-phone", label: "Phone number" },
        { id: "co-address", label: "Street address" },
        { id: "co-city", label: "City" },
        { id: "co-pin", label: "PIN code" },
        { id: "co-state", label: "State" }
    ];

    for (var i = 0; i < fields.length; i++) {
        var el = document.getElementById(fields[i].id);
        if (el && !el.value.trim()) {
            showToast("Please fill in: " + fields[i].label);
            el.focus();
            el.style.borderColor = "#d32f2f";
            return false;
        }
        if (el) el.style.borderColor = "";
    }

    /* basic email check */
    var emailEl = document.getElementById("co-email");
    if (emailEl && emailEl.value.indexOf("@") === -1) {
        showToast("Please enter a valid email address.");
        emailEl.focus();
        return false;
    }

    /* basic phone check */
    var phoneEl = document.getElementById("co-phone");
    if (phoneEl && phoneEl.value.trim().length < 10) {
        showToast("Please enter a valid phone number.");
        phoneEl.focus();
        return false;
    }

    return true;
}


/* ============================================
   PLACE ORDER
   ============================================ */
function placeOrder() {
    if (!validateShippingForm()) return;

    var cart = getCart();
    if (cart.length === 0) {
        showToast("Your cart is empty.");
        return;
    }

    /* generate order id */
    var orderId = "SH" + Date.now().toString().slice(-6);

    /* save order info for success page */
    var orderData = {
        orderId: orderId,
        total: window._checkoutTotal || getCartTotal(),
        itemCount: cart.length,
        placedOn: new Date().toLocaleDateString("en-IN")
    };
    localStorage.setItem("sh_last_order", JSON.stringify(orderData));

    /* clear cart */
    saveCart([]);

    /* redirect to success */
    window.location.href = "order-success.html";
}
