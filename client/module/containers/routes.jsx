FlowRouter.route('/containers/:appId', {
    name: 'containersList',
    action: function (params) {
        ReactLayout.render(MainLayout, {
            content: <Containers appId={params.appId}/>
        });
    }
});

FlowRouter.route('/container/create/:appId', {
    name: 'containerCreate',
    action: function (params) {
        ReactLayout.render(MainLayout, {
            content: <ContainerCreate appId={params.appId}/>
        });
    }
});

FlowRouter.route('/container/update/:id', {
    name: 'containerUpdate',
    action: function (params) {
        ReactLayout.render(MainLayout, {
            content: <ContainerUpdate id={params.id}/>
        });
    }
});
