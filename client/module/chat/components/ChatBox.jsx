ChatBox = class ChatBox extends React.Component {
    getMeteorData() {
        let handle = Meteor.subscribe('user.chat');

        return {
            loading: ! handle.ready(),
            chat: Chat.findOne()
        };
    }

    constructor(props) {
        super(props);

        this.state = {
            text: '',
            isVisible: false
        };
    }

    handleKeyPress = (e) => {
        console.log('key', e.key);
        if (e.key === 'Enter') {
            this.handleSubmit()
        }
    };

    handleSubmit = () => {
        if (this.state.text.length === 0) {
            return;
        }

        if (_.isUndefined(this.data.chat)) {
            Meteor.call('chat.channel.create', (err, res) => {
                console.log(err, res);
                Meteor.call('chat.message.send', this.state.text, (err, res) => {
                    this.setState({
                        text: ''
                    });
                });
            });
        } else {
            Meteor.call('chat.message.send', this.state.text, (err, res) => {
                this.setState({
                    text: ''
                });
            });
        }
    };

    scrollBottom() {
        if ($('#last-chat').length !== 0) {
            setTimeout(() => {
                $('.chat-box .ui.comments').stop().animate({
                    scrollTop: $('#last-chat').offset().top
                }, 1000);
            }, 800);
        }
    }

    render() {
        if (this.data.loading) {
            return <Loading active={true} />
        }

        return (
            <div className="chat-box">
                <label onClick={() => this.setState({isVisible: !this.state.isVisible})}>
                    {this.state.isVisible ? 'Close chat' : 'Need help?'}
                </label>
                <div className={classNames('ui comments', {'hidden': !this.state.isVisible})}>
                    {!_.isUndefined(this.data.chat) ?
                        this.data.chat.messages.map((message, index) => {
                            return (
                                <div className="comment" key={index}>
                                    <div className="content">
                                        <a className="author">
                                            {message.sentBy}
                                        </a>
                                        <div className="metadata">
                                    <span className="date">
                                        {moment(message.date).fromNow()}
                                    </span>
                                        </div>
                                        <div className="text">
                                            {message.text}
                                        </div>
                                    </div>
                                </div>
                            )
                        }) : ''}
                    <div id="last-chat"></div>
                    {this.scrollBottom()}
                </div>
                <div className={classNames('ui action input', {'hidden': !this.state.isVisible})}>
                    <input
                        type="text"
                        placeholder="type message..."
                        value={this.state.text}
                        onChange={(e) => this.setState({text: e.target.value})}
                        onKeyPress={this.handleKeyPress}/>
                    <button className="ui blue icon button" onClick={this.handleSubmit}>
                        <i className="send icon"></i>
                    </button>
                </div>
            </div>
        )
    }
};

reactMixin(ChatBox.prototype, ReactMeteorData);
