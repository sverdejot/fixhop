Controller.controllers.cart = {};

Controller.controllers.cart.refresh = function () {
    var promises = [Model.getLoggedUser(), Model.getShoppingCart(), Model.cartItemCount()];

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

    Model.removeOneProduct(product_id)
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

    Model.removeAllProduct(product_id)
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
    Model.checkout()
        .then(function(sucess, order_number) {
            Controller.messages.pushIngo(sucess);
            Controller.controllers.router.go('orders/' + order_number);
        })
        .catch(function (err) {
            Controller.errors.pushError(err);
            Controller.controllers.cart.refresh();
        })
};