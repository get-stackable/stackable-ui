let Future = Npm.require('fibers/future');
let slack = Meteor.npmRequire('slack');
let bot = slack.rtm.client();

//slack.api.test({hello:'world'}, console.log);

const token = 'xoxp-25213748309-27421012549-27421578775-b48e3d2174';
const parmidnerId = 'U0R7BDF6J';
const rishiId = 'U0R6C0K8X';

bot.message(Meteor.bindEnvironment((message) => {
    //console.log('Got a message', message);

    let user = null;
    if (message.user === 'U0TCD0CG5' || message.username === 'bot') {
        user = 'me'
    } else if (message.user === 'U0R7BDF6J') {
        user = 'parminder'
    } else if (message.user === 'U0R6C0K8X') {
        user = 'rishi'
    }

    Chat.update({channelId: message.channel},
        {
            $push: {messages: {
                text: message.text,
                date: new Date(),
                sentBy: user
            }}
        });
    //bot.close();
}));

bot.listen({token});

let channelCreate = function (userId) {
    let user = User.findOne({_id: userId});


    var future = new Future();

    let channelName = 'user-' + Random.id(4);
    console.log(channelName);
    slack.channels.create({token, name: channelName}, Meteor.bindEnvironment(function (err, data) {
        if (err) {
            return future.return(err);
        }

        let channelId =  data.channel.id;

        Chat.insert({channelId: channelId, userId: userId, messages: []});

        let userInfo = `User name: ${user.fullName()} and email: ${user.email()}`;
        slack.chat.postMessage({token, channel: channelId, text: userInfo}, Meteor.bindEnvironment((err, data)=> {}));

        //invite team members
        slack.channels.invite({token, channel: channelId, user: parmidnerId}, Meteor.bindEnvironment(function (err, data) {}));
        slack.channels.invite({token, channel: channelId, user: rishiId}, Meteor.bindEnvironment(function (err, data) {}));

        future.return({channelId});
    }));

    // Wait for async to finish before returning
    // the result
    return future.wait();
};

let channelArchive = function (channelId) {
    var future = new Future();

    Chat.remove({channelId});
    slack.channels.archive({token, channel: channelId}, Meteor.bindEnvironment((err, data)=> {
        if (err) {
            return future.return(err);
        }

        future.return(true);
    }));

    return future.wait();
};

Meteor.methods({
    'chat.channel.create': function () {
        return channelCreate(this.userId);
    },
    'chat.channel.archive': function (channelId) {
        check(channelId, String);

        return channelArchive(channelId);
    },
    'chat.message.send': function (text) {
        check(text, String);

        //check if chat is there
        let chat = Chat.findOne({userId: this.userId});
        let channelId = null;

        if (_.isUndefined(chat)) {
            //create chat
            let channel = channelCreate(this.userId);
            channelId = channel.channelId;
        } else {
            channelId = chat.channelId;
        }

        var future = new Future();

        slack.chat.postMessage({token, channel: channelId, text}, Meteor.bindEnvironment((err, data)=> {
            if (err) {
                return future.return(err);
            }

            future.return(true);
        }));

        return future.wait();
    },
    'chat.cleanup': function () {
        let chats = Chat.find().fetch();
        chats.map((chat) => {
            return channelArchive(chat.channelId);
        });
    }
});

Meteor.publish('user.chat', function () {
    if (this.userId) {
        //return Chat.find({userId: this.userId}, {fields: {messages: {$slice: -30}}});
        return Chat.find({userId: this.userId});
    } else {
        this.ready();
    }
});
