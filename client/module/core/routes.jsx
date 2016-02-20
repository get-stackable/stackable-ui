loggedInOnly = function(context, redirect) {
    if (_.isNull(Meteor.user())) {
        redirect('/login');
    }
};

guestsOnly = function(context, redirect) {
    if (!_.isNull(Meteor.user())) {
        redirect('/home');
    }
};

FlowRouter.triggers.enter([loggedInOnly], {
    only: ['home', 'appManage', 'appCreate', 'appUpdate', 'containerCreate', 'containerUpdate', 'itemCreate',
        'itemUpdate', 'search']
});

FlowRouter.triggers.enter([guestsOnly], {
    only: ['login']
});

FlowRouter.subscriptions = function () {
    this.register('apps.all', Meteor.subscribe('apps.all'));
    this.register('user.data', Meteor.subscribe('user.data'));
};

FlowRouter.notFound = {
    action: function() {
        ReactLayout.render(MainLayout, {
            content: <NotFound />
        });
    }
};

FlowRouter.route('/', {
    name: 'home',
    action: function () {
        ReactLayout.render(MainLayout, {
            content: <HomePage />
        });
    }
});

FlowRouter.route('/restricted', {
    name: 'restricted',
    action: function() {
        ReactLayout.render(BlankLayout, {
            content: <Restricted />
        });
    }
});

FlowRouter.route('/not-found', {
    name: 'notFound',
    action: function() {
        ReactLayout.render(BlankLayout, {
            content: <NotFound />
        });
    }
});

FlowRouter.route('/login', {
    name: 'login',
    action: function() {
        ReactLayout.render(BlankLayout, {
            content: <Login />
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
