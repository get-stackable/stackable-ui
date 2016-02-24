BlankLayout = class BlankLayout extends React.Component {
    render() {
        return (
            <div className="ui middle aligned center aligned grid blank-layout">
                <div className="column">
                    {this.props.content}
                </div>
            </div>
        )
    }
};
