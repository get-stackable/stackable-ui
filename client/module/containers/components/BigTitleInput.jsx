BigTitleInput = class BigTitleInput extends React.Component {
    static propTypes = {
        onChange: React.PropTypes.func.isRequired,
        label: React.PropTypes.string.isRequired
    };

    render() {
        return (
            <div className="inline fields">
                <div className="sixteen wide field">
                    <input
                        {...this.props}
                        type="text"
                        label={this.props.label}
                        onChange={this.props.onChange}
                        style={{'width': '70%', 'fontSize': '2.5em', 'padding': '0em', 'border': '0'}}
                    />
                    <label style={{'fontWeight': '400', 'fontSize': '0.8em'}}>{this.props.label}</label>
                </div>
            </div>
        )
    }
};
