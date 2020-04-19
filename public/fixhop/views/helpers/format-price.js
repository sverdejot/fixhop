Handlebars.registerHelper('formatPrice', function(price){
    return (price != 0) ? parseFloat(Math.round(price * 100) / 100).toLocaleString('es-ES') + '€' : "0€";
})