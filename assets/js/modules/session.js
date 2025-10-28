function startSessionTimer() {
    clearSessionTimer();
    
    if (!appState.isResellerModeEnabled || !appState.currentReseller) {
        return;
    }
    
    appState.sessionTimeRemaining = SESSION_TIMEOUT_SECONDS;
    updateSessionTimerDisplay();
    
    if (dom.sessionTimer) {
        dom.sessionTimer.style.display = 'block';
    }
    
    appState.sessionCountdownId = setInterval(() => {
        appState.sessionTimeRemaining--;
        updateSessionTimerDisplay();
        
        if (appState.sessionTimeRemaining <= 0) {
            clearSessionTimer();
            clearResellerSession();
        }
    }, 1000);
}

function clearSessionTimer() {
    if (appState.sessionCountdownId) {
        clearInterval(appState.sessionCountdownId);
        appState.sessionCountdownId = null;
    }
    
    if (dom.sessionTimer) {
        dom.sessionTimer.style.display = 'none';
    }
    
    appState.sessionTimeRemaining = 0;
}

function updateSessionTimerDisplay() {
    if (!dom.sessionTimer) {
        return;
    }
    
    dom.sessionTimer.textContent = `Sessão ativa: ${appState.sessionTimeRemaining}s restantes`;
}

function clearResellerSession() {
    appState.currentReseller = null;
    
    if (dom.resellerInput) {
        dom.resellerInput.value = '';
    }
    
    clearSessionTimer();
    renderAllProducts();
    setInitialFocus();
    
    console.log('Reseller session expired');
}
