import gql from 'graphql-tag';

export default gql(`
mutation(
  $name: String,
  $description: String,
  $isActive: Boolean,
  $allowedUrls: String,
  $libraryId: String,
){
  createApplication(
    input:{
      name:$name,
      description:$description,
      isActive:$isActive,
      allowedUrls:$allowedUrls
    },
    libraryId:libraryId
    ){
    id
    name
  }
}
`);
