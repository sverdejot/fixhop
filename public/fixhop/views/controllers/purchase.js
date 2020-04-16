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

Controller.controllers.purchase.checkout_onclick = function(event) {
    event.preventDefault();

    let order = {
        date: $("#orderDate").val(),
        address: $("#deliverAddress").val(),
        cardNumber: $("#cardNumber").val(),
        cardHolder: $("#cardHolder").val()
    };

    Model.checkout(order)
        .then(function(order_number) {
            Controller.messages.pushInfo("Pedido procesado satisfactoriamente");
            Controller.router.go('order/' + order_number);
        })
        .catch(function (err) {
            console.log(err)
            Controller.messages.pushError(err);
            Controller.controllers.purchase.refresh();
        });
}