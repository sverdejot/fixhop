var View = {};

View.renderer = {};

View.loadTemplate = function(filename) {
    return $.ajax({
        url: '/fixhop/views/templates/' + filename + '.hbs'
    });
};

View.renderTemplate = function(id, container, context) {
    return View.loadTemplate(id)
        .then(function(source) {
            var template = Handlebars.compile(source);
            var html = template(context);
            return $('#' + container).html(html);
        });
};

View.loadPartial = function(filename) {
    return $.ajax({
        url: '/fixhop/views/partials/' + filename + '.hbs'
    })
    .then(function (contents) {
        return Handlebars.registerPartial(filename, contents);
    });
};

$(function () {
    var promises = [View.loadPartial('navbar-partial'), 
                    View.loadPartial('product-partial'), 
                    View.loadPartial('footer-partial'), 
                    View.loadPartial('message-partial'), 
                    View.loadPartial('cart-product-partial'),
                    View.loadPartial('tab-product-partial'),
                    View.loadPartial('order-partial')];

    Promise.all(promises)
        .then(function () {
            Controller.router.route();
        })
})