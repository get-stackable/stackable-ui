Loading = React.createClass({
    propTypes: {
        active: React.PropTypes.bool.isRequired
    },

    render() {
        return (
            <div className={classNames('ui inverted dimmer', {active: this.props.active})}>
                <div className="ui medium loader"></div>
            </div>
        )
    }
});
