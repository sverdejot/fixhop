Controller.controllers.navbar = {};

Controller.controllers.navbar.signin_clicked = function(event) {
    event.preventDefault();
    Controller.router.go(event.target.href);
};

Controller.controllers.navbar.home_clicked = function(event) {
    event.preventDefault();
    Controller.router.go(event.target.href);
}