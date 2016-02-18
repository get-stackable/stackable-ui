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
        publishedAt: 'date'
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
