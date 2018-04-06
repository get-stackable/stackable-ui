import gql from 'graphql-tag';

export default gql(`
mutation(
  $containerId: ID!,
  $newName: String!,
  $oldName: String!
){
  fieldRenameContainer(
    containerId: $containerId,
    newName: $newName
    oldName: $oldName
   ){
    id
  }
}
`);
