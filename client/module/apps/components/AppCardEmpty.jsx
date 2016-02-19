AppCardEmpty = class AppCardEmpty extends React.Component {
    render() {
        return (
            <div className="card">
                <div className="content" style={{textAlign: 'center'}}>
                    <div className="header" style={{'margin': '10px 0'}}>
                        <img src="/images/grey-stack.png" />
                        <br />
                        empty :(
                    </div>
                    <a
                        className="meta"
                        href={FlowRouter.path('appCreate')}
                        style={{textDecoration: 'underline'}}>
                        + create new app
                    </a>
                </div>
            </div>
        )
    }
};
