import gql from "graphql-tag";

export default gql(`
query($appId: ID!, $id: ID!) {
  container(appId:$appId, id:$id){
    id
    name
    publishedAt
  }
}`
);
