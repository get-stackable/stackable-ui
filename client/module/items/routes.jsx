FlowRouter.route('/items/:appId', {
    name: 'itemsList',
    action: function (params) {
        ReactLayout.render(MainLayout, {
            content: <ItemsList appId={params.appId}/>
        });
    }
});

FlowRouter.route('/item/create/:containerId/', {
    name: 'itemCreate',
    action: function (params) {
        ReactLayout.render(MainLayout, {
            content: <ItemCreate containerId={params.containerId}/>
        });
    }
});

FlowRouter.route('/item/container/:containerId/', {
    name: 'itemContainerView',
    action: function (params) {
        ReactLayout.render(MainLayout, {
            content: <ItemCreate containerId={params.containerId} isView={true} />
        });
    }
});

FlowRouter.route('/item/update/:id', {
    name: 'itemUpdate',
    action: function (params) {
        ReactLayout.render(MainLayout, {
            content: <ItemUpdate id={params.id}/>
        });
    }
});
