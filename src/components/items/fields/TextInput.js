import React from 'react';
import PropTypes from 'prop-types'

class TextInput extends React.Component {
    
PropTypes = {
      onChange: PropTypes.func.isRequired
  };

  render() {
      return (
        <input
          {...this.props}
          className="item-field"
          type="text"
          onChange={this.props.onChange}
        />
      )
  }
};

export default TextInput;