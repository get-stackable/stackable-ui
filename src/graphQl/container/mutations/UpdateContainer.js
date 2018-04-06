import gql from 'graphql-tag';

export default gql(`
mutation(
  $id: ID!,
  $name: String!,
){
  updateContainer(
    id:$id,
    input:{
      name:$name,
    }
){
    id
  }
}
`);
