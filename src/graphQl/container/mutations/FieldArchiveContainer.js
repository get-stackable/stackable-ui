import gql from 'graphql-tag';

export default gql(`
mutation(
  $containerId: ID!,
  $fieldName: String!
){
  fieldArchiveContainer(
    containerId: $containerId,
    fieldName: $fieldName
   ){
    id
  }
}
`);
