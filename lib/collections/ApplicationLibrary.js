let ApplicationLibraries = new Mongo.Collection("application_libraries");

let ItemRelations = Astro.Class({
    name: 'ItemRelations',
    fields: {
        relation_id: {
            type: 'string'
        },
        relation_field: {
            type: 'string'
        }
    }
});

let LibraryItem = Astro.Class({
    name: 'LibraryItem',
    fields: {
        _id: {
            type: 'string',
            default: function () {
                return Random.id(6);
            }
        },
        name: {
            type: 'string'
        },
        slug: {
            type: 'string'
        },
        description: {
            type: 'string'
        },
        type: {
            type: 'string'
        },
        validations: {
            type: 'object',
            default: function () {
                return {};
            }
        },
        relations: {
            type: 'object',
            nested: 'ItemRelations',
            default: function () {
                return {};
            }
        },
        isRequired: {
            type: 'boolean',
            default: false
        },
        isDisabled: {
            type: 'boolean',
            default: false
        },
        listing_order: {
            type: 'number',
            default: 1
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
