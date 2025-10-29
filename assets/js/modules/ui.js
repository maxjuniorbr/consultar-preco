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
    errorDiv.setAttribute('role', 'alert');
    errorDiv.setAttribute('aria-live', 'assertive');
    errorDiv.innerHTML = 'Produto não encontrado. Verifique o código e tente novamente.';

    appState.currentErrorElement = errorDiv;
    renderAllProducts();
}

function showResellerNotFoundMessage() {
    if (!dom.productsDiv) {
        return;
    }

    clearErrorMessage();

    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert-error';
    errorDiv.setAttribute('role', 'alert');
    errorDiv.setAttribute('aria-live', 'assertive');
    errorDiv.innerHTML = 'Revendedora não encontrada. Verifique o código ou CPF e tente novamente.';

    appState.currentErrorElement = errorDiv;
    renderAllProducts();
}

function renderAllProducts() {
    if (!dom.productsDiv) {
        return;
    }

    const errorElement = appState.currentErrorElement;

    dom.productsDiv.innerHTML = '';

    if (appState.isResellerModeEnabled && appState.currentReseller) {
        const discountPercentage = getDiscountPercentage(appState.currentReseller.classification);
        
        console.log(`[UI] Rendering reseller banner | ${appState.currentReseller.name} | ${appState.currentReseller.classification} | ${discountPercentage}% OFF`);
        
        const resellerBanner = document.createElement('div');
        resellerBanner.className = 'reseller-banner';
        
        let bannerContent = `
            <div class="reseller-banner-content">`;
        
        if (RESELLER_BANNER_CONFIG.showClassification) {
            bannerContent += `
                <div class="reseller-classification-badge">
                    <img src="assets/images/${appState.currentReseller.classification.toLowerCase()}.svg" 
                         alt="${appState.currentReseller.classification}" 
                         class="reseller-classification-img-large"
                         title="${appState.currentReseller.classification}">
                </div>`;
        }
        
        bannerContent += `
                <div class="reseller-info-details">
                    <div class="reseller-name">${appState.currentReseller.name}</div>
                    <div class="reseller-metadata">`;
        
        if (RESELLER_BANNER_CONFIG.showCode) {
            bannerContent += `<span class="reseller-code">Código: ${appState.currentReseller.code}</span>`;
        }
        
        if (RESELLER_BANNER_CONFIG.showDiscount) {
            bannerContent += `<span class="reseller-discount">${discountPercentage}% OFF</span>`;
        }
        
        bannerContent += `
                    </div>
                </div>
            </div>`;
        
        resellerBanner.innerHTML = bannerContent;
        
        dom.productsDiv.appendChild(resellerBanner);
    }

    if (errorElement) {
        dom.productsDiv.appendChild(errorElement);
    }

    if (appState.displayedProducts.length === 0) {
        if (!errorElement) {
            showInitialMessage();
        }
        return;
    }

    appState.displayedProducts.slice().reverse().forEach(item => {
        const { product } = item;
        const pricing = calculatePriceForReseller(product, appState.currentReseller);
        
        const card = document.createElement('div');
        card.className = 'produto-card';
        card.setAttribute('data-product-code', product.code);
        card.setAttribute('role', 'article');
        card.setAttribute('aria-label', `Produto: ${product.name}, preço R$ ${pricing.purchasePrice.toFixed(2)}`);

        card.innerHTML = `
      <img src="${product.image}" class="produto-img" alt="${product.name}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22%3E%3Crect fill=%22%23ddd%22 width=%22120%22 height=%22120%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%23999%22%3ESem imagem%3C/text%3E%3C/svg%3E'">
      <div class="produto-info">
        <div class="produto-nome">${product.name}</div>
        <div class="produto-preco" aria-label="Preço de compra">R$ ${pricing.purchasePrice.toFixed(2)}</div>
        ${(appState.isResellerModeEnabled && appState.currentReseller) ? `
          <div class="produto-detalhes">
            <div class="produto-detalhes-item">
              <span class="produto-detalhes-label">Revenda por:</span>
              <span class="produto-detalhes-valor">R$ ${pricing.suggestedRetailPrice.toFixed(2)}</span>
            </div>
            <div class="produto-detalhes-item">
              <span class="produto-detalhes-label">Lucre:</span>
              <span class="produto-detalhes-valor">R$ ${pricing.profit.toFixed(2)}</span>
            </div>
          </div>
        ` : `
          <div class="tabela-precos" role="table" aria-label="Tabela de preços por classificação">
            <div class="tabela-precos-grid" role="rowgroup">
              ${CLASSIFICATION_ORDER.map(classification => {
                const classificationPricing = calculatePriceForReseller(product, { classification });
                const discount = getDiscountPercentage(classification);
                return `
                  <div class="tabela-precos-row" role="row">
                    <div class="tabela-precos-classification" role="cell">
                      <img src="assets/images/${classification.toLowerCase()}.svg" 
                           alt="${classification}" 
                           class="classification-badge-img"
                           title="${classification}">
                    </div>
                    <div class="tabela-precos-values" role="cell">
                      <div class="tabela-precos-item">
                        <span class="tabela-precos-label">Pague:</span>
                        <span class="tabela-precos-value">R$ ${classificationPricing.purchasePrice.toFixed(2)}</span>
                      </div>
                      <div class="tabela-precos-item">
                        <span class="tabela-precos-label">Revenda por:</span>
                        <span class="tabela-precos-value">R$ ${classificationPricing.suggestedRetailPrice.toFixed(2)}</span>
                      </div>
                      <div class="tabela-precos-item">
                        <span class="tabela-precos-label">Lucre:</span>
                        <span class="tabela-precos-value profit">R$ ${classificationPricing.profit.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        `}
      </div>
    `;

        dom.productsDiv.appendChild(card);
    });
}
