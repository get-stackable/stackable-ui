let Containers = new Mongo.Collection("containers");

let ContainerItem = Astro.Class({
    name: 'ContainerItem',
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
        description: {
            type: 'string'
        },
        type: {
            type: 'string'
        },
        validations: {
            type: 'string'
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

Container = Astro.Class({
    name: 'Container',
    collection: Containers,
    fields: {
        name: 'string',
        slug: 'string',
        items: {
            type: 'array',
            nested: 'ContainerItem',
            default: function () {
                return [];
            }
        },
        appId: 'string'
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
