/* global $:true */
import React from 'react';
import { isUndefined } from 'lodash';

class TextFieldValidations extends React.Component {
  static defaultProps = {
    showType: false,
  };

  // static propTypes = {
  //     onChange: React.PropTypes.func.isRequired,
  //     value: React.PropTypes.object.isRequired,
  //     showType: React.PropTypes.bool
  // };

  constructor(props) {
    super(props);

    this.state = this.loadState(props);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.loadState(nextProps));
  }

  componentDidUpdate() {
    const self = this;
    $('.ui.checkbox.between')
      .checkbox({
        onChecked() {
          self.setState({ between: true }, () =>
            self.props.onChange(self.state),
          );
        },
        onUnchecked() {
          self.setState({ between: false }, () =>
            self.props.onChange(self.state),
          );
        },
      })
      .checkbox(self.state.between ? 'set checked' : 'set unchecked');

    $('.ui.dropdown.type')
      .dropdown({
        onChange(value) {
          self.setState({ type: value }, () => self.props.onChange(self.state));
        },
      })
      .dropdown('set text', self.state.type);
  }

  loadState(props) {
    const data = {
      between: !isUndefined(props.value.between) ? props.value.between : false,
      min: !isUndefined(props.value.min) ? props.value.min : null,
      max: !isUndefined(props.value.max) ? props.value.max : null,
    };

    if (props.showType) {
      data.type = !isUndefined(props.value.type) ? props.value.type : 'any';
    }

    return data;
  }

  triggerChange = () => {
    this.props.onChange(this.state);
  };

  render() {
    return (
      <div className="fieldsValidations">
        <div className="inline field">
          <div className="ui slider checkbox between">
            <input type="checkbox" tabIndex="0" className="hidden" />
            <label htmlFor="checkBox">Number of characters between</label>
          </div>
        </div>
        <React.Fragment>
          {this.state.between && (
            <div className="fields">
              <div className="one wide field" />
              <div className="four wide field">
                <label htmlFor="min">
                  Minimum
                  <input
                    type="number"
                    placeholder="Min characters"
                    value={this.state.min}
                    onChange={e => this.setState({ min: e.target.value })}
                    onBlur={this.triggerChange}
                  />
                </label>
              </div>
              <div className="four wide field">
                <label htmlFor="max">
                  Maximum
                  <input
                    type="number"
                    placeholder="Max characters"
                    value={this.state.max}
                    onChange={e => this.setState({ max: e.target.value })}
                    onBlur={this.triggerChange}
                  />
                </label>
              </div>
            </div>
          )}
        </React.Fragment>
        <React.Fragment>
          {this.props.showType && (
            <div className="field">
              <label htmlFor="fieldType">
                Field Type
                <select className="ui fluid normal dropdown type">
                  <option value="any">Any</option>
                  <option value="email">Email</option>
                  <option value="url">URL</option>
                </select>
              </label>
            </div>
          )}
        </React.Fragment>
      </div>
    );
  }
}

export default TextFieldValidations;
