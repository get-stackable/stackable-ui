import React from 'react';


class AppStepOneModel extends React.Component {
  render() {
    return (
      <div>
        <div className="ui three column grid">
          <div className="column">
            <h3 className="ui header" style={{ fontSize: '1.78rem', fontWeight: '400' }}>
                          Blank Stack
              <div className="sub header">
                 Start Fresh?
                <a href="#">Learn more here</a>
              </div>
            </h3>
          </div>
          <div className="column" />
          <div className="bottom aligned column">
            <button className="ui secondary button pull-right" onClick={this.goToStepTwo}>
              CREATE EMPTY STACK
            </button>
          </div>
        </div>
        <div className="ui divider" style={{ marginTop: '30px' }} />
        <h4 className="ui header" style={{ fontSize: '1.48rem' }}>
                  Stackable Library
          <div className="sub header">
                      Sometimes you just want to get going quickly check out our templates
          </div>
        </h4>
        <div className="ui grid">
          <div className="thirteen wide column">
            <div className="ui four cards">
              {/* {this.data.apps.map(app => (
                <div className="card" key={app._id}>
                  <div className="content" style={{ textAlign: 'center', paddingBottom: '40px' }}>
                    <div className="header" style={{ margin: '10px 0', fontSize: '1.2rem', lineHeight: '1.5rem' }}>
                      <img src="/images/grey-stack.png" alt="grey-stack.png" />
                      <br />
                      {app.name}
                    </div>
                    <div className="meta" style={{ position: 'absolute', left: '30%', bottom: '10px' }}>
                      <button
                        className="mini ui basic button"
                        onClick={this.selectLibrary.bind(this, app)}
                      >
                        choose
                      </button>
                    </div>
                  </div>
                </div>
              ))} */}
            </div>
          </div>
          <div className="bottom aligned three wide column">
            {/* {isNull(this.state.library) ?
              <div className="ui list">
                <div className="item" style={{ marginBottom: '20px' }}>
                  <i className="arrow right icon" />
                  <div className="content">
                    <strong>{this.state.library.name}</strong>
                  </div>
                </div>
                <div className="item" style={{ marginBottom: '20px' }}>
                  <i className="cube icon" />
                  <div className="content">
                    {this.state.library.description}
                  </div>
                </div>
              </div>
             : ''} */}
            <button
              className="fluid ui secondary button"
              onClick={this.goToStepTwo}
            >
              USE STACK
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default AppStepOneModel;
