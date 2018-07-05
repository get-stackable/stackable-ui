import { withClientState } from 'apollo-link-state';
import { InMemoryCache } from 'apollo-cache-inmemory';

const cache = new InMemoryCache();
const stateLink = withClientState({
  cache,
  resolvers: {
    Mutation: {},
  },
  defaults: {
    counter: {
      __typename: 'Counter',
      value: 1,
    },
    stack: {
      __typename: 'Stack',
      appId: 'ghdfcyffy',
      containerId: null,
      itemId: null,
      modelVisible: false,
    },
    user: {
      __typename: 'User',
      id: null,
      email: null,
      firstName: null,
      lastName: null,
    },
  },
});

export default stateLink;
