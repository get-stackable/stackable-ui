import gql from 'graphql-tag';

export default gql(`
mutation(
  $id: ID!,
){
  deleteItem(
    id:$id,
){
    id
  }
}
`);
