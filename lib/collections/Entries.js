let Entries = new Mongo.Collection("entries");

Entry = Astro.Class({
    name: 'Entry',
    collection: Entries,
    fields: {
        contentType: 'string',
        contentTypeId: 'string',
        ownerId: 'string',
        data: 'object',
        dataSchema: 'array'
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
