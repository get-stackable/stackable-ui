import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import alertify from 'alertify.js';
import { Mutation, Query } from 'react-apollo';
import classNames from 'classnames';

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
  <Mutation
    mutation={updateApplicationMutation}
    onCompleted={() => alertify.success('App Updated Succesfully')}
  >
    {updateApplication => (
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
    this.state = {
      activeTab: 'app-info',
      visibleModel: false,
      visibleCloneModel: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({ visibleModel: false, visibleCloneModel: false });
  }
  render() {
    const { activeTab } = this.state;
    const { match, history } = this.props;

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
                    <a
                      className="ui button item"
                      onClick={() => this.setState({ visibleCloneModel: true })}
                    >
                      Clone Stack
                    </a>
                    <a
                      className="ui button item"
                      onClick={() => this.setState({ visibleModel: true })}
                    >
                      Delete Stack
                    </a>
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
                    style={{ padding: '25px 35px' }}
                  >
                    <div
                      className="ui pointing secondary menu"
                      id="app-update-tabs"
                    >
                      <a
                        className={classNames('item', {
                          active: activeTab === 'app-info',
                        })}
                        onClick={() => this.setState({ activeTab: 'app-info' })}
                        data-tab="app-info"
                      >
                        Stack Information
                      </a>
                      <a
                        className={classNames('item', {
                          active: activeTab === 'app-users',
                        })}
                        onClick={() =>
                          this.setState({ activeTab: 'app-users' })
                        }
                        data-tab="app-info"
                      >
                        Manage Users
                      </a>
                      <a
                        className={classNames('item', {
                          active: activeTab === 'app-keys',
                        })}
                        onClick={() => this.setState({ activeTab: 'app-keys' })}
                        data-tab="app-keys"
                      >
                        Manage Keys
                      </a>
                      <a
                        className={classNames('item', {
                          active: activeTab === 'app-backup',
                        })}
                        onClick={() =>
                          this.setState({ activeTab: 'app-backup' })
                        }
                        data-tab="app-backup"
                      >
                        Backup
                      </a>
                    </div>

                    <div
                      className={classNames('ui tab ', {
                        active: activeTab === 'app-info',
                      })}
                      data-tab="app-info"
                    >
                      <UpdateApplication app={data.application} />
                    </div>

                    <div
                      className={classNames('ui tab ', {
                        active: activeTab === 'app-users',
                      })}
                      data-tab="app-users"
                    >
                      <AppUpdateUsers appId={match.params.id} />
                    </div>
                    <div
                      className={classNames('ui tab ', {
                        active: activeTab === 'app-keys',
                      })}
                      data-tab="app-keys"
                    >
                      <AppManageKeys app={data.application} />
                    </div>
                    <div
                      className={classNames('ui tab ', {
                        active: activeTab === 'app-backup',
                      })}
                      data-tab="app-backup"
                    >
                      <div className="ui segment">
                        <p>Comming soon!</p>
                      </div>
                    </div>
                    <AppCloneModal
                      appId={match.params.id}
                      app={data.application}
                      visibleCloneModel={this.state.visibleCloneModel}
                      toggleModal={this.toggleModal}
                      history={history}
                    />
                    <AppDeleteModal
                      appId={match.params.id}
                      app={data.application}
                      visibleModel={this.state.visibleModel}
                      toggleModal={this.toggleModal}
                      history={history}
                    />
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
