import gql from 'graphql-tag';

export default gql(`
mutation(
  $containerId: ID!,
  $appId: ID!,
  $input: JSON!,
){
  createItem(
    appId:$appId,
    containerId:$containerId
    input:$input
){
    id
  }
}
`);
