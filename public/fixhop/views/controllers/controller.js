Controller = {};

Controller.controllers = {};

Controller.router = {};

Controller.messages = {};
Controller.messages.errors = [];
Controller.messages.infos = [];

Controller.router.route = function() {
    var path = location.pathname;
    var matching = null;

    if (matching = path.match(/^\/fixhop\/views\/index$/)) Controller.controllers.index.refresh();
    else if (matching = path.match(/^\/fixhop\/views\/signin$/)) Controller.controllers.signin.refresh();
    else if (matching = path.match(/^\/fixhop\/views\/signup$/)) Controller.controllers.signup.refresh();
    else if (matching = path.match(/^\/fixhop\/views\/cart$/)) Controller.controllers.cart.refresh();
    else if (matching = path.match(/^\/fixhop\/views\/purchase$/)) Controller.controllers.purchase.refresh();
    else if (matching = path.match(/^\/fixhop\/views\/order\/([0-9]*)$/)) Controller.controllers.order.refresh(matching);
    else if (matching = path.match(/^\/fixhop\/views\/profile$/)) Controller.controllers.profile.refresh(matching);
    
    else console.error('controller.js: route() - Page not found')
}

Controller.router.go = function (url) {
    history.pushState(null, '', url);
    Controller.router.route();
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
