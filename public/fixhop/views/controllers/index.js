Controller.controllers.index = {};

Controller.controllers.index.refresh = function() {
    var promises = [Model.getLoggedUser(), Model.cartItemCount(), Model.getProducts()];
    Promise.all(promises)
        .then(function(result) {
            context = {};
            context.user = result[0];
            context.cartItemCount = result[1];
            context.products = result[2];
            View.renderer.index.render(context);
        })
        .catch(function (err) {
            console.error(err);
        })
};

Controller.controllers.index.addToCart_clicked = function (event, product_id) {
    Model.addToCart(product_id)
        .then(function(result) {
            Controller.messages.pushInfo(result);
        })
        .catch(function (err) {
            Controller.messages.pushInfo(err);
        })
        .finally(function() {
            Controller.controllers.index.refresh();
        })
};