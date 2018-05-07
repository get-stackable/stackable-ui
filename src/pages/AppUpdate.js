import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
// import alertify from 'alertify.js';
import { Mutation, Query } from 'react-apollo';

// import Loading from '../components/core/Loading';
import AppForm from '../components/app/form/AppForm';
import AppUpdateUsers from '../components/app/AppUpdateUsers';
import AppManageKeys from '../components/app/AppManageKeys';
import AppCloneModal from '../components/app/AppCloneModal';
import AppDeleteModal from '../components/app/AppDeleteModal';
import Layout from '../components/core/Layout';

const updateApplicationMutation = gql`
  mutation updateApplication($id: ID!, $name: String!, $description: String) {
    updateApplication(
      id: $id
      input: { name: $name, description: $description }
    ) {
      id
      name
    }
  }
`;

const applicationQuery = gql`
  query($id: ID!) {
    application(id: $id) {
      id
      name
      description
      publicKey
      privateKey
    }
  }
`;

const UpdateApplication = ({ app }) => (
  <Mutation mutation={updateApplicationMutation}>
    {(updateApplication, { loading, error }) => (
      <React.Fragment>
        <AppForm
          type="update"
          app={app}
          submit={input => {
            updateApplication({
              variables: {
                id: app.id,
                ...input,
              },
            });
          }}
        />
      </React.Fragment>
    )}
  </Mutation>
);
class AppUpdate extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { match } = this.props;

    return (
      <Layout>
        <Query query={applicationQuery} variables={{ id: match.params.id }}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :</p>;

            return (
              <div className="ui grid full-height" style={{ marginLeft: '0' }}>
                <div className="two wide column side-sub-menu">
                  <div className="ui left vertical menu">
                    <h3 className="ui header item">Edit Stack</h3>
                    <a className="ui orange button item">Stack Tools</a>
                    <a className="ui button item">Clone Stack</a>
                    <a className="ui button item">Delete Stack</a>
                    <div className="item" style={{ textAlign: 'center' }}>
                      <small>With great power comes great responsibility</small>
                    </div>
                  </div>
                </div>
                <div
                  className="fourteen wide column"
                  style={{ paddingLeft: '0' }}
                >
                  <div
                    className="content-wrapper"
                    style={{ padding: '25px 35px !important' }}
                  >
                    <div
                      className="ui pointing secondary menu"
                      id="app-update-tabs"
                    >
                      <div className="item active" data-tab="app-info">
                        Stack Information
                      </div>
                      <div className="item " data-tab="app-users">
                        Manage Users
                      </div>
                      <div className="item" data-tab="app-keys">
                        Manage Keys
                      </div>
                      <div className="item" data-tab="app-backup">
                        Backup
                      </div>
                    </div>

                    <div className="ui tab active" data-tab="app-info">
                      <UpdateApplication app={data.application} />
                    </div>

                    <div className="ui tab " data-tab="app-users">
                      <AppUpdateUsers appId={match.params.id} />
                    </div>
                    <div className="ui tab " data-tab="app-keys">
                      <AppManageKeys app={data.application} />
                    </div>
                    <div className="ui tab" data-tab="app-backup">
                      <div className="ui segment">
                        <p>Comming soon!</p>
                      </div>
                    </div>
                    <AppCloneModal appId={match.params.id} />
                    <AppDeleteModal appId={match.params.id} />
                  </div>
                </div>
              </div>
            );
          }}
        </Query>
      </Layout>
    );
  }
}

export default AppUpdate;

AppUpdate.propTypes = {
  match: PropTypes.shape({
    appId: PropTypes.string,
    application: PropTypes.object,
  }).isRequired,
};
