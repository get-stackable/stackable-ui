import React from 'react';
// import PropTypes from 'prop-types';
import { sortBy } from 'lodash';

import TextInput from '../items/fields/TextInput';
import NumberInput from '../items/fields/NumberInput';
// import MarkdownEditor from '../items/fields/MarkdownEditor';
import BooleanInput from '../items/fields/BooleanInput';
import JsonInput from '../items/fields/JsonInput';
import EnomInput from '../items/fields/EnomInput';
import FileInput from '../items/fields/FileInput';
import RelationInput from '../items/fields/RelationInput';

class ContactFieldsPreview extends React.Component {
  loadPreviewFields() {
    const items = sortBy(this.props.items, 'listing_order');
    return items.map(schema => (
      <div className="field" key={schema.id}>
        <label
          style={{
            color: '#34383c',
            fontWeight: '400',
          }}
        >
          {schema.name}
        </label>
        {schema.type === 'text' && <TextInput />}
        {schema.type === 'number' && (
          <NumberInput onChange={() => console.log('on change...')} />
        )}
        {/* {schema.type === 'textArea' && (
          <MarkdownEditor
            text=""
            onChange={() => console.log('on change...')}
            className="mardown-editor-container"
            options={{ toolbar: { diffTop: -55 } }}
          />
        )} */}
        {schema.type === 'boolean' && (
          <BooleanInput
            name="test-boolean"
            onChange={() => console.log('on change...')}
          />
        )}
        {schema.type === 'json' && (
          <JsonInput
            name="test-json"
            onChange={() => console.log('on change...')}
          />
        )}
        {schema.type === 'enom' && (
          <EnomInput
            name="test-enom"
            onChange={() => console.log('on change...')}
          />
        )}
        {schema.type === 'image' && (
          <FileInput file={null} onUpload={() => console.log('on upload...')} />
        )}
        {schema.type === 'relation' && (
          <RelationInput
            relations={schema.relations}
            onChange={() => console.log('on change...')}
          />
        )}
        <p className="field-description">{schema.description}</p>
      </div>
    ));
  }

  render() {
    return (
      <div className="items-preview">
        <div className="ui medium header">Container Preview</div>
        <div className="ui form">{this.loadPreviewFields()}</div>
      </div>
    );
  }
}

export default ContactFieldsPreview;
