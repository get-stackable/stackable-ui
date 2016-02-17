let ContentTypes = new Mongo.Collection("content_types");

let ContentTypeItem = Astro.Class({
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
        slug: 'string',
        items: {
            type: 'array',
            nested: 'ContentTypeItem',
            default: function() {
                return [];
            }
        },
        domainId: 'string'
    },
    behaviors: {
        slug: {
            fieldName: 'name',
            methodName: null,
            slugFieldName: 'slug',
            canUpdate: true,
            unique: true,
            separator: '-'
        },
        timestamp: {
            hasCreatedField: true,
            createdFieldName: 'createdAt',
            hasUpdatedField: true,
            updatedFieldName: 'updatedAt'
        }
    }
});
