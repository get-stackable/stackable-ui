import gql from 'graphql-tag';

export default gql(`
mutation(
  $id: ID!
){
  generateKeyApplication(
      id:$id
    ){
    id
  }
}
`);
