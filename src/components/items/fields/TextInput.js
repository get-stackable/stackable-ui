import React from 'react';
// import PropTypes from 'prop-types';

class TextInput extends React.Component {
  render() {
    return (
      <input
        {...this.props}
        className="item-field"
        type="text"
        name="textInput"
        // onChange={this.props.onChange}
      />
    );
  }
}

export default TextInput;
