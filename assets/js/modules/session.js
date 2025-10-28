function startSessionTimer() {
    clearSessionTimer();
    
    if (!appState.isResellerModeEnabled || !appState.currentReseller) {
        return;
    }
    
    showResetButton();
    
    appState.sessionTimeRemaining = SESSION_TIMEOUT_SECONDS;
    
    if (SESSION_TIMER_CONFIG.showTimer) {
        updateSessionTimerDisplay();
        
        if (dom.sessionTimer) {
            dom.sessionTimer.style.display = 'block';
        }
    }
    
    appState.sessionCountdownId = setInterval(() => {
        appState.sessionTimeRemaining--;
        
        if (SESSION_TIMER_CONFIG.showTimer) {
            updateSessionTimerDisplay();
        }
        
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
    appState.displayedProducts = [];
    
    if (dom.resellerInput) {
        dom.resellerInput.value = '';
    }
    
    clearSessionTimer();
    hideResetButton();
    clearErrorMessage();
    renderAllProducts();
    setInitialFocus();
    
    console.log('Reseller session expired');
}

function showResetButton() {
    if (!SESSION_TIMER_CONFIG.showResetButton || !dom.resetSessionBtn) {
        return;
    }
    
    if (appState.isResellerModeEnabled && appState.currentReseller) {
        dom.resetSessionBtn.style.display = 'block';
    }
}

function hideResetButton() {
    if (dom.resetSessionBtn) {
        dom.resetSessionBtn.style.display = 'none';
    }
}

function handleResetSession() {
    trackEvent('session_reset_manual', {
        reseller_code: appState.currentReseller?.code,
        reseller_name: appState.currentReseller?.name
    });
    
    clearResellerSession();
}
