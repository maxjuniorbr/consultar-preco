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
