Handlebars.registerHelper('calculateTaxes', function(price, tax) {
    return parseFloat(price*(tax-1)).toLocaleString('es-ES') + '€';
})