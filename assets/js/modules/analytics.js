function trackPageView() {
    if (typeof gtag === 'function') {
        gtag('event', 'page_view', {
            page_title: 'Consulta de Preços - Tablet',
            page_location: window.location.href,
            screen_resolution: `${window.screen.width}x${window.screen.height}`,
            screen_orientation: window.screen.orientation ? window.screen.orientation.type : 'unknown'
        });
    }
}

function trackEvent(eventName, eventParams = {}) {
    if (typeof gtag === 'function') {
        gtag('event', eventName, eventParams);
    }
}
