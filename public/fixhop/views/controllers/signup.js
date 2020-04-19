Controller.controllers.signup = {};

Controller.controllers.signup.refresh = function () {
    var promises = [Model.getLoggedUser(), Model.cartItemCount()];

    Promise.all(promises)
        .then(function (result) {
            var context = {};
            context.user = result[0];
            context.cartItemCount = result[1];

            View.renderer.signup.render(context);
        })
}

Controller.controllers.signup.signup_clicked = function (event) {
    event.preventDefault();

    var user = {
        name: $("#name").val(),
        surname: $("#surname").val(),
        address: $("#address").val(),
        email: $("#email").val(),
        password: $("#password").val(),
        repeat_password: $("#repeatPassword").val()
    };

    var reloadSignup = function (msg) {
        Promise.resolve(View.renderer.signup.render({ message: msg }));
    }

    if (!(user.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))) {
        var message = {
            title: 'Email inválido',
            description: 'El correo electrónico introducido no se corresponde con una dirección válida.'
        }
        reloadSingup(message);
    } else {
        Model.signup(user)
            .then(function (result) {
                Controller.messages.pushInfo(result);
                Controller.router.go('index');
            })
            .catch(function (err) {
                Controller.messages.pushError(err);
                if (err == "PASSWORDS_NOT_MATCHING") {
                    var message = {
                        title: "Error: contraseña incorrecta",
                        description: "La contraseña introducida no es correcta."
                    };
                    reloadSignup(message);
                }
            });
    };
};