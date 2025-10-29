function handleResellerInput(event) {
    const sanitized = sanitizeDigits(event.target.value);
    if (event.target.value !== sanitized) {
        event.target.value = sanitized;
    }

    clearTimeout(appState.resellerTypingDebounceId);
    appState.resellerTypingDebounceId = null;

    const query = sanitized.trim();
    
    if (query === '') {
        console.log('[Input] Reseller field cleared');
        appState.currentReseller = null;
        appState.displayedProducts = [];
        clearSessionTimer();
        clearErrorMessage();
        renderAllProducts();
        return;
    }

    const inputSpeed = query.length > 5 ? 'scanner' : 'manual';
    
    console.log(`[Input] Reseller field | Method: ${inputSpeed} | Length: ${query.length}`);

    appState.resellerTypingDebounceId = setTimeout(() => {
        trackEvent('reseller_input_method', {
            input_method: inputSpeed,
            input_length: query.length
        });
        
        identifyReseller(query);
        
        appState.resellerTypingDebounceId = null;
    }, 1000);
}

function handleResellerKeyPress(event) {
    if (event.key !== 'Enter') {
        return;
    }

    event.preventDefault();
    clearTimeout(appState.resellerTypingDebounceId);
    appState.resellerTypingDebounceId = null;

    const sanitized = sanitizeDigits(event.target.value);
    event.target.value = sanitized;

    const query = sanitized.trim();
    if (!query) {
        return;
    }

    trackEvent('reseller_input_method', {
        input_method: 'enter_key',
        input_length: query.length
    });

    identifyReseller(query);
}

function handleResellerFocus(event) {
    event.target.select();
    clearAutoFocusTimer();
}

function handleResellerBlur(event) {
    if (appState.resellerTypingDebounceId) {
        clearTimeout(appState.resellerTypingDebounceId);
        appState.resellerTypingDebounceId = null;

        const sanitized = sanitizeDigits(event.target.value);
        event.target.value = sanitized;

        const query = sanitized.trim();
        if (query) {
            trackEvent('reseller_input_method', {
                input_method: 'blur',
                input_length: query.length
            });
            identifyReseller(query);
        }
    }
    
    startAutoFocusTimer();
}
