const DISPLAY_TIME_SECONDS = 10;
const MAX_DISPLAYED_PRODUCTS = 5;

// Application state management
const appState = {
    resellerFlag: false,
    currentReseller: null,
    displayedProducts: [],
    typingDebounceId: null,
    currentErrorElement: null
};

// DOM element references
const dom = {
    resellerGroup: document.getElementById('reGroup'),
    resellerInput: document.getElementById('reInput'),
    productSearch: document.getElementById('productSearch'),
    productsDiv: document.getElementById('products')
};

document.addEventListener('DOMContentLoaded', initialize);

function initialize() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('re')) {
        const flagValue = urlParams.get('re');
        appState.resellerFlag = flagValue === 'true' || flagValue === '1';
    }

    controlResellerFieldVisibility();
    setInitialFocus();
    showInitialMessage();
    trackPageView();

    console.log('Reseller Flag:', appState.resellerFlag ? 'ENABLED (showing reseller field + reseller price and profitability)' : 'DISABLED (hiding reseller field + showing only price)');
}

// Google Analytics Tracking
function trackPageView() {
    if (typeof gtag === 'function') {
        gtag('event', 'page_view', {
            page_title: 'Consulta de Preços - Tablet',
            page_location: window.location.href,
            screen_resolution: `${window.screen.width}x${window.screen.height}`,
            screen_orientation: window.screen.orientation ? window.screen.orientation.type : 'unknown'
        });
    }
}

function trackEvent(eventName, eventParams = {}) {
    if (typeof gtag === 'function') {
        gtag('event', eventName, eventParams);
    }
}

function sanitizeDigits(value) {
    return value.replace(/\D/g, '');
}

function clearProductSearchField() {
    if (!dom.productSearch) {
        return;
    }

    dom.productSearch.value = '';
    dom.productSearch.focus();
}

function setInitialFocus() {
    if (appState.resellerFlag && dom.resellerInput) {
        dom.resellerInput.focus();
        return;
    }

    if (dom.productSearch) {
        dom.productSearch.focus();
    }
}

function controlResellerFieldVisibility() {
    if (!dom.resellerGroup) {
        return;
    }

    dom.resellerGroup.style.display = appState.resellerFlag ? 'block' : 'none';
}

function setResellerFlag(value) {
    appState.resellerFlag = value;
    controlResellerFieldVisibility();
    setInitialFocus();
    console.log('Reseller Flag changed to:', appState.resellerFlag ? 'ENABLED' : 'DISABLED');
    renderAllProducts();
}

window.setResellerFlag = setResellerFlag;

function identifyReseller(input) {
    if (!input) {
        appState.currentReseller = null;
        return;
    }

    const cleanInput = sanitizeDigits(input);
    const found = resellers.find(reseller => reseller.code === cleanInput || reseller.cpf === cleanInput);

    if (found) {
        appState.currentReseller = found;
        trackEvent('reseller_identified', {
            reseller_code: found.code,
            input_type: cleanInput.length === 11 ? 'cpf' : 'code'
        });
        console.log('Reseller identified:', appState.currentReseller.name);
        return;
    }

    appState.currentReseller = null;
    trackEvent('reseller_not_found', {
        input_value: cleanInput
    });
    console.log('Reseller not found');
}

function canExecuteSearch() {
    if (!dom.productSearch) {
        return false;
    }

    const productValue = dom.productSearch.value.trim();
    if (appState.resellerFlag) {
        return appState.currentReseller !== null && productValue !== '';
    }

    return productValue !== '';
}

function executeProductSearch(query) {
    clearErrorMessage();

    const startTime = Date.now();
    const results = filterProducts(query);

    if (results.length > 0) {
        const searchTime = Date.now() - startTime;
        trackEvent('product_search_success', {
            product_code: results[0].code,
            product_name: results[0].name,
            search_time_ms: searchTime,
            input_length: query.length,
            has_reseller: appState.currentReseller !== null
        });
        addProductToDisplay(results[0]);
    } else {
        trackEvent('product_search_failed', {
            search_query: query,
            input_length: query.length,
            has_reseller: appState.currentReseller !== null
        });
        showProductNotFoundMessage();
    }

    clearProductSearchField();
}

function addProductToDisplay(product) {
    const existingIndex = appState.displayedProducts.findIndex(item => item.product.code === product.code);

    if (existingIndex !== -1) {
        clearTimeout(appState.displayedProducts[existingIndex].timeoutId);
        appState.displayedProducts.splice(existingIndex, 1);
    }

    if (appState.displayedProducts.length >= MAX_DISPLAYED_PRODUCTS) {
        const oldest = appState.displayedProducts.shift();
        clearTimeout(oldest.timeoutId);
    }

    const timeoutId = setTimeout(() => {
        removeProductFromDisplay(product.code);
    }, DISPLAY_TIME_SECONDS * 1000);

    appState.displayedProducts.push({
        product: product,
        timeoutId: timeoutId,
        timestamp: Date.now()
    });

    renderAllProducts();
}

function removeProductFromDisplay(productCode) {
    const index = appState.displayedProducts.findIndex(item => item.product.code === productCode);
    if (index === -1) {
        return;
    }

    appState.displayedProducts.splice(index, 1);
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
    if (!dom.productsDiv) {
        return;
    }

    clearErrorMessage();
    dom.productsDiv.innerHTML = '<div class="alert-busca">Digite ou escaneie o código ou EAN para buscar um produto</div>';
}

function clearErrorMessage() {
    if (appState.currentErrorElement && appState.currentErrorElement.parentNode) {
        appState.currentErrorElement.remove();
        appState.currentErrorElement = null;
    }
}

function showProductNotFoundMessage() {
    if (!dom.productsDiv) {
        return;
    }

    clearErrorMessage();

    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert-error';
    errorDiv.innerHTML = 'Produto não encontrado. Verifique o código e tente novamente.';

    appState.currentErrorElement = errorDiv;

    dom.productsDiv.insertBefore(errorDiv, dom.productsDiv.firstChild);
}

function renderAllProducts() {
    if (!dom.productsDiv) {
        return;
    }

    const errorElement = appState.currentErrorElement;

    dom.productsDiv.innerHTML = '';

    if (errorElement) {
        dom.productsDiv.appendChild(errorElement);
    }

    if (appState.displayedProducts.length === 0) {
        if (!errorElement) {
            showInitialMessage();
        }
        return;
    }

    if (appState.resellerFlag && appState.currentReseller) {
        const resellerBanner = document.createElement('div');
        resellerBanner.className = 'reseller-banner';
        resellerBanner.innerHTML = `
      <div class="reseller-info">
        Preço para <strong>${appState.currentReseller.name}</strong> (cód. ${appState.currentReseller.code})
      </div>
    `;
        dom.productsDiv.appendChild(resellerBanner);
    }

    appState.displayedProducts.slice().reverse().forEach(item => {
        const { product } = item;
        const card = document.createElement('div');
        card.className = 'produto-card';
        card.setAttribute('data-product-code', product.code);

        card.innerHTML = `
      <img src="${product.image}" class="produto-img" alt="${product.name}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22%3E%3Crect fill=%22%23ddd%22 width=%22120%22 height=%22120%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%23999%22%3ESem imagem%3C/text%3E%3C/svg%3E'">
      <div class="produto-info">
        <div class="produto-nome">${product.name}</div>
        <div class="produto-preco">R$ ${product.price.toFixed(2)}</div>
        ${(appState.resellerFlag && appState.currentReseller) ? `
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

        dom.productsDiv.appendChild(card);
    });
}

function handleResellerInput(event) {
    const sanitized = sanitizeDigits(event.target.value);
    if (event.target.value !== sanitized) {
        event.target.value = sanitized;
    }

    if (sanitized === '') {
        appState.currentReseller = null;
        renderAllProducts();
    }
}

function handleResellerKeyPress(event) {
    if (event.key !== 'Enter') {
        return;
    }

    event.preventDefault();
    identifyReseller(event.target.value.trim());
    if (dom.productSearch) {
        dom.productSearch.focus();
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

    clearTimeout(appState.typingDebounceId);
    appState.typingDebounceId = null;

    const query = sanitized.trim();
    if (!query || !canExecuteSearch()) {
        return;
    }

    // Track typing (scanner detection: input rápido)
    const inputSpeed = query.length > 5 ? 'scanner' : 'manual';

    appState.typingDebounceId = setTimeout(() => {
        trackEvent('product_input_method', {
            input_method: inputSpeed,
            input_length: query.length
        });
        executeProductSearch(query);
        appState.typingDebounceId = null;
    }, 1000);
}

function handleProductKeyPress(event) {
    if (event.key !== 'Enter') {
        return;
    }

    event.preventDefault();
    clearTimeout(appState.typingDebounceId);
    appState.typingDebounceId = null;

    const sanitized = sanitizeDigits(event.target.value);
    event.target.value = sanitized;

    const query = sanitized.trim();
    if (!query || !canExecuteSearch()) {
        return;
    }

    trackEvent('product_input_method', {
        input_method: 'enter_key',
        input_length: query.length
    });

    executeProductSearch(query);
}

function handleProductFocus(event) {
    event.target.select();
}

if (dom.resellerInput) {
    dom.resellerInput.addEventListener('input', handleResellerInput);
    dom.resellerInput.addEventListener('keypress', handleResellerKeyPress);
    dom.resellerInput.addEventListener('blur', handleResellerBlur);
}

if (dom.productSearch) {
    dom.productSearch.addEventListener('input', handleProductInput);
    dom.productSearch.addEventListener('keypress', handleProductKeyPress);
    dom.productSearch.addEventListener('focus', handleProductFocus);
}
