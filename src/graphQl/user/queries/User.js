import gql from "graphql-tag";

export default gql(`
query{
  User{
    id
    email
    slug
    profile
    status
    jwt
  }
}`
);