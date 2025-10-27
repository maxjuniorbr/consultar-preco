const DISPLAY_TIME_SECONDS = 10;
const MAX_DISPLAYED_PRODUCTS = 5;

let resellerFlag = false;
let currentReseller = null;
let displayedProducts = [];
let typingDebounceId = null;

const resellerGroup = document.getElementById('reGroup');
const resellerInput = document.getElementById('reInput');
const productSearch = document.getElementById('productSearch');
const productsDiv = document.getElementById('products');

document.addEventListener('DOMContentLoaded', initialize);

function initialize() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('re')) {
        const flagValue = urlParams.get('re');
        resellerFlag = flagValue === 'true' || flagValue === '1';
    }

    controlResellerFieldVisibility();
    setInitialFocus();
    showInitialMessage();

    console.log('Reseller Flag:', resellerFlag ? 'ENABLED (showing reseller field + reseller price and profitability)' : 'DISABLED (hiding reseller field + showing only price)');
}

function sanitizeDigits(value) {
    return value.replace(/\D/g, '');
}

function clearProductSearchField() {
    if (!productSearch) {
        return;
    }

    productSearch.value = '';
    productSearch.focus();
}

function setInitialFocus() {
    if (resellerFlag && resellerInput) {
        resellerInput.focus();
        return;
    }

    if (productSearch) {
        productSearch.focus();
    }
}

function controlResellerFieldVisibility() {
    if (!resellerGroup) {
        return;
    }

    resellerGroup.style.display = resellerFlag ? 'block' : 'none';
}

function setResellerFlag(value) {
    resellerFlag = value;
    controlResellerFieldVisibility();
    setInitialFocus();
    console.log('Reseller Flag changed to:', resellerFlag ? 'ENABLED' : 'DISABLED');
    renderAllProducts();
}

window.setResellerFlag = setResellerFlag;

function identifyReseller(input) {
    if (!input) {
        currentReseller = null;
        return;
    }

    const cleanInput = sanitizeDigits(input);
    const found = resellers.find(reseller => reseller.code === cleanInput || reseller.cpf === cleanInput);

    if (found) {
        currentReseller = found;
        console.log('Reseller identified:', currentReseller.name);
        return;
    }

    currentReseller = null;
    console.log('Reseller not found');
}

function canExecuteSearch() {
    if (!productSearch) {
        return false;
    }

    const productValue = productSearch.value.trim();
    if (resellerFlag) {
        return currentReseller !== null && productValue !== '';
    }

    return productValue !== '';
}

function executeProductSearch(query) {
    const results = filterProducts(query);

    if (results.length > 0) {
        addProductToDisplay(results[0]);
    } else {
        showProductNotFoundMessage();
    }

    clearProductSearchField();
}

function addProductToDisplay(product) {
    const existingIndex = displayedProducts.findIndex(item => item.product.code === product.code);

    if (existingIndex !== -1) {
        clearTimeout(displayedProducts[existingIndex].timeoutId);
        displayedProducts.splice(existingIndex, 1);
    }

    if (displayedProducts.length >= MAX_DISPLAYED_PRODUCTS) {
        const oldest = displayedProducts.shift();
        clearTimeout(oldest.timeoutId);
    }

    const timeoutId = setTimeout(() => {
        removeProductFromDisplay(product.code);
    }, DISPLAY_TIME_SECONDS * 1000);

    displayedProducts.push({
        product: product,
        timeoutId: timeoutId,
        timestamp: Date.now()
    });

    renderAllProducts();
}

function removeProductFromDisplay(productCode) {
    const index = displayedProducts.findIndex(item => item.product.code === productCode);
    if (index === -1) {
        return;
    }

    displayedProducts.splice(index, 1);
    renderAllProducts();
}

function filterProducts(query) {
    if (!query) {
        return [];
    }

    const normalizedQuery = query.toLowerCase();

    return products.filter(product => {
        const code = product.code.toLowerCase();
        const ean = product.ean.toLowerCase();

        return code === normalizedQuery || ean === normalizedQuery;
    });
}

function showInitialMessage() {
    if (!productsDiv) {
        return;
    }

    productsDiv.innerHTML = '<div class="alert-busca">Digite ou escaneie o código ou EAN para buscar um produto</div>';
}

function showProductNotFoundMessage() {
    if (!productsDiv) {
        return;
    }

    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert-error';
    errorDiv.innerHTML = 'Produto não encontrado. Verifique o código e tente novamente.';

    if (displayedProducts.length > 0) {
        productsDiv.insertBefore(errorDiv, productsDiv.firstChild);
    } else {
        productsDiv.innerHTML = '';
        productsDiv.appendChild(errorDiv);
    }

    setTimeout(() => {
        if (!errorDiv.parentNode) {
            return;
        }

        errorDiv.remove();
        if (displayedProducts.length === 0) {
            showInitialMessage();
        }
    }, 3000);
}

function renderAllProducts() {
    if (!productsDiv) {
        return;
    }

    productsDiv.innerHTML = '';

    if (displayedProducts.length === 0) {
        showInitialMessage();
        return;
    }

    if (resellerFlag && currentReseller) {
        const resellerBanner = document.createElement('div');
        resellerBanner.className = 'reseller-banner';
        resellerBanner.innerHTML = `
      <div class="reseller-info">
        Preço para <strong>${currentReseller.name}</strong> (cód. ${currentReseller.code})
      </div>
    `;
        productsDiv.appendChild(resellerBanner);
    }

    displayedProducts.slice().reverse().forEach(item => {
        const { product } = item;
        const card = document.createElement('div');
        card.className = 'produto-card';
        card.setAttribute('data-product-code', product.code);

        card.innerHTML = `
      <img src="${product.image}" class="produto-img" alt="${product.name}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22%3E%3Crect fill=%22%23ddd%22 width=%22120%22 height=%22120%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%23999%22%3ESem imagem%3C/text%3E%3C/svg%3E'">
      <div class="produto-info">
        <div class="produto-nome">${product.name}</div>
        <div class="produto-preco">R$ ${product.price.toFixed(2)}</div>
        ${(resellerFlag && currentReseller) ? `
          <div class="produto-detalhes">
            <div class="produto-detalhes-item">
              <span class="produto-detalhes-label">Preço Revenda</span>
              <span class="produto-detalhes-valor">R$ ${product.resellerPrice.toFixed(2)}</span>
            </div>
            <div class="produto-detalhes-item">
              <span class="produto-detalhes-label">Lucratividade</span>
              <span class="produto-detalhes-valor">R$ ${product.profitability.toFixed(2)}</span>
            </div>
          </div>
        ` : ''}
      </div>
    `;

        productsDiv.appendChild(card);
    });
}

function handleResellerInput(event) {
    const sanitized = sanitizeDigits(event.target.value);
    if (event.target.value !== sanitized) {
        event.target.value = sanitized;
    }

    if (sanitized === '') {
        currentReseller = null;
        renderAllProducts();
    }
}

function handleResellerKeyPress(event) {
    if (event.key !== 'Enter') {
        return;
    }

    event.preventDefault();
    identifyReseller(event.target.value.trim());
    if (productSearch) {
        productSearch.focus();
    }
}

function handleResellerBlur(event) {
    const value = event.target.value.trim();
    if (value) {
        identifyReseller(value);
    }
}

function handleProductInput(event) {
    const sanitized = sanitizeDigits(event.target.value);
    if (event.target.value !== sanitized) {
        event.target.value = sanitized;
    }

    clearTimeout(typingDebounceId);
    typingDebounceId = null;

    const query = sanitized.trim();
    if (!query || !canExecuteSearch()) {
        return;
    }

    typingDebounceId = setTimeout(() => {
        executeProductSearch(query);
        typingDebounceId = null;
    }, 1000);
}

function handleProductKeyPress(event) {
    if (event.key !== 'Enter') {
        return;
    }

    event.preventDefault();
    clearTimeout(typingDebounceId);
    typingDebounceId = null;

    const sanitized = sanitizeDigits(event.target.value);
    event.target.value = sanitized;

    const query = sanitized.trim();
    if (!query || !canExecuteSearch()) {
        return;
    }

    executeProductSearch(query);
}

function handleProductFocus(event) {
    event.target.select();
}

if (resellerInput) {
    resellerInput.addEventListener('input', handleResellerInput);
    resellerInput.addEventListener('keypress', handleResellerKeyPress);
    resellerInput.addEventListener('blur', handleResellerBlur);
}

if (productSearch) {
    productSearch.addEventListener('input', handleProductInput);
    productSearch.addEventListener('keypress', handleProductKeyPress);
    productSearch.addEventListener('focus', handleProductFocus);
}
