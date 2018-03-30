import React from 'react';
import PropTypes from 'prop-types';


class NumberInput extends React.Component {
  
PropTypes = {
      onChange: PropTypes.func.isRequired
  };

  render() {
      return (
        <input
          {...this.props}
          type="number"
          onChange={this.props.onChange}
        />
      )
  }
};

export default NumberInput;