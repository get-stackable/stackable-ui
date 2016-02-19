BooleanInput = class BooleanInput extends React.Component {
    static propTypes = {
        onChange: React.PropTypes.func.isRequired
    };

    render() {
        return (
            <div>
                <input
                    {...this.props}
                    type="radio"
                    value="true"
                    defaultChecked={this.props.value == 'true'} /> Yes
                <input
                    {...this.props}
                    type="radio"
                    value="false"
                    defaultChecked={this.props.value == 'false'}/> No
            </div>
        )
    }
};
