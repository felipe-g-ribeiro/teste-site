// Gerenciamento do Checkout
let checkoutCart = [];
let shippingCost = 12.50;

document.addEventListener('DOMContentLoaded', function () {
    loadCheckoutCart();
    updateOrderSummary();
    setupPaymentToggle();
    setupShippingChange();
});

// Carregar carrinho na página de checkout
function loadCheckoutCart() {
    const savedCart = sessionStorage.getItem('checkoutCart');
    if (savedCart) {
        checkoutCart = JSON.parse(savedCart);
    }

    if (checkoutCart.length === 0) {
        window.location.href = '../index.html';
    }
}

// Atualizar resumo do pedido
function updateOrderSummary() {
    const summaryDiv = document.getElementById('order-summary');
    const summarySubtotal = document.getElementById('summary-subtotal');
    const summaryShipping = document.getElementById('summary-shipping');
    const summaryDiscount = document.getElementById('summary-discount');
    const summaryTotal = document.getElementById('summary-total');

    let itemsHTML = '';
    let subtotal = 0;
    let totalDiscount = 0;

    checkoutCart.forEach(item => {
        const priceWithDiscount = item.price * (1 - item.discount / 100);
        const itemDiscount = (item.price - priceWithDiscount) * item.quantity;
        const itemTotal = priceWithDiscount * item.quantity;

        subtotal += item.price * item.quantity;
        totalDiscount += itemDiscount;

        itemsHTML += `
            <div class="d-flex justify-content-between align-items-center mb-2 pb-2 border-bottom">
                <div>
                    <span style="font-size: 1.5rem;">${item.icon}</span>
                    <div>
                        <strong>${item.name}</strong>
                        <br>
                        <small class="text-muted">Qtd: ${item.quantity}</small>
                    </div>
                </div>
                <div class="text-end">
                    <div>R$ ${itemTotal.toFixed(2)}</div>
                    ${item.discount > 0 ? `<small class="text-success">-${item.discount}%</small>` : ''}
                </div>
            </div>
        `;
    });

    summaryDiv.innerHTML = itemsHTML;
    summarySubtotal.textContent = `R$ ${subtotal.toFixed(2)}`;
    summaryShipping.textContent = shippingCost === 0 ? 'Grátis' : `R$ ${shippingCost.toFixed(2)}`;
    summaryDiscount.textContent = totalDiscount > 0 ? `-R$ ${totalDiscount.toFixed(2)}` : '-R$ 0,00';

    const total = subtotal - totalDiscount + shippingCost;
    summaryTotal.textContent = `R$ ${total.toFixed(2)}`;
}

// Alternar entre métodos de pagamento
function setupPaymentToggle() {
    const creditCardForm = document.getElementById('creditCardForm');
    const paymentOptions = document.querySelectorAll('input[name="payment"]');

    paymentOptions.forEach(option => {
        option.addEventListener('change', function () {
            if (this.value === 'credit') {
                creditCardForm.style.display = 'block';
            } else {
                creditCardForm.style.display = 'none';
            }
        });
    });
}

// Mudar custo de frete
function setupShippingChange() {
    const shippingOptions = document.querySelectorAll('input[name="shipping"]');

    shippingOptions.forEach(option => {
        option.addEventListener('change', function () {
            if (this.value === 'standard') {
                shippingCost = 12.50;
            } else if (this.value === 'express') {
                shippingCost = 29.90;
            } else if (this.value === 'next-day') {
                shippingCost = 49.90;
            }
            updateOrderSummary();
        });
    });
}

// Validar dados do pedido
function validateCheckout() {
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const cpf = document.getElementById('cpf').value.trim();
    const street = document.getElementById('street').value.trim();
    const number = document.getElementById('number').value.trim();
    const neighborhood = document.getElementById('neighborhood').value.trim();
    const city = document.getElementById('city').value.trim();
    const state = document.getElementById('state').value;
    const terms = document.getElementById('terms').checked;

    if (!fullName || !email || !phone || !cpf || !street || !number || !neighborhood || !city || !state) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return false;
    }

    if (!isValidEmail(email)) {
        alert('Email inválido.');
        return false;
    }

    if (!terms) {
        alert('Você precisa aceitar os termos e condições.');
        return false;
    }

    // Validar dados de pagamento se cartão for selecionado
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    if (paymentMethod === 'credit') {
        const cardNumber = document.getElementById('cardNumber').value.trim();
        const cardExpiry = document.getElementById('cardExpiry').value.trim();
        const cardCVV = document.getElementById('cardCVV').value.trim();
        const cardName = document.getElementById('cardName').value.trim();

        if (!cardNumber || !cardExpiry || !cardCVV || !cardName) {
            alert('Por favor, preencha todos os dados do cartão.');
            return false;
        }

        if (!/^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/.test(cardNumber.replace(/\s/g, ''))) {
            alert('Número de cartão inválido.');
            return false;
        }

        if (!/^\d{2}\/\d{2}$/.test(cardExpiry)) {
            alert('Data de validade inválida (use MM/AA).');
            return false;
        }

        if (!/^\d{3}$/.test(cardCVV)) {
            alert('CVV inválido.');
            return false;
        }
    }

    return true;
}

// Validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Finalizar compra
function finishPurchase() {
    if (!validateCheckout()) {
        return;
    }

    const checkoutBtn = document.getElementById('checkout-btn');
    checkoutBtn.disabled = true;
    checkoutBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Processando...';

    // Simular processamento de pagamento
    setTimeout(() => {
        // Limpar dados da compra
        sessionStorage.removeItem('checkoutCart');
        localStorage.removeItem('cart');

        // Mostrar mensagem de sucesso
        Swal = Swal || { fire: alert };
        if (window.Swal) {
            Swal.fire({
                icon: 'success',
                title: 'Compra Realizada!',
                text: 'Seu pedido foi processado com sucesso. Você receberá um email de confirmação em breve.',
                confirmButtonText: 'Voltar ao Início'
            }).then(() => {
                window.location.href = '../index.html';
            });
        } else {
            alert('Compra realizada com sucesso! Você receberá um email de confirmação em breve.');
            window.location.href = '../index.html';
        }
    }, 2000);
}

// Máscara para cartão de crédito
document.addEventListener('DOMContentLoaded', function () {
    const cardNumberInput = document.getElementById('cardNumber');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function (e) {
            let value = e.target.value.replace(/\s/g, '').slice(0, 16);
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            e.target.value = formattedValue;
        });
    }

    const cardExpiryInput = document.getElementById('cardExpiry');
    if (cardExpiryInput) {
        cardExpiryInput.addEventListener('input', function (e) {
            let value = e.target.value.replace(/\D/g, '').slice(0, 4);
            if (value.length >= 2) {
                value = value.slice(0, 2) + '/' + value.slice(2);
            }
            e.target.value = value;
        });
    }

    const cardCVVInput = document.getElementById('cardCVV');
    if (cardCVVInput) {
        cardCVVInput.addEventListener('input', function (e) {
            e.target.value = e.target.value.replace(/\D/g, '').slice(0, 3);
        });
    }

    const cpfInput = document.getElementById('cpf');
    if (cpfInput) {
        cpfInput.addEventListener('input', function (e) {
            let value = e.target.value.replace(/\D/g, '').slice(0, 11);
            if (value.length > 6) {
                value = value.slice(0, 3) + '.' + value.slice(3, 6) + '.' + value.slice(6, 9) + '-' + value.slice(9);
            } else if (value.length > 3) {
                value = value.slice(0, 3) + '.' + value.slice(3);
            }
            e.target.value = value;
        });
    }

    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function (e) {
            let value = e.target.value.replace(/\D/g, '').slice(0, 11);
            if (value.length > 6) {
                value = '(' + value.slice(0, 2) + ') ' + value.slice(2, 7) + '-' + value.slice(7);
            } else if (value.length > 2) {
                value = '(' + value.slice(0, 2) + ') ' + value.slice(2);
            }
            e.target.value = value;
        });
    }
});
