MainLayout = class MainLayout extends React.Component {
    render() {
        return (
            <div>
                <p>this is main layout</p>
                {this.props.content}
            </div>
        )
    }
};
