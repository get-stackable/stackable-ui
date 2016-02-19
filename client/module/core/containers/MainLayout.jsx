MainLayout = class MainLayout extends React.Component {
    componentDidMount() {
        Session.setDefault('active.app', {});
        Session.setDefault('app.modal', false);
    }

    render() {
        return (
            <div className="full-height">
                <Header />
                <div className="main container">
                    <div className="ui grid full-height">
                        <div className="one wide column sidebar">
                            <Sidebar />
                        </div>
                        <div className="fifteen wide column main-right-container">
                            {this.props.content}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};
