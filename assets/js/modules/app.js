function initialize() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('re')) {
        const flagValue = urlParams.get('re');
        appState.isResellerModeEnabled = flagValue === 'true' || flagValue === '1';
    }

    controlResellerFieldVisibility();
    setInitialFocus();
    showInitialMessage();
    trackPageView();

    console.log('='.repeat(60));
    console.log('🛒 PRICE QUERY SYSTEM INITIALIZED');
    console.log('='.repeat(60));
    console.log(`Mode: ${appState.isResellerModeEnabled ? 'RESELLER (with RE)' : 'NORMAL (without RE)'}`);
    console.log(`Display Time: ${DISPLAY_TIME_SECONDS}s`);
    console.log(`Max Products: ${MAX_DISPLAYED_PRODUCTS}`);
    console.log(`Auto-Focus Timeout: ${AUTO_FOCUS_TIMEOUT_SECONDS}s`);
    if (appState.isResellerModeEnabled) {
        console.log(`Session Timeout: ${SESSION_TIMEOUT_SECONDS}s`);
    }
    console.log('='.repeat(60));
}

function setupEventListeners() {
    if (dom.resellerInput) {
        dom.resellerInput.addEventListener('input', handleResellerInput);
        dom.resellerInput.addEventListener('keypress', handleResellerKeyPress);
        dom.resellerInput.addEventListener('focus', handleResellerFocus);
        dom.resellerInput.addEventListener('blur', handleResellerBlur);
    }

    if (dom.productSearch) {
        dom.productSearch.addEventListener('input', handleProductInput);
        dom.productSearch.addEventListener('keypress', handleProductKeyPress);
        dom.productSearch.addEventListener('focus', handleProductFocus);
        dom.productSearch.addEventListener('blur', handleProductBlur);
    }
    
    if (dom.resetSessionBtn) {
        dom.resetSessionBtn.addEventListener('click', handleResetSession);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initialize();
    setupEventListeners();
    setupAutoFocusInteractionListeners();
});
