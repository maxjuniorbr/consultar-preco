function identifyReseller(input) {
    if (!input) {
        appState.currentReseller = null;
        return false;
    }

    const cleanInput = sanitizeDigits(input);
    const inputType = cleanInput.length === 11 ? 'CPF' : 'Code';
    
    console.log(`[Reseller Search] Input: "${cleanInput}" | Type: ${inputType}`);
    
    const found = resellers.find(reseller => reseller.code === cleanInput || reseller.cpf === cleanInput);

    if (found) {
        appState.currentReseller = found;
        clearErrorMessage();
        
        const discount = getDiscountPercentage(found.classification);
        console.log(`[Reseller Identified] ${found.name} | Classification: ${found.classification} | Discount: ${discount}%`);
        
        trackEvent('reseller_identified', {
            reseller_code: found.code,
            classification: found.classification,
            discount_percentage: discount,
            input_type: inputType.toLowerCase()
        });
        
        if (dom.productSearch) {
            dom.productSearch.focus();
        }
        
        return true;
    }

    appState.currentReseller = null;
    
    if (MAX_DISPLAYED_PRODUCTS === 1) {
        appState.displayedProducts = [];
    }
    
    console.warn(`[Reseller Not Found] Input: "${cleanInput}"`);
    
    showResellerNotFoundMessage();
    trackEvent('reseller_not_found', {
        input_value: cleanInput,
        input_type: inputType.toLowerCase()
    });
    
    if (dom.resellerInput) {
        dom.resellerInput.focus();
    }
    
    return false;
}
