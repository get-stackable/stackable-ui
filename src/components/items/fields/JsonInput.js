import React from 'react';
import PropTypes from 'prop-types';

class JsonInput extends React.Component {

PropTypes = {
      onChange: PropTypes.func.isRequired
  };

  render() {
      return (
        <textarea
          {...this.props}
          rows="5"
          onChange={this.props.onChange}
        />
      )
  }
};

export default JsonInput;