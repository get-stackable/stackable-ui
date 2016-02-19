let Applications = new Mongo.Collection("applications");

Application = Astro.Class({
    name: 'Application',
    collection: Applications,
    fields: {
        name: 'string',
        url: 'string',
        isActive: {
            type: 'boolean',
            default: true
        },
        authKey: 'string',
        users: 'array',
        tags: {
            type: 'array',
            default: function () {
                return [];
            }
        }
    },
    behaviors: {
        timestamp: {
            hasCreatedField: true,
            createdFieldName: 'createdAt',
            hasUpdatedField: true,
            updatedFieldName: 'updatedAt'
        }
    }
});
