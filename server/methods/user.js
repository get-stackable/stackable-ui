Accounts.onCreateUser(function(options, user) {
    user.apps = [];

    return user;
});