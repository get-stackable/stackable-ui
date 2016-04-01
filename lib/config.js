SiteSettings = {
    limit: 30,
    referralCommission: 5
};

AccountsTemplates.configure({
    // Behavior
    confirmPassword: true,
    enablePasswordChange: true,
    forbidClientAccountCreation: false,
    overrideLoginErrors: true,
    sendVerificationEmail: false,
    lowercaseUsername: false,
    focusFirstInput: true,

    // Appearance
    showAddRemoveServices: false,
    showForgotPasswordLink: true,
    showLabels: true,
    showPlaceholders: true,
    showResendVerificationEmailLink: false,

    // Client-side Validation
    continuousValidation: false,
    negativeFeedback: false,
    negativeValidation: true,
    positiveValidation: true,
    positiveFeedback: true,
    showValidating: true,

    // Privacy Policy and Terms of Use
    privacyUrl: 'privacy',
    termsUrl: 'terms-of-use',

    // Redirects
    homeRoutePath: '/',
    redirectTimeout: 4000,

    // Hooks
    onLogoutHook: function () {
        FlowRouter.go('/');
    },
    onSubmitHook: function () {
        //check referral
        if (!_.isUndefined(Session.get('ref-key'))) {
            Meteor.call('pay.referral', Session.get('ref-key'));
        }

        FlowRouter.go('/');
    },
    //preSignUpHook: myPostSubmitFunc,
    //postSignUpHook: myPostSubmitFunc,

    // Texts
    texts: {
        button: {
            signUp: "Register Now!",
            signIn: "Login"
        },
        pwdLink_link: "reset password",
        socialSignUp: "Register",
        socialIcons: {
            "meteor-developer": "fa fa-rocket"
        },
        title: {
            forgotPwd: "Recover Your Password"
        }
    }
});
