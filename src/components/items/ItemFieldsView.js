import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { sortBy } from 'lodash';

import { ContainerFragment } from '../../utils/fragments';
import TextInput from './fields/TextInput';

// Conatiner Query
const containerQuery = gql`
  ${ContainerFragment}
  query container($id: ID!) {
    container(id: $id) {
      ...ContainerFragment
    }
  }
`;

const FieldList = ({ schema }) => (
  <React.Fragment>
    <React.Fragment>{schema.type === 'text' && <TextInput />}</React.Fragment>
    <React.Fragment>
      {schema.type === 'textArea' && <TextInput />}
    </React.Fragment>
    <React.Fragment>{schema.type === 'number' && <TextInput />}</React.Fragment>
    <React.Fragment>
      {schema.type === 'boolean' && <TextInput />}
    </React.Fragment>
    <React.Fragment>{schema.type === 'image' && <TextInput />}</React.Fragment>
    <React.Fragment>{schema.type === 'enom' && <TextInput />}</React.Fragment>
    <React.Fragment>
      {schema.type === 'relation' && <TextInput />}
    </React.Fragment>
    <React.Fragment>
      {schema.type === 'dataAndTime' && <TextInput />}
    </React.Fragment>
  </React.Fragment>
);

const ItemFieldsView = () => (
  <Query query={containerQuery} variables={{ id: '5b473c31a744af1c9859089f' }}>
    {({ loading, error, data }) => {
      if (loading) return 'loading....';
      if (error) return 'error';
      const fields = sortBy(data.container.fields, ['listingOrder']);
      return (
        <React.Fragment>
          {fields.map(schema => (
            <div
              className={`${schema.isRequired && 'required'} field`}
              key={schema.id}
            >
              <label style={{ color: '#34383c', fontWeight: '400' }}>
                {schema.name}
              </label>
              <FieldList schema={schema} />
              <p className="field-description"> {schema.description}</p>
            </div>
          ))}
        </React.Fragment>
      );
    }}
  </Query>
);

export default ItemFieldsView;
