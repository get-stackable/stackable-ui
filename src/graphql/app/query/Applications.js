import gql from "graphql-tag";

export default gql(`
query {
  allApplications{
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
}`
);
