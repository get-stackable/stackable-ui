import React from 'react';

class AppStepTwoModel extends React.Component {
  render() {
    return (
      <div className="ui form">
        <div className="field">
          <label>Stack Name</label>
          <input
            type="text"
            name="app-name"
            // ref="appName"
            // id="appName"
            // placeholder="Stack Name"
            // value={this.state.appName}
            // onChange={e => this.setState({ appName: e.target.value })}
          />
        </div>
        <div className="field">
          <label>Stack Description</label>
          <input
            type="text"
            name="app-description"
            placeholder="Stack Description"
            // value={this.state.appDescription}
            // onChange={e => this.setState({ appDescription: e.target.value })}
          />
        </div>
        <button className="ui primary button" type="submit" onClick={this.handleSubmit}>
                Create!
        </button>
      </div>
    );
  }
}

export default AppStepTwoModel;
