// TODO:

import React from 'react';
// // import PropTypes from 'prop-types';

import AppStepOneModel from './AppStepOneModel';
import AppStepTwoModel from './AppStepTwoModel';
import CreateAppModalTrigger from './CreateAppModalTrigger';

class CreateAppModal extends React.Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     isLoading: false,
  //     step: 1,
  //     library: null,
  //     libraryId: null,
  //     appName: '',
  //     appDescription: '',
  //   };
  // }

  // getMeteorData() {
  //   const handle = Meteor.subscribe('apps.libraries.all');

  //   return {
  //     loading: !handle.ready(),
  //     apps: ApplicationLibrary.find().fetch(),
  //     modalVisible: Session.get('app.create.modal'),
  //   };
  // }

  // selectLibrary = (app) => {
  //   this.setState({
  //     libraryId: app._id,
  //     library: app,
  //   });
  // };

  // goToStepTwo = () => {
  //   this.setState({
  //     step: 2,
  //   });

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


  render() {
    return (
      <div className="ui modal" id="app-create-modal">
        <div className="header">
          <img src="/images/logo.png" alt="logo" />
                  Create new stack
          <i
            className="close icon"
            // onClick={() => Session.set('app.create.modal', false)}
          />
        </div>
        <div className="content">
          {/* <Loading active={this.state.isLoading} />
          {this.state.step === 1 ? <AppStepOneModel /> : ''}
          {this.state.step === 2 ? <AppStepTwoModel /> : ''} */}
          <AppStepOneModel />
          <AppStepTwoModel />
        </div>
        <CreateAppModalTrigger />
      </div>
    );
  }
}

export default CreateAppModal;
