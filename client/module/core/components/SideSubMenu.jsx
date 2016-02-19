SideSubMenu = class SideSubMenu extends React.Component {
    static propTypes = {
        heading: React.PropTypes.string.isRequired,
        buttonText: React.PropTypes.string,
        buttonLink: React.PropTypes.string
    };

    render() {
        return (
            <div className="ui left vertical menu">
                <h3 className="ui header item">
                    {this.props.heading}
                </h3>
                <a className="ui orange button item" href={this.props.buttonLink}>
                    {this.props.buttonText}
                </a>
                <div className="item"></div>
            </div>
        )
    }
};
