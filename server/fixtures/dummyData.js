// The "||" notation doesn't work yet
Fixtures = typeof Fixtures !== "undefined" ? Fixtures : {};

Fixtures.users = [];
Fixtures.applicationLibrary = [];

var createProfile = function (user) {
    return {
        first_name: user.name,
        last_name: user.surname,
        location: Fake.fromArray(['Birmingham', 'London', 'Surrey']),
        about: Fake.sentence(20)
    };
};

let user = Fake.user();
Fixtures.users.push({
    "emails": [{"address": "perminder.klair@gmail.com", "verified": true}],
    "services": {"password": {"bcrypt": "$2a$10$CCzzYL/1ZRbhytUM3aiMeOCiGx9XXmRZ1kiUyfB0FvfPWbh2hLcmG"}},
    "resume": {
        "loginTokens": [{
            "when": 'ISODate("2015-02-26T15:28:51.272Z")',
            "hashedToken": "JUjmXp4Q4gUMIJ/cXZ+3uVhWzADHp5NKzRG9ONV7zd8="
        }]
    },
    username: 'klair',
    slug: 'klair',
    profile: createProfile(user),
    isActive: true,
    authKey: '123456'
});

Fixtures.applicationLibrary.push({
    name: 'Blog',
    description: 'This library creates standard blog.',
    containers: [{
        name: 'Blog',
        items: [{
            name: 'Title',
            type: 'text',
            required: true
        }, {
            name: 'Description',
            type: 'textArea'
        }]
    }]
});

Fixtures.applicationLibrary.push({
    name: 'Product Catalog',
    description: 'This library creates product catalog quickly.',
    containers: [{
        name: 'Products',
        items: [{
            name: 'Title',
            type: 'text',
            required: true
        }, {
            name: 'Description',
            type: 'textArea'
        }, {
            name: 'Cost',
            type: 'text'
        }, {
            name: 'Is Active',
            type: 'boolean'
        }]
    }]
});
