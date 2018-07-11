import gql from 'graphql-tag';

// Application Fragments
export const AppFragment = gql`
  fragment AppFragment on Application {
    id
    name
    privateKey
  }
`;

// Container Fragments

export const ContainerFragment = gql`
  fragment ContainerFragment on Container {
    id
    name
    isSingleItem
    fields {
      id
      name
      slug
      description
      type
      isRequired
      isDisabled
      validations {
        between
        min
        max
      }
    }
  }
`;

export const ContainerLiteFragment = gql`
  fragment ContainerLiteFragment on Container {
    name
  }
`;
