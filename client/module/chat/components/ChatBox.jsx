ChatBoxInner = class ChatBoxInner extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: '',
            isVisible: false,
            hasNew: false,
            sendDisabled: false
        };
    }

    componentDidUpdate() {
        if (this.state.hasNew && this.state.isVisible) {
            this.setState({
                hasNew: false
            });
        }

        if (this.state.isVisible) {
            this.scrollBottom();
        }

        if (!_.isUndefined(this.props.chat)) {
            let currentTime = new Date();
            let lastMsg = _.last(this.props.chat.messages);

            if (moment(lastMsg.date).isSameOrAfter(currentTime, 'second')) {
                if (!this.state.isVisible) {
                    this.setState({
                        hasNew: true
                    });
                }
            }
        }
    }

    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.handleSubmit()
        }
    };

    handleSubmit = () => {
        if (this.state.text.length === 0 || this.state.sendDisabled) {
            return;
        }

        this.setState({
            sendDisabled: true
        });
        Meteor.call('chat.message.send', this.state.text, (err, res) => {
            this.setState({
                text: ''
            });
            Meteor.setTimeout(() => {
                this.setState({
                    sendDisabled: false
                });
            }, 1000)
        });
    };

    scrollBottom() {
        setTimeout(() => {
            $('.chat-box .ui.comments').animate({
                scrollTop: $('.chat-box .ui.comments')[0].scrollHeight
            }, 500);
        }, 600);
    }

    render() {
        return (
            <div className="chat-box">
                <label onClick={() => this.setState({isVisible: !this.state.isVisible})}>
                    {this.state.isVisible ?
                        <i className="angle down icon" />
                        :
                        <i className={classNames({'circle icon animated infinite flash red': this.state.hasNew, 'comment icon': !this.state.hasNew})}/>
                    }
                    {this.state.isVisible ? 'close chat' : this.state.hasNew ? 'new message!' : 'need help?'}
                </label>
                <div className={classNames('ui comments', {'hidden': !this.state.isVisible})}>
                    {!_.isUndefined(this.props.chat) ?
                        this.props.chat.messages.map((message, index) => {
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
                        }) :
                        <div className="ui message">
                            <div className="content">
                                <div className="header">
                                    Need support using slackable?
                                </div>
                                <p>Feel free to type your message below to get support.</p>
                            </div>
                        </div>
                    }
                </div>
                <div className={classNames('ui action input', {'hidden': !this.state.isVisible})}>
                    <input
                        type="text"
                        placeholder="type message..."
                        value={this.state.text}
                        onChange={(e) => this.setState({text: e.target.value})}
                        onKeyPress={this.handleKeyPress}/>
                    <button
                        className={classNames('ui icon button', {'blue': !this.state.sendDisabled, 'grey': this.state.sendDisabled})}
                        onClick={this.handleSubmit}>
                        <i className="send icon" />
                    </button>
                </div>
            </div>
        )
    }
};

ChatBox = class ChatBox extends React.Component {
    getMeteorData() {
        let handle = Meteor.subscribe('user.chat');

        return {
            loading: ! handle.ready(),
            chat: Chat.findOne()
        };
    }

    render() {
        if (this.data.loading) {
            return <Loading active={true} />
        }

        return <ChatBoxInner chat={this.data.chat} />
    }
};

reactMixin(ChatBox.prototype, ReactMeteorData);
