function identifyReseller(input) {
    if (!input) {
        appState.currentReseller = null;
        return false;
    }

    const cleanInput = sanitizeDigits(input);
    const found = resellers.find(reseller => reseller.code === cleanInput || reseller.cpf === cleanInput);

    if (found) {
        appState.currentReseller = found;
        clearErrorMessage();
        trackEvent('reseller_identified', {
            reseller_code: found.code,
            classification: found.classification,
            discount_percentage: getDiscountPercentage(found.classification),
            input_type: cleanInput.length === 11 ? 'cpf' : 'code'
        });
        console.log('Reseller identified:', appState.currentReseller.name);
        
        if (dom.productSearch) {
            dom.productSearch.focus();
        }
        
        return true;
    }

    appState.currentReseller = null;
    showResellerNotFoundMessage();
    trackEvent('reseller_not_found', {
        input_value: cleanInput
    });
    console.log('Reseller not found');
    
    // Return focus to reseller field
    if (dom.resellerInput) {
        dom.resellerInput.focus();
    }
    
    return false;
}
