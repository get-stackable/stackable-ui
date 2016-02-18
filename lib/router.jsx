FlowRouter.subscriptions = function () {
    this.register('apps.all', Meteor.subscribe('apps.all'));
};

FlowRouter.route('/', {
    name: 'home',
    action: function () {
        ReactLayout.render(MainLayout, {
            content: <HomePage />
        });
    }
});

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
    action: function (params) {
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

FlowRouter.route('/item/create/:type/:appId', {
    name: 'itemCreate',
    action: function (params) {
        let data = {type: params.type, appId: params.appId};
        Meteor.call('item.create', data, (err, res) => {
            if (!err) {
                //console.log('result is:', res);
                ReactLayout.render(MainLayout, {
                    content: <ItemUpdate id={res._id}/>
                });
            }
        });
    }
});

FlowRouter.route('/item/update/:type/:id', {
    name: 'itemUpdate',
    action: function (params) {
        ReactLayout.render(MainLayout, {
            content: <ItemUpdate id={params.id}/>
        });
    }
});

FlowRouter.route('/search/:query', {
    name: 'search',
    subscriptions: function(params, queryParams) {
        var limit = parseInt(queryParams['limit']) || SiteSettings.limit;
        this.register('items.find', Meteor.subscribe('items.find', params.query, limit));
    },
    action: function(params) {
        ReactLayout.render(MainLayout, {
            content: <SearchResults query={params.query} />
        });
    }
});
