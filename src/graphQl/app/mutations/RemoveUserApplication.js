import gql from 'graphql-tag';

export default gql(`
mutation(
  $appId: String!,
  $userId: String!,
){
  removeUserApplication(
    appId:$appId,
    userId:$userId,
    ){
    id
  }
}
`);
