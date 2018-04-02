import gql from 'graphql-tag';

export default gql(`
mutation(
  $appId: ID!,
  $userEmail: String!,
){
  addUserApplication( 
    appId:$appId,
    userEmail:$userEmail
  ){
    id
  }
}
`);
