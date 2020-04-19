Handlebars.registerHelper('formatTax', function(tax) {
    return parseFloat(Math.round(tax - 1)*100) + "%";
})