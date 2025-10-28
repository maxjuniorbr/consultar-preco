# Price Consultation App

A responsive static web application for testing price consultation experience used by Grupo Boticário representatives in physical stores.

## Purpose

Usability test prototype to validate representative interaction with price lookup interface using tablets and barcode scanners.

## Features

- Representative identification by code or CPF (optional mode via `?re=true`)
- Product lookup by code or EAN (barcode)
- Session timer with automatic timeout after inactivity
- Dynamic pricing based on reseller classification (7 levels: Bronze through Diamante)
- Price table showing all classification tiers when no reseller is identified
- Resale price and profitability display (when representative is identified)
- Automatic product card removal after configurable timeout
- Scanner detection vs manual input
- Error messages for invalid products/representatives
- Responsive layout optimized for tablets

## Project Structure

```
/
├── index.html                 # Main HTML interface
├── assets/
│   ├── css/
│   │   └── style.css         # Application styles
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
- `MAX_DISPLAYED_PRODUCTS` - Max products shown (default: 3)
- `SESSION_TIMEOUT_SECONDS` - Reseller session timeout (default: 10s)
- `CLASSIFICATION_DISCOUNTS` - Discount percentages by classification tier:
  - Bronze: 20%
  - Prata: 25%
  - Ouro: 28%
  - Platina: 30%
  - Rubi: 32%
  - Esmeralda: 34%
  - Diamante: 35%

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
- **Testing**: Manual testing with tablet and barcode scanner recommended

