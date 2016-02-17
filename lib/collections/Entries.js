let Entries = new Mongo.Collection("entries");

Entry = Astro.Class({
    name: 'Entry',
    collection: Entries,
    fields: {
        contentType: 'string',
        contentTypeId: 'string',
        domainId: 'string',
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
