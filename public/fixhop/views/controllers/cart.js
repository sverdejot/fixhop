Controller.controllers.cart = {};

Controller.controllers.cart.refresh = function () {
    var promises = [Model.getUser(Model.user), Model.getShoppingCart(Model.user), Model.cartItemCount(Model.user)];

    Promise.all(promises)
        .then(function(result) {
            var context = {};
            context.user = result[0];
            context.cart = result[1];
            context.cartItemCount = result[2];

            View.renderer.cart.render(context);
        })
};

Controller.controllers.cart.removeOneProduct_onclick = function(event, product_id) {
    event.preventDefault();

    Model.removeOneProduct(Model.user, product_id)
        .then(function (result) {
            Controller.messages.pushInfo(result);
        })
        .catch(function (err) {
            Controller.messages.pushError(err);
            console.error(err);
        })
        .finally(function() {
            Controller.controllers.cart.refresh();
        })
};

Controller.controllers.cart.removeAllProducts_onclick = function(event, product_id) {
    event.preventDefault();

    Model.removeAllProduct(Model.user, product_id)
        .then(function (result) {
            Controller.messages.pushInfo(result);
        })
        .catch(function (err) {
            Controller.messages.pushError(err);
            console.error(err);
        })
        .finally(function() {
            Controller.controllers.cart.refresh();
        })
};

Controller.controllers.cart.proceedToCheckout_onclick = function(event) {
    event.preventDefault();
    Controller.router.go('purchase')
};