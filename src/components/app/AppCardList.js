import React from 'react';
// import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';

const applicationsQuery = gql`
  {
    allApplications {
      id
      name
      privateKey
    }
  }
`;

const allContainersQuery = gql`
  query allContainers($appId: ID!) {
    allContainers(appId: $appId) {
      id
    }
  }
`;

const AppName = ({ app }) => (
  <Query query={allContainersQuery} variables={{ appId: app.id }}>
    {({ loading, error, data }) => {
      if (loading) return <div className="ui active loader" />;
      if (error) return `Error! ${error.message}`;

      const containersLength = data.allContainers.length;
      return (
        <Link
          to={{
            pathname:
              containersLength === 0
                ? `stack/${app.id}`
                : `stack/${app.id}/containers`,
          }}
          className="header"
        >
          {app.name}
        </Link>
      );
    }}
  </Query>
);

const CardLoading = () => (
  <div className="card">
    <div className="content" style={{ textAlign: 'center' }}>
      <div className="header" style={{ margin: '10px 0' }}>
        <div className="ui active loader" />
      </div>
    </div>
  </div>
);

const CardError = ({ error }) => (
  <div className="card">
    <div className="content" style={{ textAlign: 'center' }}>
      <div className="header" style={{ margin: '10px 0' }}>
        <div className="ui error message">{error.message}</div>
      </div>
    </div>
  </div>
);

class AppCardList extends React.Component {
  render() {
    return (
      <Query query={applicationsQuery}>
        {({ loading, error, data }) => {
          if (loading) return <CardLoading />;
          if (error) return <CardError error={error} />;
          const applications = data.allApplications;

          return (
            <React.Fragment>
              {applications.map(app => (
                <div className="app  card" key={app.id}>
                  <div className="ui grid">
                    <div className="three wide column">
                      <div className="ui list">
                        <a className="item">
                          <img
                            src="/images/logo.png"
                            style={{ width: '30px', height: 'auto' }}
                            alt="logo"
                          />
                        </a>
                        <a className="item">
                          <img src="/images/grey-item.png" alt="grey-item" />
                        </a>
                        <a className="item">
                          <img
                            src="/images/grey-container.png"
                            alt="grey-container"
                          />
                        </a>
                      </div>
                    </div>
                    <div className="thirteen wide column">
                      <div className="content">
                        {/* TODO: if container is empty redirect to stack/id else redirect to containers/id */}
                        <AppName app={app} />
                        <div className="meta">Public Key: {app.privateKey}</div>
                      </div>
                      <div className="extra content">
                        <a
                          href={`stack/${app.id}/manage`}
                          className="tiny ui basic button"
                        >
                          <i className="icon setting" />
                          settings
                        </a>
                        <a className="tiny ui basic button" target="_blank">
                          <i className="icon share" />
                          api url
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          );
        }}
      </Query>
    );
  }
}

export default AppCardList;
