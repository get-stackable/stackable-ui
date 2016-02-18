Sidebar = class Sidebar extends React.Component {
    render() {
        return (
            <div className="ui left vertical labeled icon menu">
                <a className="item" href={FlowRouter.path('home')}>
                    <img src="/images/icon-dashboard.png" className="icon" style={{'width': '30px', 'height': '30px'}} />
                    Dashboard
                </a>
                <a className="item">
                    <img src="/images/icon-container.png" className="icon" style={{'width': '30px', 'height': '30px'}} />
                    Containers
                </a>
                <a className="item">
                    <img src="/images/icon-items.png" className="icon" style={{'width': '30px', 'height': '32px'}} />
                    Items
                </a>
                <a className="item">
                    <img src="/images/icon-settings.png" className="icon" style={{'width': '30px', 'height': '32px'}} />
                    Settings
                </a>
            </div>
        )
    }
};
