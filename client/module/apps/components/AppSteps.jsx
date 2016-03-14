AppSteps = class AppSteps extends React.Component {
    static propTypes = {
        app: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            itemStepDisabled: true
        }
    }

    render() {
        return (
            <div>
                <PageHeading>
                    Well Done!
                </PageHeading>
                <div className="ui grid padding35 app view">
                    <div className="ten wide centered column">
                        <div className="ui items">
                            <div className="item">
                                <div className="ui small image">
                                    <img src="/images/icon-container.png" />
                                </div>
                                <div className="middle aligned content">
                                    <div className="header">
                                        Create your first container
                                    </div>
                                    <div className="description">
                                        <p>Containers hold your items, tell us what kind of items you want to store by creating your container</p>
                                    </div>
                                </div>
                                <div className="extra">
                                    <button
                                        className="ui right floated green button"
                                        onClick={() => FlowRouter.go('containerCreate', {appId: this.props.app._id})}>
                                        + create new container
                                    </button>
                                </div>
                            </div>
                            <div className={classNames('item', {'disabled': this.state.itemStepDisabled})}>
                                <div className="ui small image">
                                    <img src="/images/icon-items.png" />
                                </div>
                                <div className="middle aligned content">
                                    <div className="header">
                                        Add items to your container
                                    </div>
                                    <div className="description">
                                        <p>These might be blog posts, products or data driving your mobile app</p>
                                    </div>
                                </div>
                                <div className="extra">
                                    <div className="ui right floated green button">
                                        + create new item
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};
