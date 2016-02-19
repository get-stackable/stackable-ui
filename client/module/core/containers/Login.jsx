Login = class Login extends React.Component {
    render() {
        return (
            <div className="ui grid container">
                <div className="column">
                    <div className="content-edit-profile-block">
                        <div className="top-row">
                            <h2 className="ui dark blue huge header">Login</h2>
                        </div>
                        <div className="content-row">
                            <UserAccountsWrapper />
                            <div className="ui segment" style={{'textAlign': 'right', 'width': '97%', 'margin': '10px auto'}}>
                                <p>Forgot password? <a href="/forget-password">click here</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};
