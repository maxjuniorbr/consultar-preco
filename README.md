# Price Consultation App

A responsive static web application for testing price consultation experience used by Grupo Boticário representatives in physical stores.

## Purpose

Usability test prototype to validate representative interaction with price lookup interface using tablets and barcode scanners.

## Features

- Representative identification by code or CPF (optional mode via `?re=true`)
- Product lookup by code or EAN (barcode)
- Session timer with automatic timeout and manual reset
- Dynamic pricing based on reseller classification (7 levels: Bronze through Diamante)
- Price table showing all classification tiers when no reseller is identified
- Resale price and profitability display (when representative is identified)
- Visual classification badges using images for better recognition
- Automatic product card removal after configurable timeout
- Scanner detection vs manual input with debounce
- Immediate search on blur (TAB key or touch outside field)
- Error messages for invalid products/representatives
- Analytics integration (Google Analytics and Microsoft Clarity)
- Manual session reset button (configurable)
- Responsive layout optimized for tablets
- Full accessibility support (WCAG compliant)

## Project Structure

```
/
├── index.html                 # Main HTML interface
├── assets/
│   ├── css/
│   │   └── style.css         # Application styles
│   ├── images/               # Classification badge images
│   └── js/
│       ├── config.js         # Configuration constants
│       ├── data/
│       │   ├── products.js   # Product data (mock)
│       │   └── resellers.js  # Reseller data (mock)
│       └── modules/
│           ├── state.js      # State management
│           ├── utils.js      # Utilities
│           ├── analytics.js  # Analytics
│           ├── session.js    # Session timer
│           ├── reseller.js   # Reseller logic
│           ├── product.js    # Product logic
│           ├── pricing.js    # Price calculations
│           ├── ui.js         # UI rendering
│           ├── handlers-reseller.js
│           ├── handlers-product.js
│           └── app.js        # Initialization
```

## Configuration

Edit `assets/js/config.js` to adjust:

- `DISPLAY_TIME_SECONDS` - Product display duration (default: 10s)
- `MAX_DISPLAYED_PRODUCTS` - Max products shown simultaneously (default: 1)
- `SESSION_TIMEOUT_SECONDS` - Reseller session timeout (default: 10s)
- `SESSION_TIMER_CONFIG` - Session timer and reset button visibility:
  - `showTimer` - Display countdown timer (default: false)
  - `showResetButton` - Display manual reset button (default: true)
- `RESELLER_BANNER_CONFIG` - Banner information display:
  - `showClassification` - Show classification badge (default: true)
  - `showDiscount` - Show discount percentage (default: true)
  - `showCode` - Show reseller code (default: true)
- `CLASSIFICATION_DISCOUNTS` - Discount percentages by classification tier (configured per business rules)

## Usage Modes

**Default mode** - Product search only:
```
https://maxjuniorbr.github.io/consultar-preco/
```

**Reseller mode** - With representative identification:
```
https://maxjuniorbr.github.io/consultar-preco/?re=true
```

## Deployment

Static prototype hosted via GitHub Pages:
- **URL**: https://maxjuniorbr.github.io/consultar-preco/
- No build step required
- Pure HTML, CSS, and JavaScript

## Development Notes

- **Code and comments**: English
- **UI text**: Brazilian Portuguese
- **Architecture**: Modular JavaScript (11 focused modules)
- **No dependencies**: Vanilla JS + Bootstrap CSS
- **Pricing**: Dynamic calculation based on reseller classification
- **Accessibility**: WCAG compliant with ARIA labels, keyboard navigation, and screen reader support
- **Input handling**: Debounced typing + immediate search on blur
- **Session management**: Auto-reset on timeout + manual reset button option
- **Testing**: Manual testing with tablet and barcode scanner recommended

## Accessibility Features

- Semantic HTML structure with proper landmarks
- ARIA labels and roles for all interactive elements
- Keyboard navigation with logical tab order
- Focus indicators on all interactive elements
- Screen reader announcements for dynamic content
- High contrast colors for visibility
- Touch-friendly button sizes for tablet use

