Header = class Header extends React.Component {
    renderOld() {
        return (
            <div>
                <a href={FlowRouter.path('home')}>Home</a>
                <AccountsUIWrapper />
                <SearchForm />
            </div>
        )
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
                    <div className="ui simple dropdown right item">
                        Switch Apps <i className="dropdown icon"></i>
                        <div className="menu">
                            <a className="item" href="#">www.appfuel.co.uk</a>
                            <a className="item" href="#">www.midtube.com</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};
