FlashMessages = {
    send: function(message) {
        sendMessage(message, 'default');
    },
    sendWarning: function(message) {
        sendMessage(message, 'warning');
    },
    sendError: function(message, options) {
        sendMessage(message, 'danger', options);
    },
    sendSuccess: function(message) {
        sendMessage(message, 'success');
    },
    sendInfo: function(message) {
        sendMessage(message, 'info');
    },
    clear: function() {
        console.log('hide all messages!!!');
    }
};

/**
 * Show notifications, types:
 * default (default)
 * success
 * info
 * warning
 * danger
 */
sendMessage = function(message, type) {
    Bert.alert(message, type, 'growl-top-right');
};
