function calculatePriceForReseller(product, reseller) {
    if (!reseller || !reseller.classification) {
        return {
            purchasePrice: product.baseRetailPrice,
            suggestedRetailPrice: product.baseRetailPrice,
            profit: 0
        };
    }

    const discountPercentage = CLASSIFICATION_DISCOUNTS[reseller.classification] || 0;
    const purchasePrice = product.baseRetailPrice * (1 - discountPercentage / 100);
    const profit = product.baseRetailPrice - purchasePrice;

    return {
        purchasePrice: purchasePrice,
        suggestedRetailPrice: product.baseRetailPrice,
        profit: profit
    };
}

function getDiscountPercentage(classification) {
    return CLASSIFICATION_DISCOUNTS[classification] || 0;
}
