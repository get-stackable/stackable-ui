import gql from 'graphql-tag';

export default gql(`
query($id: String!) {
  application(id: $id}{
    id
    name
    isActive
    publicKey
    privateKey
    allowedUrls
    createdBy
    users{
      firstName
      lastName
    }
  }
}`);
