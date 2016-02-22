FlowRouter.route('/stack/manage/:id', {
    name: 'appUpdate',
    action: function (params) {
        ReactLayout.render(MainLayout, {
            content: <AppUpdate id={params.id}/>
        });
    }
});
