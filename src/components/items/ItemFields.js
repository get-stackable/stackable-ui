import React from 'react';

import TextInput from './fields/TextInput';
import BooleanInput from './fields/BooleanInput';
import EnomInput from './fields/EnomInput';
import DateAndTime from './fields//DateAndTime';

const ItemFields = ({ container, handleChange, items }) => (
  <React.Fragment>
    {container.fields.map(schema => (
      <div
        className={`${schema.isRequired && 'required'} field`}
        key={schema.id}
      >
        <label style={{ color: '#34383c', fontWeight: '400' }}>
          {schema.name}
        </label>
        {schema.type === 'text' && (
          <TextInput
            name={schema.slug}
            value={items[schema.slug]}
            onChange={e => handleChange(schema.slug, e)}
          />
        )}

        {schema.type === 'boolean' && (
          <BooleanInput
            name={schema.slug}
            value={items[schema.slug]}
            onChange={e => handleChange(schema.slug, e)}
          />
        )}

        {schema.type === 'enom' && (
          <EnomInput
            name={schema.slug}
            value={items[schema.slug]}
            options={schema.validations.options}
            onChange={e => handleChange(schema.slug, e)}
          />
        )}
        {schema.type === 'dateAndTime' && (
          <DateAndTime
            name={schema.slug}
            value={items[schema.slug]}
            onChange={e => handleChange(schema.slug, e.value)}
          />
        )}
        <p className="field-description"> {schema.description}</p>
      </div>
    ))}
  </React.Fragment>
);

export default ItemFields;
