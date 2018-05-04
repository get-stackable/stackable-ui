import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import alertify from 'alertify.js';
import { Mutation } from 'react-apollo';

import AppDeleteForm from './form/AppDeleteForm';

const deleteApplicationMutation = gql`
  mutation deleteApplication($id: ID!) {
    deleteApplication(id: $id) {
      id
    }
  }
`;

class AppDeleteModal extends React.Component {
  // componentDidUpdate() {
  // const self = this;
  // $('#app-delete-modal')
  //     .modal({
  //         detachable: false,
  //         onHidden(){
  //             self.props.toggleModal()
  //         }
  //     })
  //     .modal(this.props.visible ? 'show' : 'hide');
  // }

  render() {
    const { appId } = this.props;
    return (
      <div className="ui modal" id="app-delete-modal">
        <div className="header">
          <img src="/images/logo.png" alt="logo" />
          Delete stack
          <i className="close icon" />
        </div>
        <div className="content">
          <div className="ui segment">
            <p>
              Deleting the stack will also delete its all related containers and
              items!
            </p>
          </div>
          <Mutation mutation={deleteApplicationMutation}>
            {(deleteApplication, { data, loading, error }) => (
              <React.Fragment>
                <AppDeleteForm
                  type="clone"
                  submit={input => {
                    deleteApplication({
                      variables: {
                        id: appId,
                      },
                    });
                  }}
                />
                {loading && <p>Loading...</p>}
                {error && <p> `${alertify.error(error.message)}`}</p>}
                {data && <p>`${alertify.success('Sucessfully Deleted')}` </p>}
              </React.Fragment>
            )}
          </Mutation>
        </div>
      </div>
    );
  }
}

export default AppDeleteModal;

AppDeleteModal.propTypes = {
  appId: PropTypes.string.isRequired,
};
