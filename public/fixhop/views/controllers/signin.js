Controller.controllers.signin = {};

Controller.controllers.signin.refresh = function () {
    var context = {};
    var promises = [Model.getUser(Model.user), Model.cartItemCount(Model.user)]

    Promise.all(promises)
        .then(function (result) {
            context.user = result[0];
            context.cartItemCount = result[1];
            View.renderer.signin.render(context);
        });
}

Controller.controllers.signin.signin_clicked = function () {
    event.preventDefault();
    var credentials = {
        email: $("#userEmail").val(),
        password: $("#userPassword").val()
    }

    Model.signin(credentials)
        .then(function (result) {
            Controller.messages.pushInfo(result);
            Controller.router.go('/fixhop/views/index');
        })
        .catch(function (err) {
            if (err == "USER_NOT_FOUND") {
                var message = {
                    title: "Error: usuario no encontrado",
                    description: "No existe una cuenta para el email introducido."
                };
            } else if (error == "PASSWORD_NOT_MATCHING") {
                var message = {
                    title: "Error: contraseña incorrecta",
                    description: "La contraseña introducida no es correcta."
                };
            };
            var reloadSignin = Promise.resolve(View.renderer.signin.render({ message: message }));

            reloadSignin.then(function () {
                $("#messagesModal").modal('show');
                $("#messagesModal").on('hidden.bs.modal', function () {
                    Controller.controllers.signin.refresh();
                });
            });  

        });
}