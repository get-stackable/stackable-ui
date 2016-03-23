let Applications = new Mongo.Collection("applications");

let Storage = Astro.Class({
    name: 'Storage',
    fields: {
        image_storage: {
            type: 'string'
        },
        db_storage: {
            type: 'string'
        },
        total_storage: {
            type: 'string'
        }
    }
});

Application = Astro.Class({
    name: 'Application',
    collection: Applications,
    fields: {
        name: 'string',
        description: 'string',
        isActive: {
            type: 'boolean',
            default: true
        },
        publicKey: 'string',
        privateKey: 'string',
        allowedUrls: 'string',
        createdBy: 'string',
        users: 'array',
        tags: {
            type: 'array',
            default: function () {
                return [];
            }
        },
        storage: {
            type: 'object',
            nested: 'Storage',
            default: function () {
                return {}
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
