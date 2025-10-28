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

    console.log('Reseller mode:', appState.isResellerModeEnabled ? 'ENABLED (showing reseller field + reseller price and profitability)' : 'DISABLED (hiding reseller field + showing only price)');
}

function setupEventListeners() {
    if (dom.resellerInput) {
        dom.resellerInput.addEventListener('input', handleResellerInput);
        dom.resellerInput.addEventListener('keypress', handleResellerKeyPress);
        dom.resellerInput.addEventListener('focus', handleResellerFocus);
    }

    if (dom.productSearch) {
        dom.productSearch.addEventListener('input', handleProductInput);
        dom.productSearch.addEventListener('keypress', handleProductKeyPress);
        dom.productSearch.addEventListener('focus', handleProductFocus);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initialize();
    setupEventListeners();
});
