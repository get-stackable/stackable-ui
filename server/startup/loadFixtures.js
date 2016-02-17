function loadFixture(fixtures, collection) {
    collection.remove({});

    for (var i = 0; i < fixtures.length; i += 1) {
        collection.insert(fixtures[i]);
    }
}

Meteor.startup(function () {
    if (false) {
        loadFixture(Fixtures['users'], User);
    }
});
