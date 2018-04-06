import gql from 'graphql-tag';

export default gql(`
mutation(
  $key: String!
){
  payReferral(
    key: $key
){
  User{
    id
  }
  }
}
`);
