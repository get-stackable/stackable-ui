import React from 'react';
// import PropTypes from 'prop-types';
// import alertify from 'alertify.js'


class AppManageKeys extends React.Component {
//   static propTypes = {
//       app: React.PropTypes.object
//   };

//   constructor(props) {
//       super(props);

//       this.state = {
//           allowedUrls: !_.isUndefined(props.app) ? props.app.allowedUrls : ''
//       };
//   }
// TODO:
//   generateAppKey = () => {
//       alertify.confirm('Do you want to reset keys?',
//           'Once you reset keys for stack, you need to update all your client applications with new keys',
//           () => {
//               Meteor.call('app.generateKey', this.props.app._id, (err) => {
//                   if (!err) {
//                       FlashMessages.sendSuccess('Stack key for stack re-generated successfully!');
//                   }
//               });
//           },
//           () => {
//               // cancel
//           });


//   };

//   handleSubmit = () => {
//       const data = {
//           allowedUrls: this.state.allowedUrls
//       };

//       Meteor.call('app.update', this.props.app._id, data, (err, res) => {
//           // console.log(err, res);
//           if (!err) {
//               FlashMessages.sendSuccess('App updated successfully!');
//           }
//       });
//   };

  render() {
    return (
      <div className="ui form">
        <div className="field">
          <label>Public Key</label>
          <input type="text" value={this.props.app.publicKey} readOnly />
        </div>
        <div className="field">
          <label>Private Key</label>
          <input type="text" value={this.props.app.privateKey} readOnly />
        </div>
        <a
          className="mini negative ui button"
          onClick={() => this.generateAppKey()}
        >
                  Reset Keys
        </a>
        <div className="ui divider" />
        <div className="field">
          <label>Allowed Urls</label>
          <textarea
            rows="3"
            value={this.state.allowedUrls}
            onChange={e => this.setState({ allowedUrls: e.target.value })}
          />
        </div>
        <button className="ui button" type="submit" onClick={this.handleSubmit}>
          <i className="save icon" />
                  Update
        </button>
      </div>
    );
  }
}

export default AppManageKeys;
