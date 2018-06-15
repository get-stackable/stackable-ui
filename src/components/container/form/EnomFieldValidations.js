import React from 'react';
import { isUndefined } from 'lodash';

class EnomFieldValidations extends React.Component {
  // static propTypes = {
  //   onChange: React.PropTypes.func.isRequired,
  //   value: React.PropTypes.object.isRequired,
  // };

  constructor(props) {
    super(props);

    this.state = {
      options: !isUndefined(props.value.options) ? props.value.options : '',
    };
  }

  triggerChange = () => {
    this.props.onChange(this.state);
  };

  render() {
    return (
      <div className="fieldsValidations">
        <div className="ui small message">
          Comma separated options to create drop down.
        </div>
        <div className="field">
          <label htmlFor="option">
            Options
            <input
              type="text"
              placeholder="EG: apple, mangoes, banana"
              value={this.state.options}
              onChange={e => this.setState({ options: e.target.value })}
              onBlur={this.triggerChange}
            />
          </label>
        </div>
      </div>
    );
  }
}

export default EnomFieldValidations;
