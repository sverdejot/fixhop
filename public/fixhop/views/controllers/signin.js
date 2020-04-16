Controller.controllers.signin = {};

Controller.controllers.signin.refresh = function() {
    var context = {};
    var promises = [Model.getLoggedUser(), Model.cartItemCount()]

    Promise.all(promises)
        .then(function (result) {
            context.user = result[0];
            context.cartItemCount = result[1];
            View.renderer.signin.render(context);
        });
}

Controller.controllers.signin.signin_clicked = function() {
    event.preventDefault();
    var credentials = {
        email: $("#userEmail").val(),
        password: $("#userPassword").val()
    }

    Model.signin(credentials)
        .then(function (result) {
            Controller.messages.pushInfo(result);
        })
        .catch(function(err) {
            Controller.messages.pushError(err);
        })
        .finally(function() {
            Controller.router.go('/fixhop/views/index');
        });
}