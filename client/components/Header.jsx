Header = class Header extends React.Component {
    getMeteorData() {
        return {
            apps: Application.find().fetch(),
            user: Meteor.user(),
            activeApp: Session.get('active.app')
        };
    }

    renderOld() {
        return (
            <div>
                <a href={FlowRouter.path('home')}>Home</a>
                <AccountsUIWrapper />
                <SearchForm />
            </div>
        )
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
                    {app.name}
                </a>
            )
        });
    }

    render() {
        return (
            <div className="ui fixed inverted top menu">
                <div className="ui fluid container">
                    <a href={FlowRouter.path('home')} className="header item">
                        <img className="logo" src="/images/logo.png" />
                        stackable
                        <div className="sub header">API DRIVEN CONTENT</div>
                    </a>
                    <div className="item">
                        <SearchForm />
                    </div>
                    <div className="item">
                        <p className="active-site">
                            {this.data.activeApp}
                        </p>
                    </div>
                    <div className="right item">
                        <a onClick={() => AccountsTemplates.logout()}>
                            <i className="sign out icon"></i>
                            logout
                        </a>
                    </div>
                    <div className="ui simple dropdown right item" style={{'marginLeft': '30px !important'}}>
                        Switch Apps <i className="dropdown icon"></i>
                        <div className="menu">
                            {this.renderApps()}
                            <a className="item" href={FlowRouter.path('appCreate')}>create app</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

reactMixin(Header.prototype, ReactMeteorData);
