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
    if (appState.isResellerModeEnabled && dom.resellerInput) {
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

    dom.resellerGroup.style.display = appState.isResellerModeEnabled ? 'block' : 'none';
}

function setResellerMode(enabled) {
    appState.isResellerModeEnabled = enabled;
    controlResellerFieldVisibility();
    setInitialFocus();
    console.log('Reseller mode changed to:', appState.isResellerModeEnabled ? 'ENABLED' : 'DISABLED');
    renderAllProducts();
}

window.setResellerMode = setResellerMode;

function startAutoFocusTimer() {
    clearAutoFocusTimer();
    
    const targetField = appState.isResellerModeEnabled 
        ? (appState.currentReseller ? 'product_search' : 'reseller_input')
        : 'product_search';
    
    console.log(`[Auto-Focus] Timer started - ${AUTO_FOCUS_TIMEOUT_SECONDS}s | Target: ${targetField}`);
    
    appState.autoFocusTimeoutId = setTimeout(() => {
        console.log(`[Auto-Focus] Timer completed - Returning focus to ${targetField}`);
        returnFocusToInput();
        
        trackEvent('auto_focus_triggered', {
            target_field: targetField,
            timeout_seconds: AUTO_FOCUS_TIMEOUT_SECONDS,
            reseller_mode: appState.isResellerModeEnabled,
            has_reseller: appState.currentReseller !== null
        });
        
        appState.autoFocusTimeoutId = null;
    }, AUTO_FOCUS_TIMEOUT_SECONDS * 1000);
}

function clearAutoFocusTimer() {
    if (appState.autoFocusTimeoutId) {
        console.log('[Auto-Focus] Timer cancelled by user interaction');
        clearTimeout(appState.autoFocusTimeoutId);
        appState.autoFocusTimeoutId = null;
    }
}

function returnFocusToInput() {
    if (appState.isResellerModeEnabled) {
        if (appState.currentReseller && dom.productSearch) {
            console.log('[Focus] → Product search field (reseller identified)');
            dom.productSearch.focus();
        } else if (dom.resellerInput) {
            console.log('[Focus] → Reseller input field (no reseller)');
            dom.resellerInput.focus();
        }
    } else {
        if (dom.productSearch) {
            console.log('[Focus] → Product search field (normal mode)');
            dom.productSearch.focus();
        }
    }
}

function setupAutoFocusInteractionListeners() {
    const cancelAutoFocus = () => {
        clearAutoFocusTimer();
    };
    
    if (dom.resellerInput) {
        dom.resellerInput.addEventListener('input', cancelAutoFocus);
        dom.resellerInput.addEventListener('keydown', cancelAutoFocus);
    }
    
    if (dom.productSearch) {
        dom.productSearch.addEventListener('input', cancelAutoFocus);
        dom.productSearch.addEventListener('keydown', cancelAutoFocus);
    }
    
    if (dom.resetSessionBtn) {
        dom.resetSessionBtn.addEventListener('click', cancelAutoFocus);
    }
    
    document.addEventListener('touchstart', cancelAutoFocus, { passive: true });
    document.addEventListener('mousedown', cancelAutoFocus, { passive: true });
    document.addEventListener('scroll', cancelAutoFocus, { passive: true });
}
