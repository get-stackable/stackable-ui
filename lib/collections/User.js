let Profile = Astro.Class({
    name: 'Profile',
    fields: {
        first_name: 'string',
        last_name: 'string',
        location: 'string',
        about: 'string'
    }
});

let Referral  = Astro.Class({
    name: 'Referral',
    fields: {
        wasReferred: {
            type: 'boolean',
            default: false
        },
        referredBy: 'string',
        balance:  {
            type: 'number',
            default: 0
        },
        referrals: {
            type: 'array',
            default: function () {
                return [];
            }
        },
        key: {
            type: 'string',
            default: function () {
                return Random.id(5);
            }
        }
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
        profile: {
            type: 'object',
            nested: 'Profile',
            default: function () {
                return {};
            }
        },
        isPaid: {
            type: 'boolean',
            default: false
        },
        isActive: {
            type: 'boolean',
            default: true
        },
        lastLoginAt: 'date',
        authKey: 'string',
        apps: {
            type: 'array',
            default: function () {
                return [];
            }
        },
        referral: {
            type: 'object',
            nested: 'Referral',
            default: function () {
                return {};
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
    },
    methods: {
        fullName: function () {
            return this.profile.first_name + ' ' + this.profile.last_name;
        },
        email: function () {
            return this.emails[0].address;
        }
    }
});
