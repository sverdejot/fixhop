Handlebars.registerHelper('formatPrice', function(price){
    return parseFloat(price).toLocaleString('es-ES') + '€';
})