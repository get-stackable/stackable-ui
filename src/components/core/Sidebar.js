import React from 'react';
import { Link } from 'react-router-dom';

const ContainerIcon = ({ appId }) => (
  <Link className="item" to={{ pathname: `/stack/${appId}/containers` }}>
    <img
      src="/images/icon-container.png"
      className="icon"
      style={{ width: '30px', height: '30px' }}
      alt="container-icon"
    />
    Containers
  </Link>
);

export default class Sidebar extends React.Component {
  renderContainerIcon(url, appId) {
    switch (url) {
      case '/dashboard':
        return '';
      case '/setting':
        return '';
      case `/stack/${appId}`:
        return '';
      case `/stack/${appId}/manage`:
        return '';
      default:
        return <ContainerIcon appId={appId} />;
    }
  }

  render() {
    const { url, appId } = this.props;
    return (
      <div className="ui left vertical labeled icon menu">
        <a className="item" href="/dashboard" style={{ paddingTop: '3em' }}>
          <img
            src="/images/icon-dashboard.png"
            className="icon"
            style={{ width: '30px', height: '30px' }}
            alt="dashboard"
          />
          Dashboard
        </a>
        {this.renderContainerIcon(url, appId)}

        {/* <a className="item" onClick={this.showItems}>
                  <img src="/images/icon-items.png" className="icon" style={{'width': '30px', 'height': '32px'}} />
                  Items
              </a> */}
        <a className="item" href="{FlowRouter.path('settings')}">
          <img
            src="/images/icon-settings.png"
            className="icon"
            style={{ width: '30px', height: '32px' }}
            alt="setting-icon"
          />
          Settings
        </a>
        {/* <AppsModal goTo={this.state.goTo} /> */}
      </div>
    );
  }
}
