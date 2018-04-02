import gql from 'graphql-tag';

export default gql(`
mutation(
  $id: ID!
){
  deleteApplication(
      id:$id,
    ){
    id
  }
}
`);
