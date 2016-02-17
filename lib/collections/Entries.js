Entries = new Mongo.Collection("entries");

Entry = Astro.Class({
    name: 'Entry',
    collection: Entries,
    fields: {
        name: 'string',
        data: 'string',
        contentType: 'string',
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
