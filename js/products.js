// Base de dados de produtos
const products = [
    {
        id: 1,
        name: "Laura Mercier Foundation",
        category: "maquiagem",
        price: 79.90,
        description: "Base com cobertura total e acabamento natural",
        icon: "💄",
        discount: 60
    },
    {
        id: 2,
        name: "Yves Saint Laurent Eyeshadow Palette",
        category: "maquiagem",
        price: 49.90,
        description: "12 cores com acabamento brilhante",
        icon: "✨",
        discount: 15
    },
    {
        id: 3,
        name: "Rímel Volumador",
        category: "maquiagem",
        price: 39.90,
        description: "Volumiza e alonga os cílios",
        icon: "🎀",
        discount: 0
    },
    {
        id: 4,
        name: "Batom Vermelho Intenso",
        category: "maquiagem",
        price: 34.90,
        description: "Cor vibrante e longa duração",
        icon: "💋",
        discount: 5
    },
    {
        id: 5,
        name: "Creme Facial Hidratante",
        category: "skincare",
        price: 99.90,
        description: "Hidratação profunda para o rosto",
        icon: "🧴",
        discount: 20
    },
    {
        id: 6,
        name: "Sérum Vitamina C",
        category: "skincare",
        price: 89.90,
        description: "Clareador natural e antioxidante",
        icon: "💧",
        discount: 0
    },
    {
        id: 7,
        name: "Máscara Facial Detox",
        category: "skincare",
        price: 54.90,
        description: "Limpeza profunda e renovação",
        icon: "🎭",
        discount: 10
    },
    {
        id: 8,
        name: "Protetor Solar SPF 50",
        category: "skincare",
        price: 69.90,
        description: "Proteção UV completa",
        icon: "☀️",
        discount: 0
    },
    {
        id: 9,
        name: "Shampoo Fortalecedor",
        category: "cabelos",
        price: 44.90,
        description: "Fortalece e hidrata os cabelos",
        icon: "🧴",
        discount: 12
    },
    {
        id: 10,
        name: "Condicionador Reconstrutor",
        category: "cabelos",
        price: 44.90,
        description: "Repara fios danificados",
        icon: "🧴",
        discount: 0
    },
    {
        id: 11,
        name: "Máscara Capilar Deep",
        category: "cabelos",
        price: 59.90,
        description: "Tratamento intensivo para cabelos",
        icon: "💆",
        discount: 15
    },
    {
        id: 12,
        name: "Spray Protetor Térmica",
        category: "cabelos",
        price: 49.90,
        description: "Protege contra calor e ressecamento",
        icon: "🌡️",
        discount: 8
    }
];

// Carregar produtos na página
let currentFilter = 'all';

function loadProducts(filter = 'all') {
    const productsGrid = document.getElementById('products-grid');
    productsGrid.innerHTML = '';

    let filteredProducts = products;
    if (filter !== 'all') {
        filteredProducts = products.filter(p => p.category === filter);
    }

    filteredProducts.forEach((product, index) => {
        const discountedPrice = product.discount > 0 ?
            (product.price * (1 - product.discount / 100)).toFixed(2) :
            product.price.toFixed(2);

        const productCard = document.createElement('div');
        productCard.className = 'col-md-6 col-lg-3 fade-in';
        productCard.style.animationDelay = `${index * 0.1}s`;

        productCard.innerHTML = `
            <div class="card product-card">
                ${product.discount > 0 ? `<span class="badge-discount">-${product.discount}%</span>` : ''}
                <div class="product-image">
                    ${product.image ? `<img src="${product.image}" alt="${product.name}" class="card-img-top">` : `<div class="product-icon">${product.icon}</div>`}
                </div>
                <div class="card-body product-body">
                    <h5 class="product-name">${product.name}</h5>
                    <p class="product-description">${product.description}</p>
                    <div class="product-price">
                        ${product.discount > 0 ?
                `<small style="text-decoration: line-through; color: #999;">R$ ${product.price.toFixed(2)}</small><br>`
                : ''}
                        R$ ${discountedPrice}
                    </div>
                    <div class="product-footer">
                        <button class="btn-add-cart" onclick="addToCart(${product.id})">
                            <i class="fas fa-shopping-cart"></i> Adicionar
                        </button>
                        <button class="btn btn-outline-secondary p-2" onclick="quickView(${product.id})" title="Visualização Rápida">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;

        productsGrid.appendChild(productCard);
    });
}

// Filtrar produtos
document.addEventListener('DOMContentLoaded', function () {
    loadProducts('all');

    // Event listeners dos filtros
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.dataset.filter;
            loadProducts(currentFilter);
        });
    });
});

// Visualização rápida do produto
function quickView(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        alert(`${product.name}\n\nDescrição: ${product.description}\nPreço: R$ ${product.price.toFixed(2)}\n\nProduto adicionado ao carrinho com sucesso! ✓`);
        addToCart(productId);
    }
}

// Função para obter produto por ID
function getProductById(id) {
    return products.find(p => p.id === id);
}
