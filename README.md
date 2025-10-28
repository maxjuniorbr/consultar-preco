# Price Consultation App

A responsive static web application created to test the price consultation experience used by Grupo Boticário representatives (REs) in a physical store environment.

## Purpose

This project is part of a usability test to validate how representatives interact with a price lookup interface using tablets and barcode scanners.

## Features

* Representative identification by code or CPF
* Product lookup by code or EAN (barcode)
* Display of resale price and profitability when a representative is identified
* Automatic price display timeout (configurable)
* Stacked product cards with timed removal
* Persistent error messages for better user feedback
* Responsive layout optimized for tablets
* Accessible HTML5 semantic structure
* Fully static implementation using HTML, CSS, and JavaScript

## Structure

* `index.html` – main interface with semantic HTML5 elements
* `style.css` – centralized styles and CSS variables
* `script.js` – core logic with organized state management
* `products.js` – static product database
* `resellers.js` – sample reseller data

## Deployment

This is a static prototype hosted via GitHub Pages for testing purposes.
Access the deployed version at:

```
https://maxjuniorbr.github.io/consultar-preco/
```

## Notes

* All UI text is written in Portuguese, while all code and comments use English.
* This repository is intended for testing and validation only, not for production use.
