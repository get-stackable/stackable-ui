import gql from 'graphql-tag';

export default gql(`
mutation(
  $id: ID!,
  $input: JSON!,
){
  updateItem(
    id:$id,
    input:$input
){
    id
  }
}
`);
