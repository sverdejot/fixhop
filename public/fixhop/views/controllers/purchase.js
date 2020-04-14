Controller.controllers.purchase = {};

Controller.controllers.purchase.refresh = function() {
    var promises = [Model.getLoggedUser(), Model.cartItemCount(), Model.getShoppingCart()];

    Promise.all(promises)
        .then(function(result) {
            var context = {};
            context.user = result[0];
            context.cartItemCount = result[1];
            context.cart = result[2];
            context.date = new Date().toISOString().split('T')[0];

            View.renderer.purchase.render(context);
        })
};