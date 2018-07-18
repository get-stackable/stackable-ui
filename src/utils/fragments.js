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
      listingOrder
      validations {
        between
        min
        max
        options
      }
    }
  }
`;

export const ContainerLiteFragment = gql`
  fragment ContainerLiteFragment on Container {
    name
  }
`;
