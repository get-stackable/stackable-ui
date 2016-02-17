let Domains = new Mongo.Collection("domains");

Domain = Astro.Class({
    name: 'Domain',
    collection: Domains,
    fields: {
      name: 'string',
      url: 'string',
      isActive: {
          type: 'boolean',
          default: true
      },
      authKey: 'string',
      users: 'array'
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
