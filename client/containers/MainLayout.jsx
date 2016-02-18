MainLayout = class MainLayout extends React.Component {
    render() {
        return (
            <div className="ui container">
                <Header />
                {this.props.content}
            </div>
        )
    }
};
