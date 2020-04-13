Controller.controllers.index = {};

Controller.controllers.index.refresh = function() {
    var context = {};
    Model.getProducts()
        .then(function(products) {
            context.products = products;
            View.renderer.index.render(context);
        })
        .catch(function (err) {
            console.error(err);
        })
}