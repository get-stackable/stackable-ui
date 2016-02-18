JsonInput = class JsonInput extends React.Component {
    static propTypes = {
        onChange: React.PropTypes.func.isRequired
    };

    render() {
        return (
            <textarea
                {...this.props}
                rows="5"
                onChange={this.props.onChange}
            ></textarea>
        )
    }
};
