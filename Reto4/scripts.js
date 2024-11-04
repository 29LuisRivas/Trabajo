// Modo Oscuro
const btnModoOscuro = document.getElementById('modo-oscuro');
btnModoOscuro.addEventListener('click', () => {
    document.body.classList.toggle('oscuro');
});

// Carrito de Compras
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartCount = document.querySelector('.cart-count');
let count = 0;

addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        count++;
        cartCount.textContent = count;
        alert('Producto agregado al carrito');
    });
});

// Configuración inicial del carrito
let cart = [
    { id: 1, name: "Producto 1", price: 200.00, quantity: 1 }
];

// Actualiza el contador del carrito
function updateCartCount() {
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelector(".cart-count").innerText = cartCount;
}

// Renderiza los productos en el carrito
function renderCart() {
    const cartSection = document.querySelector(".cart-section");
    const cartTotalElement = document.querySelector(".cart-total h3");
    const cartItemsContainer = cartSection.querySelector(".cart-item");
    cartItemsContainer.innerHTML = '';

    let total = 0;
    cart.forEach((item) => {
        const itemElement = document.createElement("div");
        itemElement.classList.add("cart-item");
        itemElement.innerHTML = `
            <img src="/img/producto1.avif" alt="${item.name}">
            <div class="item-info">
                <h3>${item.name}</h3>
                <p>$${item.price.toFixed(2)}</p>
                <label>Cantidad:
                    <input type="number" min="1" value="${item.quantity}" data-id="${item.id}" class="quantity-input">
                </label>
            </div>
            <button class="remove-item" data-id="${item.id}">Eliminar</button>
        `;
        cartItemsContainer.appendChild(itemElement);
        total += item.price * item.quantity;
    });

    cartTotalElement.innerText = `Total: $${total.toFixed(2)}`;
    addEventListenersToButtons();
}

// Agrega eventos a los botones de eliminar y finalizar compra
function addEventListenersToButtons() {
    document.querySelectorAll(".remove-item").forEach(button => {
        button.addEventListener("click", (event) => {
            const itemId = parseInt(event.target.dataset.id);
            removeFromCart(itemId);
        });
    });

    document.querySelector(".checkout").addEventListener("click", () => {
        if (cart.length > 0) {
            alert("¡Compra realizada con éxito!");
            cart = [];
            renderCart();
            updateCartCount();
        } else {
            alert("El carrito está vacío.");
        }
    });

    document.querySelectorAll(".quantity-input").forEach(input => {
        input.addEventListener("change", (event) => {
            const itemId = parseInt(event.target.dataset.id);
            const newQuantity = parseInt(event.target.value);
            updateQuantity(itemId, newQuantity);
        });
    });
}

// Elimina un producto del carrito
function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    renderCart();
    updateCartCount();
}

// Actualiza la cantidad de un producto en el carrito
function updateQuantity(itemId, newQuantity) {
    const item = cart.find(item => item.id === itemId);
    if (item) {
        item.quantity = newQuantity > 0 ? newQuantity : 1;
        renderCart();
        updateCartCount();
    }
}

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
    renderCart();
    updateCartCount();
});
