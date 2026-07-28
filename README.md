# BeautyGlow - Loja de Cosméticos Online

Um site de e-commerce moderno e responsivo para venda de cosméticos, desenvolvido com HTML5, CSS3, Bootstrap 5 e JavaScript vanilla.

## 🎯 Funcionalidades

✨ **Catálogo de Produtos**
- 12 produtos de cosméticos predefinidos
- Categorias: Maquiagem, Cuidados com Pele, Cabelos
- Visualização rápida de produtos
- Descontos automáticos

🛒 **Carrinho de Compras**
- Adicionar/remover produtos
- Ajustar quantidades
- Cálculo automático de totais
- Persistência de dados (localStorage)
- Notificações de ações

💳 **Checkout Completo**
- Formulário de dados pessoais
- Endereço de entrega
- Múltiplas opções de frete
- Múltiplos métodos de pagamento
- Validação de formulários
- Máscaras de entrada para dados

📱 **Design Responsivo**
- Totalmente adaptável para mobile, tablet e desktop
- Interface moderna com gradientes e animações
- Bootstrap 5 para layout profissional

## 📁 Estrutura do Projeto

```
GitSite/
├── index.html              # Página principal
├── css/
│   └── style.css          # Estilos personalizados
├── js/
│   ├── products.js        # Gerenciamento de produtos
│   ├── cart.js            # Gerenciamento do carrinho
│   └── checkout.js        # Lógica do checkout
├── pages/
│   └── checkout.html      # Página de checkout
└── images/                # Pasta para imagens (vazia)
```

## 🚀 Como Usar

### 1. Abrir o Site
- Abra o arquivo `index.html` em qualquer navegador moderno

### 2. Navegar pelos Produtos
- Use os filtros para visualizar categorias específicas
- Clique em "Adicionar" para adicionar um produto ao carrinho
- Use "Visualização Rápida" para ver detalhes do produto

### 3. Gerenciar Carrinho
- Clique no ícone do carrinho na navegação
- Ajuste as quantidades com os botões +/-
- Remova produtos com o botão de lixeira
- Veja o total atualizado em tempo real

### 4. Finalizar Compra
- Clique em "Finalizar Compra" no carrinho
- Preencha seus dados pessoais
- Escolha endereço de entrega
- Selecione método de frete
- Escolha forma de pagamento
- Revise o pedido e confirme

## 💰 Valores

### Frete
- **Padrão (5-7 dias)**: R$ 12,50
- **Express (2-3 dias)**: R$ 29,90
- **Next Day (1 dia)**: R$ 49,90
- **Grátis**: Em compras acima de R$ 100

### Métodos de Pagamento
- Cartão de Crédito (com parcelamento)
- PIX (5% de desconto)
- Boleto Bancário

### Produtos
- Preços de R$ 34,90 a R$ 99,90
- Alguns produtos com descontos de até 20%

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Estilização com gradientes e animações
- **Bootstrap 5**: Framework de CSS responsivo
- **JavaScript Vanilla**: Interatividade sem dependências
- **Font Awesome 6**: Ícones vetoriais
- **LocalStorage**: Persistência de dados do carrinho
- **SessionStorage**: Dados temporários de checkout

## 🎨 Recursos de Design

- Paleta de cores moderna (roxo e rosa)
- Animações suaves
- Gradientes personalizados
- Cards com efeito hover
- Interface intuitiva e acessível
- Ícones emoji para produtos (personalizáveis)

## 📝 Customização

### Adicionar Novos Produtos
Edite o arquivo `js/products.js` e adicione um novo objeto ao array `products`:

```javascript
{
    id: 13,
    name: "Nome do Produto",
    category: "categoria",
    price: 99.90,
    description: "Descrição do produto",
    icon: "🎯",
    discount: 10
}
```

### Mudar Cores
Edite as variáveis CSS em `css/style.css`:

```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --accent-color: #f093fb;
}
```

### Adicionar Novos Estados
Edite o select de estados em `pages/checkout.html` adicionando novas opções `<option>`.

## 🔒 Validações Implementadas

✓ Campos obrigatórios no checkout
✓ Validação de email
✓ Validação de número de cartão
✓ Validação de data de validade
✓ Validação de CVV
✓ Máscara de CPF
✓ Máscara de telefone
✓ Máscara de cartão

## 💾 Armazenamento de Dados

- **Carrinho**: Armazenado em `localStorage` (persiste entre sessões)
- **Checkout**: Armazenado em `sessionStorage` (temporário)

## 🌐 Compatibilidade

- ✅ Chrome/Edge (versão 90+)
- ✅ Firefox (versão 88+)
- ✅ Safari (versão 14+)
- ✅ Mobile browsers

## 📞 Informações de Contato

- **Telefone**: (11) 3000-0000
- **Email**: contato@beautyglow.com
- **Localização**: São Paulo, SP - Brasil

## 📄 Próximas Melhorias Sugeridas

- [ ] Sistema de login/cadastro de usuários
- [ ] Histórico de pedidos
- [ ] Avaliações e comentários de produtos
- [ ] Sistema de cupons/códigos de desconto
- [ ] Chat de atendimento ao cliente
- [ ] Integração com APIs de pagamento reais
- [ ] Busca e filtros avançados
- [ ] Wishlist (lista de desejos)
- [ ] Recomendações personalizadas
- [ ] Blog com dicas de beleza

## 📜 Licença

Este projeto é de código aberto e pode ser usado livremente.

---

**Versão**: 1.0  
**Última atualização**: Julho 2024  
**Desenvolvido com ❤️ para BeautyGlow**
