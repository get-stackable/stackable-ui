import React from 'react';

import Layout from '../components/core/Layout';
import ProfileForm from '../components/core/ProfileForm';

class Settings extends React.Component {
  // componentDidMount() {
  //   $('#settings-tabs .item').tab();
  //   Session.set('active.app', {});
  // }

  render() {
    // if (this.data.loading) {
    //   return <Loading active />;
    // }
    const { location } = this.props;
    return (
      <Layout url={location.pathname}>
        <div className="ui grid full-height" style={{ marginLeft: '0' }}>
          <div className="two wide column side-sub-menu">
            <div className="ui left vertical menu">
              <h3 className="ui header item">Settings</h3>
              <a className="ui orange button item" href="#">
                Tools
              </a>
              <div className="item" />
            </div>
          </div>
          <div className="fourteen wide column" style={{ paddingLeft: '0' }}>
            <div className="content-wrapper" style={{ padding: '25px 35px ' }}>
              <div className="ui pointing secondary menu" id="settings-tabs">
                <div className="item active" data-tab="profile">
                  Profile
                </div>
              </div>
              <div className="ui tab active" data-tab="profile">
                <ProfileForm />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default Settings;
