Controller.controllers.navbar = {};

Controller.controllers.navbar.signin_clicked = function(event) {
    event.preventDefault();
    Controller.router.go(event.target.href);
};

Controller.controllers.navbar.home_clicked = function(event) {
    event.preventDefault();
    Controller.router.go(event.target.href);
};

Controller.controllers.navbar.signup_clicked = function(event) {
    event.preventDefault();
    Controller.router.go(event.target.href);
};

Controller.controllers.navbar.signout_clicked = function(event) {
    event.preventDefault();

    Model.signout()
        .then(function() {
            Controller.router.route('index');
        })
};

Controller.controllers.navbar.view_cart = function(event) {
    event.preventDefault();
    Controller.router.go(event.target.href);
};

Controller.controllers.navbar.proceedToCheckout_clicked = function(event) {
    event.preventDefault();
    Controller.router.go(event.target.href);
};