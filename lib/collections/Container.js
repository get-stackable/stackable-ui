let Containers = new Mongo.Collection("containers");

let ContainerItem = Astro.Class({
    name: 'ContainerItem',
    fields: {
        _id: {
            type: 'string'
        },
        name: {
            type: 'string'
        },
        type: {
            type: 'string'
        },
        validations: {
            type: 'array'
        },
        required: {
            type: 'boolean',
            default: false
        },
        disabled: {
            type: 'boolean',
            default: false
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
