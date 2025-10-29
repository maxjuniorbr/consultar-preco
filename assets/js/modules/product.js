function canExecuteSearch() {
    if (!dom.productSearch) {
        return false;
    }

    const productValue = dom.productSearch.value.trim();
    if (appState.isResellerModeEnabled) {
        return appState.currentReseller !== null && productValue !== '';
    }

    return productValue !== '';
}

function executeProductSearch(query) {
    clearErrorMessage();
    
    console.log(`[Product Search] Query: "${query}" | Length: ${query.length}`);

    const startTime = Date.now();
    const results = filterProducts(query);

    if (results.length > 0) {
        const searchTime = Date.now() - startTime;
        const pricing = calculatePriceForReseller(results[0], appState.currentReseller);
        
        console.log(`[Product Found] ${results[0].name} | Code: ${results[0].code} | Price: R$ ${pricing.purchasePrice.toFixed(2)} | Time: ${searchTime}ms`);
        
        trackEvent('product_search_success', {
            product_code: results[0].code,
            product_name: results[0].name,
            search_time_ms: searchTime,
            input_length: query.length,
            has_reseller: appState.currentReseller !== null,
            reseller_classification: appState.currentReseller?.classification,
            purchase_price: pricing.purchasePrice,
            retail_price: pricing.suggestedRetailPrice,
            profit_amount: pricing.profit
        });
        addProductToDisplay(results[0]);
        
        if (appState.isResellerModeEnabled && appState.currentReseller) {
            startSessionTimer();
        }
    } else {
        console.warn(`[Product Not Found] Query: "${query}"`);
        
        trackEvent('product_search_failed', {
            search_query: query,
            input_length: query.length,
            has_reseller: appState.currentReseller !== null
        });
        
        if (MAX_DISPLAYED_PRODUCTS === 1) {
            appState.displayedProducts = [];
        }
        
        showProductNotFoundMessage();
        
        if (appState.isResellerModeEnabled && appState.currentReseller) {
            startSessionTimer();
        }
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

    if (!appState.isResellerModeEnabled || !appState.currentReseller) {
        trackEvent('price_table_viewed', {
            product_code: product.code,
            product_name: product.name,
            total_classifications: CLASSIFICATION_ORDER.length
        });
    }

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
