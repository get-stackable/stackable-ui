import gql from "graphql-tag";

export default gql(`
query {
  allApplicationLibraries{
    id
    name
    description
    containers
    isOfficial
    isActive
  }
}`
);
