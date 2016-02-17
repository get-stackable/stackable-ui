let Profile = Astro.Class({
    name: 'Profile',
    fields: {
        first_name: 'string',
        last_name: 'string',
        location: 'string',
        about: 'string'
    }
});

User = Astro.Class({
    name: 'User',
    collection: Meteor.users,
    fields: {
        emails: 'array',
        services: 'object',
        resume: 'object',
        username: 'string',
        slug: {
            type: 'string',
            validator: Validators.unique()
        },
        profile: {
            type: 'object',
            nested: 'Profile',
            default: function() {
                return {};
            }
        },
        isActive: {
            type: 'boolean',
            default: true
        },
        lastLoginAt: 'date',
        authKey: 'string'
    },
    behaviors: {
        slug: {
            fieldName: 'username',
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
