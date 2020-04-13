Controller = {};

Controller.controllers = {};

Controller.router = {};

Controller.messages = {};
Controller.messages.errors = [];
Controller.messages.infos = [];

Controller.router.route = function() {
    var path = location.pathname;
    var matching = null;

    if (matching = path.match(/^\/fixhop\/views\/index$/)) {
        Controller.controllers.index.refresh();
    }
    else {
        console.error('controller.js: route() - Page not found')
    }
}

Controller.messages.pushError = function (error) {
    Controller.messages.errors.push(error);
};

Controller.messages.pushInfo = function (info) {
    Controller.messages.infos.push(info);
};

Controller.messages.popMessages = function() {
    var result = {
        errors: Controllers.messagees.errors.slice(),
        infos: Controller.messages.infos.slice()
    };

    Controller.messages.errors = [];
    Controller.messages.infos = [];

    return result;
};
