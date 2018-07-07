/* global $:true */
import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import alertify from 'alertify.js';
import { Mutation } from 'react-apollo';

import AppForm from './form/AppForm';

const cloneApplicationMutation = gql`
  mutation cloneApplication($id: ID!, $name: String!, $description: String) {
    cloneApplication(
      id: $id
      input: { name: $name, description: $description }
    ) {
      id
      name
    }
  }
`;

class AppCloneModal extends React.Component {
  componentDidUpdate() {
    const self = this;
    $('#app-clone-modal')
      .modal({
        detachable: false,
        onHidden() {
          self.props.toggleModal();
        },
      })
      .modal(this.props.visibleCloneModel ? 'show' : 'hide');
  }

  render() {
    const { appId } = this.props;
    return (
      <div className="ui modal" id="app-clone-modal">
        <div className="header">
          <img src="/images/logo.png" alt="logo" />
          Clone stack
          <i
            className="close icon"
            style={{ cursor: 'pointer' }}
            onClick={() => this.props.toggleModal()}
          />
        </div>
        <div className="content">
          <Mutation
            mutation={cloneApplicationMutation}
            onCompleted={() => {
              this.props.history.push('/dashboard');
              alertify.success('Cloning Sucessfully');
            }}
          >
            {cloneApplication => (
              <React.Fragment>
                <AppForm
                  type="clone"
                  submit={input => {
                    cloneApplication({
                      variables: {
                        id: appId,
                        ...input,
                      },
                    });
                  }}
                />
              </React.Fragment>
            )}
          </Mutation>
        </div>
      </div>
    );
  }
}

export default AppCloneModal;

AppCloneModal.propTypes = {
  appId: PropTypes.string.isRequired,
};
