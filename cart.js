let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(product, price) {
    const item = cart.find(p => p.name === product);
    if (item) {
        item.quantity++;
    } else {
        cart.push({ name: product, price: price, quantity: 1 });
    }
    saveCart();
    updateCart();
    const cartEl = document.getElementById("cart");
    if (cartEl) cartEl.style.display = "block";
}

function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const cartTotalElement = document.getElementById("cart-total");
    const cartCountElement = document.getElementById("cart-count");

    if (!cartItems) return;

    cartItems.innerHTML = "";
    let total = 0;
    let count = 0;

    cart.forEach((item, index) => {
        const price = Number(item.price) || 0;
        const subtotal = price * item.quantity;
        total += subtotal;
        count += item.quantity;

        // Versión para el carrito flotante (catálogo)
        const li = document.createElement("li");
        li.className = "cart-item";
        li.style.flexDirection = "column";
        li.style.alignItems = "flex-start";

        li.innerHTML = `
            <div style="width: 100%; display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
                <span style="font-weight: bold;">${item.name}</span>
                <span style="font-size: 0.9em;">$${price.toLocaleString()}</span>
            </div>
            <div style="width: 100%; display: flex; justify-content: space-between; align-items: center;">
                 <div class="cart-controls">
                    <button onclick="changeQuantity(${index}, -1)">-</button>
                    <input type="number" min="1" value="${item.quantity}" 
                           onchange="setQuantity(${index}, this.value)"
                           style="width: 35px; padding: 2px; text-align: center; border: 1px solid #ccc; border-radius: 4px;">
                    <button onclick="changeQuantity(${index}, 1)">+</button>
                </div>
                <div style="font-weight: bold;">
                    $${subtotal.toLocaleString()}
                </div>
                <button class="remove" onclick="removeItem(${index})" style="margin-left: 5px; width: auto; padding: 2px 6px;">x</button>
            </div>
        `;
        cartItems.appendChild(li);
    });

    if (cartTotalElement) cartTotalElement.textContent = total.toLocaleString();
    if (cartCountElement) cartCountElement.textContent = count;

    const cartEl = document.getElementById("cart");
    if (cartEl) {
        cartEl.style.display = cart.length === 0 ? "none" : "block";
    }
}

function setQuantity(index, value) {
    const qty = parseInt(value);
    if (qty > 0) {
        cart[index].quantity = qty;
    } else {
        cart[index].quantity = 1;
    }
    saveCart();
    updateCart();
}

function changeQuantity(index, change) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) cart.splice(index, 1);
    saveCart();
    updateCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    updateCart();
}

function goToCart() {
    window.location.href = "carrito.html";
}

function checkout() {
    let message = "Hola, quiero comprar los siguientes perfumes:%0A";
    let total = 0;
    cart.forEach(item => {
        const subtotal = item.price * item.quantity;
        total += subtotal;
        message += `- ${item.name} (x${item.quantity}) - $${subtotal.toLocaleString()}%0A`;
    });
    message += `%0ATotal: $${total.toLocaleString()}`;
    window.open("https://wa.me/573106491997?text=" + message, "_blank");
}

// Inicializar al cargar
document.addEventListener("DOMContentLoaded", updateCart);
