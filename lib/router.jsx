FlowRouter.route('/', {
    name: 'home',
    action: function() {
        ReactLayout.render(MainLayout, {
            content: <HomePage />
        });
    }
});

FlowRouter.route('/content-type/create', {
    name: 'contentTypeCreate',
    action: function() {
        ReactLayout.render(MainLayout, {
            content: <ContentTypeCreate />
        });
    }
});

