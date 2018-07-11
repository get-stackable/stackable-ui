import React from 'react';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import config from '../../utils/config';
import SearchForm from './SearchForm';

const applicationsQuery = gql`
  {
    allApplications {
      id
      name
      privateKey
    }
  }
`;

class Header extends React.Component {
  // getMeteorData() {
  //     return {
  //         apps: Application.find().fetch(),
  //         user: Meteor.user(),
  //         activeApp: Session.get('active.app'),
  //         currentRoute: FlowRouter.current().route.name
  //     };
  // }

  showCreateModal() {
    // Session.set('app.create.modal', true);
  }

  showSearch() {
    if (
      this.data.currentRoute === 'containersList' ||
      this.data.currentRoute === 'itemsList'
    ) {
      return false;
    }

    return true;
  }

  logout() {
    // AccountsTemplates.logout();
    // Meteor.setTimeout(() => {
    //     FlowRouter.go('login');
    // }, 500);
  }

  // renderApps() {
  //     if (this.data.apps.length === 0) {
  //         return;
  //     }

  //     const apps = this.data.apps.map((app) => (
  //       <a
  //         className="item"
  //         key={app._id}
  //         href={FlowRouter.path('containersList', {appId: app._id})}
  //       >
  //         <i className="caret right icon" /> {app.name}
  //       </a>
  //     ));

  //     return apps;
  // }

  render() {
    return (
      <div className="ui fixed inverted top menu">
        <div className="ui fluid container">
          <Link to="/dashboard" className="header item">
            <img className="logo" src="/images/logo.png" alt="stackable logo" />
            {config.siteName}
            <div className="sub header">{config.siteDescription}</div>
          </Link>

          <div className="item">
            <SearchForm />
          </div>
          <div className="item">
            <p className="active-site" />
          </div>
          <div className="right item">
            <a onClick={() => this.logout()}>
              <i className="sign out icon" />
              logout
            </a>
          </div>
          <Query query={applicationsQuery}>
            {({ loading, error, data }) => {
              if (loading) return 'Loading...';

              return (
                <div
                  className="ui simple dropdown right item"
                  style={{ marginLeft: '30px !important' }}
                >
                  Switch Stacks <i className="dropdown icon" />
                  <div className="menu">
                    {error ? (
                      <div className="ui error message">
                        <div className="header">{error.message}</div>
                      </div>
                    ) : (
                      <React.Fragment>
                        {data.allApplications.map(app => (
                          <a
                            className="item"
                            // TODO: onClick url and Show model
                            key={app.id}
                          >
                            <i className="caret right icon" />
                            {app.name}
                          </a>
                        ))}
                      </React.Fragment>
                    )}
                    <a className="item" onClick={this.showCreateModal}>
                      <i className="plus icon" /> new stack
                      {/*   TODO: onClick url and Show model */}
                    </a>
                  </div>
                </div>
              );
            }}
          </Query>
        </div>
      </div>
    );
  }
}

export default Header;
