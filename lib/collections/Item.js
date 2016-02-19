let Items = new Mongo.Collection("items");

Item = Astro.Class({
    name: 'Item',
    collection: Items,
    fields: {
        container: 'string',
        containerId: 'string',
        appId: 'string',
        data: 'object',
        ownerId: 'string',
        publishedAt: 'date',
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
    },
    events: {
        'beforeSave': function(e) {
            //store tags
            this.set('tags', _.values(this.data));
        }
    }
});
