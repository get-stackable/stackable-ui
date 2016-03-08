AppView = class AppView extends React.Component {
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
                image: '/images/icon-container.png',
                buttonText: '+ create new item',
                buttonUrl: ''
            }]
        };
    }

    getMeteorData() {
        return {
            app: Application.findOne(this.props.id)
        };
    }

    render() {
        if (_.isUndefined(this.data.app)) {
            return <Loading active={true} />
        }

        return (
            <div>
                <PageHeading>
                    {this.data.app.name}'s Dashboard
                </PageHeading>
                <div className="ui grid padding35">
                    <div className="ten wide centered column">
                        <div className="ui items">
                            {this.state.steps.map((item) => {
                               return (
                                   <div className="item">
                                       <div className="ui small image">
                                           <img src="/images/wireframe/image.png" />
                                       </div>
                                       <div className="middle aligned content">
                                           <div className="header">
                                               {item.title}
                                           </div>
                                           <div className="description">
                                               <p>{item.description}</p>
                                           </div>
                                           <div className="extra">
                                               <div className="ui right floated button">
                                                   {item.buttonText}
                                               </div>
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

reactMixin(AppView.prototype, ReactMeteorData);
