Controller.controllers.order = {};

Controller.controllers.order.refresh = function(matching) {
    var promises = [Model.getUser(Model.user), Model.getShoppingCart(Model.user), Model.cartItemCount(Model.user), Model.getOrder(Model.user, matching[1])];

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