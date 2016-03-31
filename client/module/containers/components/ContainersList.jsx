ContainersList = class ContainersList extends React.Component {
    static propTypes = {
        containers: React.PropTypes.array.isRequired,
        app: React.PropTypes.object.isRequired
    };

    componentDidMount() {
        if (this.props.containers.length === 0) {
            FlowRouter.go('appView', {id: this.props.app._id});
        }
    }

    render() {
        return (
            <div className="ui cards">
                {this.props.containers.map((container) => {
                    let containerName = container.isSingleItem ? container.name : pluralize(container.name);

                    return (
                        <div className="card" key={container._id}>
                            <div className="content">
                                <div className="header">
                                    {titleize(containerName)}
                                </div>
                            </div>
                            <div className="extra content">
                                <div className="ui two buttons">
                                    <a
                                        className="ui basic green button"
                                        href={StackableApi.getContainerItems(this.props.app.publicKey, container._id)}
                                        target="_blank"
                                        title="Get container items API URL"
                                        style={{'fontSize': '0.77rem', 'padding': '10px 5px'}}>
                                        <i className="share icon" />
                                        API URL
                                    </a>
                                    <a
                                        href={FlowRouter.path('containerUpdate', {id: container._id})}
                                        className="ui basic red button"
                                        style={{'fontSize': '0.77rem', 'padding': '10px 5px'}}>
                                        <i className="settings icon" />
                                        manage container
                                    </a>
                                </div>
                            </div>
                            <a className="ui primary bottom attached button" href={FlowRouter.path('itemContainerView', {containerId: container._id})}>
                                <i className="add icon" />
                                {container.isSingleItem ? <span>manage {pluralize(containerName.toLowerCase(), 1)} item</span> : <span>add & manage {pluralize(containerName.toLowerCase(), 1)} items</span>}
                            </a>
                        </div>
                    )
                })}
            </div>
        )
    }
};
