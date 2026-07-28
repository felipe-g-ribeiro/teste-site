// Gerenciamento do Carrinho
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Atualizar carrinho na localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Adicionar item ao carrinho
function addToCart(productId) {
    const product = getProductById(productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            discount: product.discount,
            quantity: 1,
            icon: product.icon
        });
    }

    saveCart();
    updateCart();
    showCartNotification(product.name);
}

// Remover item do carrinho
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCart();
}

// Atualizar quantidade
function updateQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = quantity;
            saveCart();
            updateCart();
        }
    }
}

// Limpar carrinho
function clearCart() {
    if (confirm('Tem certeza que deseja limpar o carrinho?')) {
        cart = [];
        saveCart();
        updateCart();
    }
}

// Atualizar interface do carrinho
function updateCart() {
    const cartItemsDiv = document.getElementById('cart-items');
    const cartCountBadge = document.getElementById('cart-count');
    const cartSubtotal = document.getElementById('cart-subtotal');
    const cartShipping = document.getElementById('cart-shipping');
    const cartTotal = document.getElementById('cart-total');

    // Atualizar contagem
    cartCountBadge.textContent = cart.length;

    // Se carrinho vazio
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p class="text-muted text-center">Carrinho vazio</p>';
        cartSubtotal.textContent = 'R$ 0,00';
        cartShipping.textContent = 'R$ 0,00';
        cartTotal.textContent = 'R$ 0,00';
        return;
    }

    // Renderizar itens
    let itemsHTML = '';
    let subtotal = 0;

    cart.forEach(item => {
        const priceWithDiscount = item.price * (1 - item.discount / 100);
        const itemTotal = priceWithDiscount * item.quantity;
        subtotal += itemTotal;

        itemsHTML += `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h6>${item.icon} ${item.name}</h6>
                    <small class="text-muted">R$ ${priceWithDiscount.toFixed(2)}</small>
                </div>
                <div class="cart-item-quantity">
                    <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
                <div class="text-end">
                    <div>R$ ${itemTotal.toFixed(2)}</div>
                    <button class="btn-remove-cart" onclick="removeFromCart(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    });

    cartItemsDiv.innerHTML = itemsHTML;

    // Calcular frete
    const shippingCost = subtotal > 100 ? 0 : 12.50;
    const total = subtotal + shippingCost;

    // Atualizar totais
    cartSubtotal.textContent = `R$ ${subtotal.toFixed(2)}`;
    cartShipping.textContent = shippingCost === 0 ? 'Grátis' : `R$ ${shippingCost.toFixed(2)}`;
    cartTotal.textContent = `R$ ${total.toFixed(2)}`;
}

// Notificação ao adicionar ao carrinho
function showCartNotification(productName) {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.className = 'alert alert-success alert-dismissible fade show position-fixed bottom-0 end-0 m-3';
    notification.style.zIndex = '9999';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i> <strong>${productName}</strong> foi adicionado ao carrinho!
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    document.body.appendChild(notification);

    // Remover notificação após 3 segundos
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Ir para checkout
function goToCheckout() {
    if (cart.length === 0) {
        alert('Adicione produtos ao carrinho antes de finalizar a compra!');
        return;
    }

    // Salvar carrinho na sessão
    sessionStorage.setItem('checkoutCart', JSON.stringify(cart));

    // Redirecionar para página de checkout
    window.location.href = 'pages/checkout.html';
}

// Inicializar carrinho ao carregar a página
document.addEventListener('DOMContentLoaded', function () {
    updateCart();
});
