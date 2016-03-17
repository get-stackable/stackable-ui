MainLayout = class MainLayout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isDesktop: true
        };
    }

    handleResize = (e) => {
        this.checkDesktop();
    };

    checkDesktop() {
        if (window.innerWidth < 1200) {
            this.setState({isDesktop: false});
        } else {
            this.setState({isDesktop: true});
        }
    }

    componentDidMount() {
        Session.setDefault('active.app', {});
        Session.setDefault('app.modal', false);
        Session.setDefault('app.create.modal', false);

        window.addEventListener('resize', this.handleResize);
        this.checkDesktop();
    }

    render() {
        return (
            <div className="full-height">
                <Header />
                <div className="main container">
                    <div className="ui grid full-height">
                        <div className={classNames('column sidebar', {'one wide': this.state.isDesktop, 'two wide': !this.state.isDesktop})}>
                            <Sidebar />
                        </div>
                        <div className={classNames('column main-right-container', {'fifteen wide': this.state.isDesktop, 'fourteen wide': !this.state.isDesktop})}>
                            {this.props.content}
                        </div>
                    </div>
                </div>
                <ChatBox />
                <CreateAppModal />
            </div>
        )
    }
};
