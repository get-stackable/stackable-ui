BooleanInput = class BooleanInput extends React.Component {
    static propTypes = {
        onChange: React.PropTypes.func.isRequired
    };

    render() {
        return (
            <div className="inline fields">
                <div className="field">
                    <div className="ui radio checkbox">
                        <input
                            {...this.props}
                            type="radio"
                            value="true"
                            defaultChecked={this.props.value == 'true'} />
                        <label>Yes</label>
                    </div>
                </div>
                <div className="field">
                    <div className="ui radio checkbox">
                        <input
                            {...this.props}
                            type="radio"
                            value="false"
                            defaultChecked={this.props.value == 'false'}/>
                        <label>No</label>
                    </div>
                </div>
            </div>
        )
    }
};
