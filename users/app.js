const { buildFederatedSchema } = require("@apollo/federation");
const { ApolloServer, gql } = require("apollo-server");

const users = [
  {
    id: 1,
    name: "user 1",
  },
  {
    id: 2,
    name: "user 2",
  },
  {
    id: 3,
    name: "user 3",
  },
  {
    id: 4,
    name: "user 4",
  },
  {
    id: 5,
    name: "user 5",
  },
  {
    id: 6,
    name: "user 6",
  },
];

const typeDefs = gql`
  type User @key(fields: "id") {
    id: ID!
    name: String
  }

  type Query {
    getUsers: [User]
  }
`;

const resolvers = {
  User: {
    async __resolveReference(userRepresentation) {
      return users[0].id;
    },
  },
  Query: {
    getUsers: async (root, {}, context) => {
      return users;
    },
  },
};

const server = new ApolloServer({
  schema: buildFederatedSchema([
    {
      typeDefs,
      resolvers,
    },
  ]),
});

server.listen(5001).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
