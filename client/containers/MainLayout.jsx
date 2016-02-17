MainLayout = class MainLayout extends React.Component {
    render() {
        return (
            <div>
                <div>
                  <a href={FlowRouter.path('home')}>Home</a>
                </div>
                {this.props.content}
            </div>
        )
    }
};
