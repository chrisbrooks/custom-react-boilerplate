// eslint-disable-next-line
export const typeDefs = `
type Query {
  channels: [Channel]
}
type Channel {
   id: ID!
   name: String
}
`;
