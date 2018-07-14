import React from 'react';
import { isUndefined, sortBy } from 'lodash';

import TextInput from './fields/TextInput';

class ItemForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initState(props);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.initState(nextProps));
  }

  handleChange(inputName, e) {
    const change = {};
    change[inputName] = !isUndefined(e.target) ? e.target.value : e;
    this.setState(change);
  }

  // onChange = (inputName, e) => {
  //   const change = {};
  //   change[inputName] = !isUndefined(e.target) ? e.target.value : e;
  //   this.setState(change);
  // };

  initState(props) {
    // if (this.props.isContainerView) {
    //   return {};
    // }

    const stateData = {};
    const containerItems = sortBy(props.container.fields, 'listing_order');
    containerItems.map(schema => {
      stateData[schema.slug] = '';
    });
    return stateData;
  }

  render() {
    const { container } = this.props;
    return (
      <React.Fragment>
        {container.fields.map(schema => (
          <div
            className={`${schema.isRequired && 'required'} field`}
            key={schema.id}
          >
            <label style={{ color: '#34383c', fontWeight: '400' }}>
              {schema.name}
            </label>
            <React.Fragment>
              {schema.type === 'text' && (
                <TextInput
                  name={schema.slug}
                  value={this.state[schema.slug]}
                  onChange={e => this.handleChange(schema.slug, e)}
                />
              )}
            </React.Fragment>
            <p className="field-description"> {schema.description}</p>
          </div>
        ))}
      </React.Fragment>
    );
  }
}

export default ItemForm;
