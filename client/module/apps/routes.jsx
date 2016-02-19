FlowRouter.route('/app/manage/:id', {
    name: 'appManage',
    action: function (params) {
        ReactLayout.render(MainLayout, {
            content: <AppManage id={params.id}/>
        });
    }
});

FlowRouter.route('/app/create', {
    name: 'appCreate',
    action: function () {
        ReactLayout.render(MainLayout, {
            content: <AppCreate />
        });
    }
});

FlowRouter.route('/app/update/:id', {
    name: 'appUpdate',
    action: function (params) {
        ReactLayout.render(MainLayout, {
            content: <AppUpdate id={params.id}/>
        });
    }
});
