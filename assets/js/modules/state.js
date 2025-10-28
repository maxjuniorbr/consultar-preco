const appState = {
    isResellerModeEnabled: false,
    currentReseller: null,
    displayedProducts: [],
    typingDebounceId: null,
    resellerTypingDebounceId: null,
    currentErrorElement: null,
    sessionTimeoutId: null,
    sessionCountdownId: null,
    sessionTimeRemaining: 0
};

const dom = {
    resellerGroup: document.getElementById('reGroup'),
    resellerInput: document.getElementById('reInput'),
    productSearch: document.getElementById('productSearch'),
    productsDiv: document.getElementById('products'),
    sessionTimer: document.getElementById('sessionTimer')
};
