Header = class Header extends React.Component {
    getMeteorData() {
        return {
            apps: Application.find().fetch(),
            user: Meteor.user(),
            activeApp: Session.get('active.app'),
            currentRoute: FlowRouter.current().route.name
        };
    }

    renderApps() {
        if (this.data.apps.length === 0) {
            return;
        }

        return this.data.apps.map((app) => {
            return (
                <a className="item"
                   key={app._id}
                   href={FlowRouter.path('appManage', {id: app._id})}>
                    <i className="caret right icon"></i> {app.name}
                </a>
            )
        });
    }

    showRoute() {
        if (this.data.currentRoute === 'containersList' || this.data.currentRoute === 'itemsList') {
            return false;
        }

        return true;
    }

    render() {
        return (
            <div className="ui fixed inverted top menu">
                <div className="ui fluid container">
                    <a href={FlowRouter.path('home')} className="header item">
                        <img className="logo" src="/images/logo.png" />
                        {Meteor.App.NAME}
                        <div className="sub header">{Meteor.App.DESCRIPTION}</div>
                    </a>
                    {this.showRoute() ?
                    <div className="item">
                        <SearchForm />
                    </div>:''}
                    <div className="item">
                        <p className="active-site">
                            {!_.isUndefined(this.data.activeApp) ? this.data.activeApp.name : ''}
                        </p>
                    </div>
                    <div className="right item">
                        <a onClick={() => AccountsTemplates.logout()}>
                            <i className="sign out icon"></i>
                            logout
                        </a>
                    </div>
                    <div className="ui simple dropdown right item" style={{'marginLeft': '30px !important'}}>
                        Switch Stacks <i className="dropdown icon"></i>
                        <div className="menu">
                            {this.renderApps()}
                            <a className="item" href={FlowRouter.path('appCreate')}>
                                <i className="plus icon"></i> new stack
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

reactMixin(Header.prototype, ReactMeteorData);
