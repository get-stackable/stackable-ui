import React from 'react';

export default class Sidebar extends React.Component {
  //   constructor(props) {
  //       super(props);

  //       this.state = {
  //           goTo: 'app'
  //       };
  //   }

  //   getMeteorData() {
  //       return {
  //           activeApp: Session.get('active.app'),
  //           apps: Application.find({}, {sort: {createdAt: -1}}).fetch()
  //       };
  //   }

  render() {
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
        {/* {(!_.isUndefined(this.data.activeApp) && !_.isUndefined(this.data.activeApp.id)) ? */}
        <a className="item" href="/containers">
          <img
            src="/images/icon-container.png"
            className="icon"
            style={{ width: '30px', height: '30px' }}
            alt="container-icon"
          />
          Containers
        </a>

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
