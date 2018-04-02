import gql from 'graphql-tag';

export default gql(`
mutation(
  $id: ID!
){
  cloneApplication(
    id:$id
    ){
    id
  }
}
`);
