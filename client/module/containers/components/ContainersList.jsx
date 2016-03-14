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

        //return (
        //    <table className="ui celled table" style={{'marginTop': '15px'}}>
        //        <thead>
        //        <tr>
        //            <th width="50%">Container Name</th>
        //            <th width="20%">Api URL</th>
        //            <th width="30%">Actions</th>
        //        </tr>
        //        </thead>
        //        <tbody>
        //        {this.props.containers.map((container) => {
        //            return (
        //                <tr key={container._id}>
        //                    <td>
        //                        <a href={FlowRouter.path('containerUpdate', {id: container._id})}>{container.name}</a>
        //                    </td>
        //                    <td>
        //                        <a href={StackableApi.getContainerItems(this.props.app.publicKey, container._id)} target="_blank" title="Get container items API URL">
        //                            <i className="share icon"></i>
        //                        </a>
        //                    </td>
        //                    <td>
        //                        <a
        //                            className="mini ui button"
        //                            href={FlowRouter.path('itemsList', {appId: this.props.app._id}, {containerId: container._id})}>
        //                            view all container items
        //                        </a>
        //                        <a
        //                            className="mini secondary ui button"
        //                            href={FlowRouter.path('containerUpdate', {id: container._id})}>
        //                            modify
        //                        </a>
        //                    </td>
        //                </tr>
        //            )
        //        })}
        //        </tbody>
        //    </table>
        //)
    }
};
