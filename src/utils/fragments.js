import gql from 'graphql-tag';

// Application Fragments

// Container Fragments

export const ContainerFragment = gql`
  fragment ContainerFragment on Container {
    name
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
