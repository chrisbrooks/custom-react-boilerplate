/* eslint-disable */
// import { ApolloClient } from 'react-apollo';
// import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
// import { mockNetworkInterfaceWithSchema } from 'apollo-test-utils';
//
// import { typeDefs } from './graphql/schema';
// import mocks from './graphql/mocks';
//
// export default () => {
//   const schema = makeExecutableSchema({ typeDefs });
//
//   addMockFunctionsToSchema({
//     schema,
//     mocks
//   });
//
//   const networkInterface = mockNetworkInterfaceWithSchema({ schema });
//
//   // const networkInterface = createNetworkInterface({
//   //   uri: '/graphql',
//   //   opts: {
//   //     credentials: 'include',
//   //   },
//   // });
//
//   const client = new ApolloClient({ networkInterface });
//
//   return client;
// };

import ApolloClient from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory'
import { getGraphqlEndpoint } from 'baseUrls';
import { getToken } from 'utils/authorizationToken';

export default () => {

  const httpLink = createHttpLink({
    uri: getGraphqlEndpoint()
  });

  const middlewareLink = new ApolloLink((operation, forward) => {
    const token = getToken();
    operation.setContext({
      headers: {
        authorization:  token ? token : null
      }
    });
    return forward(operation)
  });

  const cache = new InMemoryCache({
    dataIdFromObject: (result) => {
      if (result.id && result.__typename) {
        return `${result.__typename}:${result.id}`;
      }
      return null;
    }
  });

  const client = new ApolloClient({
    link: middlewareLink.concat(httpLink),
    cache: cache.restore(window.__APOLLO_STATE__ || {})
  });

  return client;
};
