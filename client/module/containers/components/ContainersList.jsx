ContainersList = class ContainersList extends React.Component {
    static propTypes = {
        containers: React.PropTypes.array.isRequired,
        app: React.PropTypes.object.isRequired
    };

    render() {
        if (this.props.containers.length === 0) {
            return FlowRouter.go('appView', {id: this.props.app._id});
        }

        return (
            <div className="ui cards">
                {this.props.containers.map((container) => {
                    return (
                        <div className="card" key={container._id}>
                            <div className="content">
                                <i
                                    className="right floated settings icon"
                                    onClick={() => FlowRouter.go('containerUpdate', {id: container._id})}></i>
                                <div className="header">
                                    {container.name}
                                </div>
                                {/*<div className="meta">
                                    0 items
                                </div>*/}
                            </div>
                            <div className="extra content">
                                <div className="ui two buttons">
                                    <a
                                        className="ui basic green button"
                                        href={FlowRouter.path('itemsList', {appId: this.props.app._id}, {containerId: container._id})}>
                                        List Items
                                    </a>
                                    <a
                                        className="ui basic grey button"
                                        href={FlowRouter.path('itemCreate', {containerId: container._id})}>
                                        Add Items
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
