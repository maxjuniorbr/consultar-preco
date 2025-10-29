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

    const inputSpeed = query.length > 5 ? 'scanner' : 'manual';
    
    console.log(`[Input] Product field | Method: ${inputSpeed} | Length: ${query.length}`);

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
    clearAutoFocusTimer();
}

function handleProductBlur(event) {
    if (appState.typingDebounceId) {
        clearTimeout(appState.typingDebounceId);
        appState.typingDebounceId = null;

        const sanitized = sanitizeDigits(event.target.value);
        event.target.value = sanitized;

        const query = sanitized.trim();
        if (query && canExecuteSearch()) {
            trackEvent('product_input_method', {
                input_method: 'blur',
                input_length: query.length
            });
            executeProductSearch(query);
        }
    }
    
    startAutoFocusTimer();
}
