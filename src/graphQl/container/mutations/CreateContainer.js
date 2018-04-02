import gql from 'graphql-tag';

export default gql(`
mutation(
  $appId: ID!,
  $name: String!,
){
  createContainer(
    appId:$appId,
    input:{
      name:$name,
    }
){
    id
    name
  }
}
`);
