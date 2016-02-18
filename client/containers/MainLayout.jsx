MainLayout = class MainLayout extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <div className="main container">
                    {this.props.content}
                </div>
            </div>
        )
    }
};
