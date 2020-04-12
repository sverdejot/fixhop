Controller.controllers.index = {};

Controller.controllers.index.refresh = function() {
    var context = {};
    module.getProducts()
        .then(function(products) {
            context.products = products;

            View.renderer.index.render(context);
        })
}