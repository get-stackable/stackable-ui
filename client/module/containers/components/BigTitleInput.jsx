BigTitleInput = class BigTitleInput extends React.Component {
    static propTypes = {
        onChange: React.PropTypes.func.isRequired,
        label: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired
    };

    componentDidMount() {
        ReactDOM.findDOMNode(this.refs[this.props.name]).focus();
        superplaceholder({
            el: document.getElementById(this.props.name),
            sentences: ['type container name here', 'eg: Blog, Cars, Projects'],
            options: {
                letterDelay: 100, // milliseconds
                sentenceDelay: 1000,
                startOnFocus: false,
                loop: true,
                shuffle: false,
                showCursor: true,
                cursor: '|'
            }
        });
    }

    render() {
        return (
            <div className="inline fields">
                <div className="sixteen wide field">
                    <input
                        {...this.props}
                        type="text"
                        id={this.props.name}
                        ref={this.props.name}
                        placeholder={this.props.label}
                        onChange={this.props.onChange}
                        style={{'width': '70%', 'fontSize': '2.5em', 'padding': '0em', 'border': '0'}}
                    />
                </div>
            </div>
        )
    }
};
