import React from 'react';

import TextInput from './fields/TextInput';

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
        <React.Fragment>
          {schema.type === 'text' && (
            <TextInput
              name={schema.slug}
              value={items[schema.slug]}
              onChange={e => handleChange(schema.slug, e)}
            />
          )}
        </React.Fragment>
        <p className="field-description"> {schema.description}</p>
      </div>
    ))}
  </React.Fragment>
);

export default ItemFields;
