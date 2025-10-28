function handleResellerInput(event) {
    const sanitized = sanitizeDigits(event.target.value);
    if (event.target.value !== sanitized) {
        event.target.value = sanitized;
    }

    clearTimeout(appState.resellerTypingDebounceId);
    appState.resellerTypingDebounceId = null;

    const query = sanitized.trim();
    
    if (query === '') {
        appState.currentReseller = null;
        clearSessionTimer();
        clearErrorMessage();
        renderAllProducts();
        return;
    }

    // Detect input method (scanner detection: fast input)
    const inputSpeed = query.length > 5 ? 'scanner' : 'manual';

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
}

function handleResellerBlur(event) {
    // No action needed on blur
}
