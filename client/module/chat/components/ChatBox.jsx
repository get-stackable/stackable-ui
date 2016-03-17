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
            text: ''
        };
    }

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

    render() {
        if (this.data.loading) {
            return <Loading active={true} />
        }

        return (
            <div className="chat-box" style={{width: '300px', height: '300px', border: '1px solid grey', overflow: 'scroll', position: 'absolute', bottom: '0' ,right: '0', 'background': 'white', 'padding': '11px'}}>
                <div className="ui comments">
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

                    <div className="ui reply form">
                        <div className="field">
                        <textarea
                            rows="2"
                            style={{height: '4em'}}
                            value={this.state.text}
                            onChange={(e) => this.setState({text: e.target.value})}/>
                        </div>
                        <div className="ui blue labeled submit icon button" onClick={this.handleSubmit}>
                            <i className="icon edit"></i> Send
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

reactMixin(ChatBox.prototype, ReactMeteorData);
