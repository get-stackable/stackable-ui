import gql from 'graphql-tag';

export default gql(`
mutation(
  $id: ID!
  $name: String,
  $description: String,
  $isActive: Boolean,
  $allowedUrls: String,
){
  updateApplication(
    id: $id
    input: {
      name: $name,
      description: $description,
      isActive: $isActive,
      allowedUrls: $allowedUrls
    }
    ){
    id
    name
  }
}
`);
