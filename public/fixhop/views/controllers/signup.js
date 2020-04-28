Controller.controllers.signup = {};

Controller.controllers.signup.refresh = function () {
    var promises = [Model.getUser(Model.user), Model.cartItemCount(Model.user)];

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
        birth: $("#birth").val(),
        email: $("#email").val(),
        password: $("#password").val(),
        repeat_password: $("#repeatPassword").val()
    };
    
    var fieldEmpty = Object.values(user).every(input_field => (input_field === null || input_field === ''));
    var passwordNotMatching = (user.password != user.repeat_password);
    var emailInvalid = !(user.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/));
    var reloadSignup = function (msg) {
        Promise.resolve(View.renderer.signup.render({ message: msg }));
    }

    if (emailInvalid) {
        var message = {
            title: 'Email inválido',
            description: 'El correo electrónico introducido no se corresponde con una dirección válida.'
        }
        reloadSingup(message);
    } else 
    if (passwordNotMatching) {
        var message = {
            title: 'Las contraseñas no coinciden',
            description: 'El campo contraseña y el campo verificación de contraseña no son similares.'
        }
        reloadSingup(message);
    } else
    if (fieldEmpty) {
        var message = {
            title: 'Todos los campos son obligatorios',
            description: 'No puede haber ningún campo nulo en el formulario de registro.'
        }
        reloadSingup(message);
    } else
    {
        Model.signup(user)
            .then(function (result) {
                Controller.messages.pushInfo(result);
                Controller.router.go('index');
            })
            .catch(function (err) {
                console.error(err);
                Controller.messages.pushError(err);
                Controller.controllers.signup.refresh();
            });
    };
};