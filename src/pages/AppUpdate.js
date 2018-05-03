import React from 'react';
import gql from 'graphql-tag';
// import alertify from 'alertify.js';
import { Mutation, Query } from 'react-apollo';

// import Loading from '../components/core/Loading';
import AppForm from '../components/app/form/AppForm';
import AppUpdateUsers from '../components/app/AppUpdateUsers';
// import AppManageKeys from '../components/app/AppManageKeys';
// import AppCloneModal from '../components/app/AppCloneModal';
// import AppDeleteModal from '../components/app/AppDeleteModal';
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
    }
  }
`;

const UpdateApplication = ({ app }) => (
  <Mutation mutation={updateApplicationMutation}>
    {(updateApplication, { data, loading, error }) => {
      if (loading) return 'Loading...';
      if (error) return `Error! ${error.message}`;
      return (
        <React.Fragment>
          <AppForm
            location={app.location}
            app={{ name: 'hello', description: 'boom' }}
            submit={input => {
              updateApplication({
                variables: {
                  id: app.match.params.id,
                  ...input,
                },
              });
            }}
          />
        </React.Fragment>
      );
    }}
  </Mutation>
);
class AppUpdate extends React.Component {
  // TODO:
  // constructor(props) {
  //     super(props);

  //     this.state = {
  //         cloneModalVisible: false,
  //         deleteModalVisible: false
  //     };
  // }

  // componentDidMount() {
  //     trackEvent('Updating Stack');

  //     $('#app-update-tabs .item').tab();
  // }

  // getMeteorData() {
  //     let app = Application.findOne(this.props.id);
  //     let data = {app};

  //     if (!_.isUndefined(app)) {
  //         let handle = Meteor.subscribe('users.all', app.users);
  //         if (handle.ready()) {
  //             data['users'] = User.find({_id: {$in: app.users}}).fetch();
  //         }
  //     }

  //     return data;
  // }

  render() {
    // if (isUndefined(this.data.app)) {
    //   return <Loading active />;
    // }
    // TODO: Normlize all data here..eg. loaction,  application  etc
    const app = this.props;

    return (
      <Layout>
        <Query query={applicationQuery} variables={{ id: app.match.params.id }}>
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
                      <div className="item " data-tab="app-info">
                        Stack Information
                      </div>
                      <div className="item active" data-tab="app-users">
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
                      <UpdateApplication app={app} />
                    </div>

                    <div className="ui tab " data-tab="app-users">
                      <AppUpdateUsers appId={app.match.params.id} />
                    </div>
                    {/* <div className="ui tab" data-tab="app-keys">
              <AppManageKeys app={this.data.app} />
            </div> */}
                    <div className="ui tab" data-tab="app-backup">
                      <div className="ui segment">
                        <p>Comming soon!</p>
                      </div>
                    </div>

                    {/* <AppCloneModal
              app={this.data.app}
              visible={this.state.cloneModalVisible}
              toggleModal={() => this.setState({ cloneModalVisible: false })}
            /> */}
                    {/* <AppDeleteModal
              app={this.data.app}
              visible={this.state.deleteModalVisible}
              toggleModal={() => this.setState({ deleteModalVisible: false })}
            /> */}
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
