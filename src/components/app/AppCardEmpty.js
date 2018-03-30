import React from 'react';
// import PropTypes from 'prop-types';

class AppCardEmpty extends React.Component {

    // TODO:
//   showCreateModal = () => {
//       trackEvent('Creating Stack');
//       Session.set('app.create.modal', true);
//   };

  render() {
      return (
        <div className="card">
          <div className="content" style={{textAlign: 'center'}}>
            <div className="header" style={{'margin': '10px 0'}}>
              <img src="/images/grey-stack.png" alt="grey-stack" />
              <br />
                      empty :(
            </div>
            <a
              className="meta"
              onClick={this.showCreateModal}
              style={{textDecoration: 'underline'}}
            >
                      + create new stack
            </a>
          </div>
        </div>
      )
  }
};

export default AppCardEmpty;