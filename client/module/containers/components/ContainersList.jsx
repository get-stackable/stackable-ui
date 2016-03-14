ContainersList = class ContainersList extends React.Component {
    static propTypes = {
        containers: React.PropTypes.array.isRequired,
        app: React.PropTypes.object.isRequired
    };

    render() {
        if (this.props.containers.length === 0) {
            return (
                <div className="ui segment">
                    <p>No containers found.</p>
                </div>
            )
        }

        return (
            <table className="ui celled table" style={{'marginTop': '15px'}}>
                <thead>
                <tr>
                    <th width="50%">Container Name</th>
                    <th width="20%">Api URL</th>
                    <th width="30%">Actions</th>
                </tr>
                </thead>
                <tbody>
                {this.props.containers.map((container) => {
                    return (
                        <tr key={container._id}>
                            <td>
                                <a href={FlowRouter.path('containerUpdate', {id: container._id})}>{container.name}</a>
                            </td>
                            <td>
                                <a href={StackableApi.getContainerItems(this.props.app.publicKey, container._id)} target="_blank" title="Get container items API URL">
                                    <i className="share icon"></i>
                                </a>
                            </td>
                            <td>
                                <a
                                    className="mini ui button"
                                    href={FlowRouter.path('itemsList', {appId: this.props.app._id}, {containerId: container._id})}>
                                    view all container items
                                </a>
                                <a
                                    className="mini secondary ui button"
                                    href={FlowRouter.path('containerUpdate', {id: container._id})}>
                                    modify
                                </a>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        )
    }
};
