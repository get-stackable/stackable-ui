FlowRouter.route('/stack/manage/:id', {
    name: 'appUpdate',
    action: function (params) {
        ReactLayout.render(MainLayout, {
            content: <AppUpdate id={params.id}/>
        });
    }
});

FlowRouter.route('/stack/:id', {
    name: 'appView',
    action: function (params) {
        ReactLayout.render(MainLayout, {
            content: <AppView id={params.id}/>
        });
    }
});
