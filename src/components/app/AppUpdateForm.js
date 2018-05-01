import React from 'react';
// import PropTypes from 'prop-types';

class AppUpdateForm extends React.Component {
  render() {
    return (
      <div className="ui form">
        <div className="field">
          <label>Name</label>
          <input
            type="text"
            value={this.state.name}
            onChange={e => this.setState({ name: e.target.value })}
          />
        </div>
        <div className="field">
          <label>Description</label>
          <input
            type="text"
            value={this.state.description}
            onChange={e => this.setState({ description: e.target.value })}
          />
        </div>
        <button className="positive ui button" type="submit" onClick={this.handleSubmit}>Update</button>
      </div>
    );
  }
}

export default AppUpdateForm;
