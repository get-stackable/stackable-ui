import React from 'react';
import PropTypes from 'prop-types';

class BooleanInput extends React.Component {
  PropTypes = {
    onChange: PropTypes.func.isRequired,
  };

  render() {
    console.log('Bool', this.props.value);
    return (
      <div className="inline fields">
        <div className="field">
          <div className="ui radio checkbox">
            <input
              {...this.props}
              type="radio"
              value="true"
              defaultChecked={this.props.value === 'true'}
            />
            <label>Yes</label>
          </div>
        </div>
        <div className="field">
          <div className="ui radio checkbox">
            <input
              {...this.props}
              type="radio"
              value="false"
              defaultChecked={this.props.value === 'false'}
            />
            <label>No</label>
          </div>
        </div>
      </div>
    );
  }
}

export default BooleanInput;
