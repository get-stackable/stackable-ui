import React from 'react';
// import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const applicationsQuery = gql`
  {
    allApplications {
      id
      name
      privateKey
    }
  }
`;

class AppCard extends React.Component {
  render() {
    return (
      <Query query={applicationsQuery}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :</p>;
          const applications = data.allApplications;
          return (
            <React.Fragment>
              {applications.map(app => (
                <div className="app card" key={app.id}>
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
                        <a className="header">{app.name}</a>
                        <div className="meta">
                          Public Key: {app.privateKey}{' '}
                        </div>
                      </div>
                      <div className="extra content">
                        <a className="tiny ui basic button">
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

export default AppCard;
