AppSteps = class AppSteps extends React.Component {
    static propTypes = {
        app: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            steps: [{
                title: 'Create your first container',
                description: 'Containers hold your items, tell us what kind of items you want to store by creating your container',
                image: '/images/icon-container.png',
                buttonText: '+ create new container',
                buttonUrl: ''
            }, {
                title: 'Add items to your container',
                description: 'These might be blog posts, products or data driving your mobile app',
                image: '/images/icon-items.png',
                buttonText: '+ create new item',
                buttonUrl: ''
            }]
        };
    }

    render() {
        return (
            <div>
                <PageHeading>
                    {this.props.app.name}'s Dashboard
                </PageHeading>
                <div className="ui grid padding35 app view">
                    <div className="ten wide centered column">
                        <div className="ui items">
                            {this.state.steps.map((item, index) => {
                                return (
                                    <div className="item" key={index}>
                                        <div className="ui small image">
                                            <img src={item.image} />
                                        </div>
                                        <div className="middle aligned content">
                                            <div className="header">
                                                {item.title}
                                            </div>
                                            <div className="description">
                                                <p>{item.description}</p>
                                            </div>
                                        </div>
                                        <div className="extra">
                                            <div className="ui right floated green button">
                                                {item.buttonText}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};
