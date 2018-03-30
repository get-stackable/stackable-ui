import gql from "graphql-tag";

export default gql(`
query {
  movie{
    id
    name
    releaseDate
    imdbId
    cdnPath
    cdnReference
    cdnSource
    googleDriveReference
    googleDriveSource
    updatedAt
  }
}`
);
