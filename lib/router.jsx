FlowRouter.route('/', {
    name: 'home',
    action: function() {
        ReactLayout.render(MainLayout, {
            content: <HomePage />
        });
    }
});

FlowRouter.route('/domain/manage/:id', {
    name: 'domainManage',
    action: function(params) {
        ReactLayout.render(MainLayout, {
            content: <DomainManage id={params.id} />
        });
    }
});

FlowRouter.route('/content-type/create/:domainId', {
    name: 'contentTypeCreate',
    action: function(params) {
        ReactLayout.render(MainLayout, {
            content: <ContentTypeCreate domainId={params.domainId} />
        });
    }
});

FlowRouter.route('/entry/create/:type/:domainId', {
    name: 'entryCreate',
    action: function(params) {
        let data = {type: params.type, domainId: params.domainId};
        Meteor.call('entry.create', data, (err, res) => {
          if (!err) {
            //console.log('result is:', res);
            FlowRouter.go('entryUpdate', {
              type: res.contentType,
              id: res._id
            });
          }
        });
    }
});

FlowRouter.route('/entry/update/:type/:id', {
    name: 'entryUpdate',
    action: function(params) {
        ReactLayout.render(MainLayout, {
            content: <EntryUpdate id={params.id} />
        });
    }
});
