import React from 'react';
// import PropTypes from 'prop-types';
import superplaceholder from 'superplaceholder';

class BigTitleInput extends React.Component {
  componentDidMount() {
    superplaceholder({
      el: document.getElementById(this.props.name),
      sentences: ['type container name here', 'eg: Blog, Cars, Projects'],
      options: {
        startOnFocus: false,
      },
    });
  }

  // handleSubmit(createApplication) {}
  render() {
    return (
      <div className="inline fields">
        <div className="sixteen wide field">
          <input
            {...this.props}
            type="text"
            id={this.props.name}
            ref={this.props.name}
            placeholder={this.props.label}
            onChange={this.props.onChange}
            style={{
              width: '70%',
              fontSize: '2.5em',
              padding: '0em',
              border: '0',
            }}
          />
        </div>
      </div>
    );
  }
}

export default BigTitleInput;
