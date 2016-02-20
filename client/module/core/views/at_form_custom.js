// Simply 'inherites' helpers from AccountsTemplates
Template.atFormCustom.helpers(AccountsTemplates.atFormHelpers);

// Helper for checking if you should hide message div under atPwdForm
// if there is nothing to display in it
Template.atFormCustom.helpers({
    any: function (a, b, c) {
        return a || b || c ? true : false;
    }
});
