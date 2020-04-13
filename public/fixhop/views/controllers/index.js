Controller.controllers.index = {};

Controller.controllers.index.refresh = function() {
    var context = {};
    Model.getProducts()
        .then(function(products) {
            context.products = products;
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
            $('#messagesModal').modal().find('.modal-body').text('Producto añadido satisfactoriamente');
        })
        /*
        .catch(function (err) {
            $('#messagesModal').modal().find('.modal-body').text('Se ha producido un error al añadir el producto: ' + err);
            Controller.messages.pushInfo(err);
        })*/
        .finally(function() {
            $('#messagesModal').modal('show');
        })
}