if (Meteor.App) {
    throw new Meteor.Error('Meteor.App already defined? see client/lib/constants.js');
}

Meteor.App = {
    NAME: 'stackable',
    DESCRIPTION: 'API DRIVEN CONTENT'
};
