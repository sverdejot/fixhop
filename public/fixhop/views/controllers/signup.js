Controller.controllers.signup = {};

Controller.controllers.signup.refresh = function() {
    var promises = [Model.getLoggedUser(), Model.cartItemCount()];

    Promise.all(promises)
        .then(function(result) {
            var context = {};
            context.user = result[0];
            context.cartItemCount = result[1];

            View.renderer.signup.render(context);
        })
}

Controller.controllers.signup.signup_clicked = function(event) {
    event.preventDefault();

    var user = {
        name: $("#name").val(),
        surname: $("#surname").val(),
        address: $("#address").val(),
        email: $("#email").val(),
        password: $("#password").val(),
        repeat_password: $("#repeatPassword").val()
    };

    Model.signup(user)
        .then(function(result) {
            Controller.messages.pushInfo(result);
        })
        .catch(function(err) {
            Controller.messages.pushError(err);
            console.error(err);
        })
        .finally(function() {
            Controller.router.go('index');
        })
}