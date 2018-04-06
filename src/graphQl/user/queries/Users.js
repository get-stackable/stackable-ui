import gql from "graphql-tag";

export default gql(`
query($ids: [String]!) {
  allUsers(ids: $ids}{
    id
    email
    slug
    profile
    status
    jwt
  }
}`
);
