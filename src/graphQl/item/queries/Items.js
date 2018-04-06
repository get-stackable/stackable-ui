import gql from "graphql-tag";

export default gql(`
query($appId: ID!, $containerId: ID!) {
  allItems(appId:$appId, containerId:$containerId){
    id
    appId
    data
    containerId
    ownerId
    publishedAt
  }
}`
);
