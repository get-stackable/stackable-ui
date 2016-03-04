EnomInput = class EnomInput extends React.Component {
    static defaultProps = {
        options: ''
    };

    static propTypes = {
        onChange: React.PropTypes.func.isRequired,
        options: React.PropTypes.string.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            options: this.createStringToArray(props.options)
        };
    }

    createStringToArray(options) {
        let array = options.split(',');
        return array.map((item) => {
            return item.trim()
        });
    }

    render() {
        return (
            <select
                {...this.props}
                className="ui fluid normal dropdown"
                onChange={this.props.onChange}>
                <option>-- select option --</option>
                {this.state.options.map((item, index) => {
                    return <option key={index} value={item}>{titleize(item)}</option>
                })}
            </select>
        )
    }
};
