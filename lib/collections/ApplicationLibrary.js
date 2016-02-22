let ApplicationLibraries = new Mongo.Collection("application_libraries");

let LibraryItem = Astro.Class({
    name: 'LibraryItem',
    fields: {
        name: {
            type: 'string'
        },
        type: {
            type: 'string'
        },
        validations: {
            type: 'string'
        },
        required: {
            type: 'boolean',
            default: false
        }
    }
});

let LibraryContainer = Astro.Class({
    name: 'LibraryContainer',
    fields: {
        name: {
            type: 'string'
        },
        items: {
            type: 'array',
            nested: 'LibraryItem',
            default: function () {
                return [];
            }
        }
    }
});

ApplicationLibrary = Astro.Class({
    name: 'ApplicationLibrary',
    collection: ApplicationLibraries,
    fields: {
        name: 'string',
        description: 'string',
        containers: {
            type: 'array',
            nested: 'LibraryContainer',
            default: function () {
                return [];
            }
        },
        isOfficial: {
            type: 'boolean',
            default: true
        },
        isActive: {
            type: 'boolean',
            default: true
        },
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
