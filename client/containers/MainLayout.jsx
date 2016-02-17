MainLayout = class MainLayout extends React.Component {
    render() {
        return (
            <div className="ui container">
                <div>
                    <a href={FlowRouter.path('home')}>Home</a>
                    <AccountsUIWrapper />
                </div>
                {this.props.content}
            </div>
        )
    }
};
