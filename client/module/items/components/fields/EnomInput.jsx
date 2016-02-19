EnomInput = class EnomInput extends React.Component {
    static propTypes = {
        onChange: React.PropTypes.func.isRequired
    };

    render() {
        return (
            <select
                {...this.props}
                onChange={this.props.onChange}>
                {this.props.children}
            </select>
        )
    }
};
