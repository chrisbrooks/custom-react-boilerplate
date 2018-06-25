// eslint-disable-next-line
export const typeDefs = `
schema {
  query: RootQuery,
  mutation: RootMutation
}

type RootQuery {
  viewer: Viewer!
}

type Viewer {
  myself: User
}

type User {
  id: ID!
  firstName: String!
  lastName: String!
  email: String!
}
`;
