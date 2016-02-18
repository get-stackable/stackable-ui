FlowRouter.subscriptions = function () {
    this.register('domains.all', Meteor.subscribe('domains.all'));
};

FlowRouter.route('/', {
    name: 'home',
    action: function () {
        ReactLayout.render(MainLayout, {
            content: <HomePage />
        });
    }
});

FlowRouter.route('/domain/manage/:id', {
    name: 'domainManage',
    action: function (params) {
        ReactLayout.render(MainLayout, {
            content: <DomainManage id={params.id}/>
        });
    }
});

FlowRouter.route('/domain/create', {
    name: 'domainCreate',
    action: function (params) {
        ReactLayout.render(MainLayout, {
            content: <DomainCreate />
        });
    }
});

FlowRouter.route('/domain/update/:id', {
    name: 'domainUpdate',
    action: function (params) {
        ReactLayout.render(MainLayout, {
            content: <DomainUpdate id={params.id}/>
        });
    }
});

FlowRouter.route('/content-type/create/:domainId', {
    name: 'contentTypeCreate',
    action: function (params) {
        ReactLayout.render(MainLayout, {
            content: <ContentTypeCreate domainId={params.domainId}/>
        });
    }
});

FlowRouter.route('/content-type/update/:id', {
    name: 'contentTypeUpdate',
    action: function (params) {
        ReactLayout.render(MainLayout, {
            content: <ContentTypeUpdate id={params.id}/>
        });
    }
});

FlowRouter.route('/entry/create/:type/:domainId', {
    name: 'entryCreate',
    action: function (params) {
        let data = {type: params.type, domainId: params.domainId};
        Meteor.call('entry.create', data, (err, res) => {
            if (!err) {
                //console.log('result is:', res);
                ReactLayout.render(MainLayout, {
                    content: <EntryUpdate id={res._id}/>
                });
            }
        });
    }
});

FlowRouter.route('/entry/update/:type/:id', {
    name: 'entryUpdate',
    action: function (params) {
        ReactLayout.render(MainLayout, {
            content: <EntryUpdate id={params.id}/>
        });
    }
});
