HomePage = class HomePage extends React.Component {
    render() {
        return (
            <div>
                <a href={FlowRouter.path('contentTypeCreate')}>Create content type</a>
            </div>
        )
    }
};
