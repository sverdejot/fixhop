Controller.controllers.profile = {};

Controller.controllers.profile.refresh = function() {
    var promises = [Model.getLoggedUser(), Model.getShoppingCart(), Model.cartItemCount()];

    Promise.all(promises)
        .then(function([user, cart, cartItemCount]){
            var context = {
                user: user,
                cart: cart,
                cartItemCount: cartItemCount
            };

            View.renderer.profile.render(context);
        });
};

Controller.controllers.profile.orderDetails_onclick = function(event, id) {
    event.preventDefault();
    
    Controller.router.go('/fixhop/views/order/' + id);
} 