// TODO:

// import React from 'react';
// // import PropTypes from 'prop-types';

// class CreateAppModalTrigger extends React.Component {
//   constructor(props) {
//       super(props);

//       this.loadModal(props);
//   }

//   componentWillUpdate(nextProps) {
//       this.loadModal(nextProps);
//   }

// //   loadModal(props) {
// //       $('#app-create-modal')
// //           .modal({
// //               detachable: false,
// //               onHidden(){
// //                   Session.set('app.create.modal', false);
// //               }
// //           })
// //           .modal(props.modalVisible ? 'show' : 'hide');
// //   }

//   render() {
//       return <div />
//   }
// };

// CreateAppModal = class CreateAppModal extends React.Component {
//   constructor(props) {
//       super(props);

//       this.state = {
//           isLoading: false,
//           step: 1,
//           library: null,
//           libraryId: null,
//           appName: '',
//           appDescription: ''
//       };
//   }

//   getMeteorData() {
//       const handle = Meteor.subscribe('apps.libraries.all');

//       return {
//           loading: !handle.ready(),
//           apps: ApplicationLibrary.find().fetch(),
//           modalVisible: Session.get('app.create.modal')
//       };
//   }

//   selectLibrary = (app) => {
//       this.setState({
//           libraryId: app._id,
//           library: app
//       });
//   };

//   goToStepTwo = () => {
//       this.setState({
//           step: 2
//       });

//       setTimeout(() => {
//           ReactDOM.findDOMNode(this.refs.appName).focus();
//           superplaceholder({
//               el: document.getElementById('appName'),
//               sentences: ['type stack name here', 'eg: MySite.com, Amazing Stack, My Beautiful App'],
//               options: {
//                   startOnFocus: false
//               }
//           });
//       }, 800);
//   };

//   handleSubmit = () => {
//       if (this.state.appName.length === 0) {
//           return;
//       }

//       const data = {
//           name: this.state.appName,
//           description: this.state.appDescription,
//           libraryId: this.state.libraryId
//       };

//       trackEvent('Created Stack');
//       Meteor.call('app.create', data, (err, res) => {
//           // console.log(err, res);
//           if (!err) {
//               this.setState({
//                   step: 1,
//                   library: null,
//                   libraryId: null,
//                   appName: '',
//                   appDescription: ''
//               });
//               Session.set('app.create.modal', false);
//               FlashMessages.sendSuccess('Stack created successfully!');
//               FlowRouter.go('appView', {id: res._id});
//           }
//       });
//   };

//   renderStepOne() {
//       return (
//         <div>
//           <div className="ui three column grid">
//             <div className="column">
//               <h3 className="ui header" style={{'fontSize': '1.78rem', 'fontWeight': '400'}}>
//                           Blank Stack
//                 <div className="sub header">
//                               Start Fresh? <a href="#">Learn more here</a>
//                   </div>
//               </h3>
//             </div>
//             <div className="column" />
//             <div className="bottom aligned column">
//               <button className="ui secondary button pull-right" onClick={this.goToStepTwo}>
//                           CREATE EMPTY STACK
//               </button>
//             </div>
//           </div>
//           <div className="ui divider" style={{'marginTop': '30px'}} />
//           <h4 className="ui header" style={{'fontSize': '1.48rem'}}>
//                   Stackable Library
//             <div className="sub header">
//                       Sometimes you just want to get going quickly check out our templates
//             </div>
//           </h4>
//           <div className="ui grid">
//             <div className="thirteen wide column">
//               <div className="ui four cards">
//                 {this.data.apps.map((app) => (
//                     <div className="card" key={app._id}>
//                         <div className="content" style={{textAlign: 'center', 'paddingBottom': '40px'}}>
//                             <div className="header" style={{'margin': '10px 0', 'fontSize': '1.2rem', 'lineHeight': '1.5rem'}}>
//                                 <img src="/images/grey-stack.png" />
//                                 <br />
//                                 {app.name}
//                               </div>
//                             <div className="meta" style={{'position': 'absolute', 'left': '30%', 'bottom': '10px'}}>
//                                 <button
//                                           className="mini ui basic button"
//                                           onClick={this.selectLibrary.bind(this, app)}
//                                         >
//                                                   choose
//                                         </button>
//                               </div>
//                           </div>
//                       </div>
//                               ))}
//               </div>
//             </div>
//             <div className="bottom aligned three wide column">
//               {!_.isNull(this.state.library) ?
//                 <div className="ui list">
//                     <div className="item" style={{'marginBottom': '20px'}}>
//                         <i className="arrow right icon" />
//                         <div className="content">
//                             <strong>{this.state.library.name}</strong>
//                           </div>
//                       </div>
//                     <div className="item" style={{'marginBottom': '20px'}}>
//                         <i className="cube icon" />
//                         <div className="content">
//                             {this.state.library.description}
//                           </div>
//                       </div>
//                   </div>
//                           : ''}
//               <button
//                 className="fluid ui secondary button"
//                 onClick={this.goToStepTwo}
//               >
//                           USE STACK
//               </button>
//             </div>
//           </div>
//         </div>
//       );
//   }

//   renderStepTwo() {
//       return (
//         <div className="ui form">
//           <div className="field">
//             <label>Stack Name</label>
//             <input
//               type="text"
//               name="app-name"
//               ref="appName"
//               id="appName"
//               placeholder="Stack Name"
//               value={this.state.appName}
//               onChange={(e) => this.setState({appName: e.target.value})}
//             />
//           </div>
//           <div className="field">
//             <label>Stack Description</label>
//             <input
//               type="text"
//               name="app-description"
//               placeholder="Stack Description"
//               value={this.state.appDescription}
//               onChange={(e) => this.setState({appDescription: e.target.value})}
//             />
//           </div>
//           <button className="ui primary button" type="submit" onClick={this.handleSubmit}>
//                   Create!
//           </button>
//         </div>
//       )
//   }

//   render() {
//       return (
//         <div className="ui modal" id="app-create-modal">
//           <div className="header">
//             <img src="/images/logo.png" />
//                   Create new stack
//             <i className="close icon" onClick={() => Session.set('app.create.modal', false)} />
//           </div>
//           <div className="content">
//             <Loading active={this.state.isLoading} />
//             {this.state.step === 1 ? this.renderStepOne() : ''}
//             {this.state.step === 2 ? this.renderStepTwo() : ''}
//           </div>
//           <CreateAppModalTrigger modalVisible={this.data.modalVisible} />
//         </div>
//       )
//   }
// };

// reactMixin(CreateAppModal.prototype, ReactMeteorData);
