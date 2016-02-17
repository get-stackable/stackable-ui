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

FlowRouter.route('/entry/create/:type', {
    name: 'entryCreate',
    action: function(params) {
        Meteor.call('entry.create', {type: params.type}, (err, res) => {
          if (!err) {
            //console.log('result is:', res);
            FlowRouter.go('entryUpdate', {type: res.contentType, id: res._id});
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
