TextInput = class TextInput extends React.Component {
    static propTypes = {
        onChange: React.PropTypes.func.isRequired
    };

    render() {
        return (
            <input
                {...this.props}
                className="item-field"
                type="text"
                onChange={this.props.onChange}
            />
        )
    }
};
