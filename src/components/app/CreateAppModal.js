import React from 'react';
import { ApolloConsumer } from 'react-apollo';
// // import PropTypes from 'prop-types';

import AppStepOneModel from './AppStepOneModel';
import AppStepTwoModel from './AppStepTwoModel';

import CreateAppModalTrigger from './CreateAppModalTrigger';

class CreateAppModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // isLoading: false,
      step: 1,
      // library: null,
      // libraryId: null,
      // appName: '',
      // appDescription: '',
    };
  }

  // selectLibrary = (app) => {
  //   this.setState({
  //     libraryId: app._id,
  //     library: app,
  //   });
  // };

  goToStepTwo = () => {
    this.setState({
      step: 2,
    });
  };

  //   setTimeout(() => {
  //     ReactDOM.findDOMNode(this.refs.appName).focus();
  //     superplaceholder({
  //       el: document.getElementById('appName'),
  //       sentences: ['type stack name here', 'eg: MySite.com, Amazing Stack, My Beautiful App'],
  //       options: {
  //         startOnFocus: false,
  //       },
  //     });
  //   }, 800);
  // };

  // handleSubmit = () => {
  //   if (this.state.appName.length === 0) {
  //     return;
  //   }

  //   const data = {
  //     name: this.state.appName,
  //     description: this.state.appDescription,
  //     libraryId: this.state.libraryId,
  //   };

  //   trackEvent('Created Stack');
  //   Meteor.call('app.create', data, (err, res) => {
  //     // console.log(err, res);
  //     if (!err) {
  //       this.setState({
  //         step: 1,
  //         library: null,
  //         libraryId: null,
  //         appName: '',
  //         appDescription: '',
  //       });
  //       Session.set('app.create.modal', false);
  //       FlashMessages.sendSuccess('Stack created successfully!');
  //       FlowRouter.go('appView', { id: res._id });
  //     }
  //   });
  // };
  hideAppModal(client) {
    client.writeData({
      data: {
        stack: { __typename: 'Stack', modelVisible: false },
      },
    });
    setTimeout(() => {
      this.setState({ step: 1 });
    }, 1000);
  }

  render() {
    console.log('magic', this.props.data);
    const { data } = this.props;

    return (
      <div className="ui modal " id="app-create-modal">
        <div className="header">
          <img src="/images/logo.png" alt="logo" />
          Create new stack
          <ApolloConsumer>
            {client => (
              <i
                className="close icon"
                onClick={() => this.hideAppModal(client)}
                style={{ cursor: 'pointer' }}
              />
            )}
          </ApolloConsumer>
        </div>
        <div className="content">
          {/* <Loading active={this.state.isLoading} /> */}
          {this.state.step === 1 ? (
            <AppStepOneModel goToStepTwo={this.goToStepTwo} />
          ) : (
            ''
          )}
          {this.state.step === 2 ? <AppStepTwoModel /> : ''}
          {/* <AppStepOneModel /> */}
          {/* <AppStepTwoModel /> */}
        </div>
        <CreateAppModalTrigger
          modelVisible={data && data.stack && data.stack.modelVisible}
        />
      </div>
    );
  }
}

export default CreateAppModal;
