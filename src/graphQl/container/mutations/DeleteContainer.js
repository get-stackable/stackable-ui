import gql from 'graphql-tag';

export default gql(`
mutation(
  $id: ID!,
  $name: String!
){
  deleteContainer(
    id:$id,
    input:{
      name:$name
     }
   ){
    id
  }
}
`);
