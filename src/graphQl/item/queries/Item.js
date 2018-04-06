import gql from "graphql-tag";

export default gql(`
query($id: ID!) {
  allItems(id:$id){
    id
    appId
    data
    containerId
    ownerId
    publishedAt
  }
}`
);
