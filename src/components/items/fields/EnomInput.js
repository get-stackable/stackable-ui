/* global $:true */
import React from 'react';
// import { humanize } from 'underscore.string';
// import PropTypes from 'prop-types';

class EnomInput extends React.Component {
  static defaultProps = {
    options: '',
  };

  //  PropTypes = {
  //       onChange: PropTypes.func.isRequired,
  //       options: PropTypes.string.isRequired
  //   };

  constructor(props) {
    super(props);

    this.state = {
      options: this.createStringToArray(props.options),
    };
  }

  componentDidMount() {
    $(`#${this.props.name}`).dropdown();
  }

  createStringToArray(options) {
    const array = options.split(',');
    return array.map(item => item.trim());
  }

  render() {
    return (
      <select
        {...this.props}
        className="ui fluid normal dropdown"
        id={this.props.name}
        onChange={this.props.onChange}
      >
        <option>-- select option --</option>
        {this.state.options.map(item => <option value={item}>{item}</option>)}
      </select>
    );
  }
}

export default EnomInput;
