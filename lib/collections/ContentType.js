ContentTypes = new Mongo.Collection("content_types");

ContentTypeItem = Astro.Class({
    name: 'ContentTypeItem',
    fields: {
        _id: {
            type: 'string'
        },
        title: {
            type: 'string'
        },
        type: {
            type: 'string'
        },
        rules: {
            type: 'array'
        }
    }
});

ContentType = Astro.Class({
    name: 'ContentType',
    collection: ContentTypes,
    fields: {
        name: 'string',
        items: {
            type: 'array',
            nested: 'ContentTypeItem',
            default: function() {
                return [];
            }
        },
        ownerId: 'string'
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
