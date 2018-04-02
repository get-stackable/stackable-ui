import gql from 'graphql-tag';

export default gql(`
mutation(
  $appId: ID!,
  $userEmail: String!,
){
  addUserApplication( 
    appId:"5ac1ed5c34400e6c16e9053c",
    userEmail:"nasimakhtar1996@gmail.com"
  ){
    id
  }
}
`);
