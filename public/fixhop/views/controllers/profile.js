Controller.controllers.profile = {};

Controller.controllers.profile.refresh = function() {
    var promises = [Model.getUser(Model.user), Model.getShoppingCart(Model.user), Model.cartItemCount(Model.user)];

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