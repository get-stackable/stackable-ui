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
                    return (
                        <div className="card" key={container._id}>
                            <div className="content">
                                <i
                                    className="right floated settings icon"
                                    onClick={() => FlowRouter.go('containerUpdate', {id: container._id})}></i>
                                <a href={StackableApi.getContainerItems(this.props.app.publicKey, container._id)} target="_blank" title="Get container items API URL">
                                    <i className="right floated share icon"></i>
                                </a>
                                <div className="header">
                                    {titleize(pluralize(container.name))}
                                </div>
                                {/*<div className="meta">
                                    0 items
                                </div>*/}
                            </div>
                            <div className="extra content">
                                <div className="ui two buttons">
                                    <a
                                        className="ui basic green button"
                                        href={FlowRouter.path('itemContainerView', {containerId: container._id})}>
                                        manage {pluralize(container.name.toLowerCase())}
                                    </a>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
};
