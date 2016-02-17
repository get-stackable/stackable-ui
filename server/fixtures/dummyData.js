// The "||" notation doesn't work yet
Fixtures = typeof Fixtures !== "undefined" ? Fixtures : {};

var createProfile = function (user) {
    return {
        first_name: user.name,
        last_name: user.surname,
        location: Fake.fromArray(['Birmingham', 'London', 'Surrey']),
        about: Fake.sentence(20)
    };
};

Fixtures.users = [];

let user = Fake.user();
Fixtures.users.push({
    "emails" : [{"address" : "perminder.klair@gmail.com", "verified" : true}],
    "services" : { "password" : { "bcrypt" : "$2a$10$CCzzYL/1ZRbhytUM3aiMeOCiGx9XXmRZ1kiUyfB0FvfPWbh2hLcmG" }},
    "resume" : { "loginTokens" : [{"when" : 'ISODate("2015-02-26T15:28:51.272Z")', "hashedToken" : "JUjmXp4Q4gUMIJ/cXZ+3uVhWzADHp5NKzRG9ONV7zd8=" }]},
    username: 'klair',
    slug: 'klair',
    profile: createProfile(user),
    isActive: true,
    authKey: '123456',
    domains: [{
      name: 'appfuel',
      url: 'http://www.appfuel.co.uk',
      authKey: '123456'
    }]
});
