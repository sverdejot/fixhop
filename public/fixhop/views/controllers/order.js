Controller.controllers.order = {};

Controller.controllers.order.refresh = function(matching) {
    var promises = [Model.getLoggedUser(), Model.getShoppingCart(), Model.cartItemCount(), Model.getOrder(matching[1])];

    Promise.all(promises)
        .then(function([user, cart, cartItemCount, order]) {
            context = {
                user: user,
                cart: cart,
                cartItemCount: cartItemCount,
                order: order
            };

            View.renderer.order.render(context);
        });
}