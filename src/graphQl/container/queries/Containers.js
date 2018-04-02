import gql from "graphql-tag";

export default gql(`
query($appId: ID!) {
  allContainers(appId:$appId){
    id
    name
    publishedAt
  }
}`
);
