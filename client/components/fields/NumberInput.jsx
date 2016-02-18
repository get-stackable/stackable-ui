NumberInput = class NumberInput extends React.Component {
    static propTypes = {
        onChange: React.PropTypes.func.isRequired
    };

    render() {
        return (
            <input
                {...this.props}
                type="number"
                onChange={this.props.onChange}
            />
        )
    }
};
