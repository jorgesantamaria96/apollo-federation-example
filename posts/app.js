const { ApolloServer, gql } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");

const posts = [
  {
    id: 1,
    comment: "comment 1",
    user_id: 1,
  },
  {
    id: 2,
    comment: "comment 2",
    user_id: 1,
  },
  {
    id: 3,
    comment: "comment 3",
    user_id: 2,
  },
  {
    id: 4,
    comment: "comment 4",
    user_id: 2,
  },
  {
    id: 5,
    comment: "comment 5",
    user_id: 3,
  },
  {
    id: 6,
    comment: "comment 6",
    user_id: 4,
  },
  {
    id: 1,
    comment: "comment 1",
    user_id: 1,
  },
];

const typeDefs = gql`
  type Post @key(fields: "id") {
    id: ID!
    comment: String
    user_ID: Int
  }

  type Query {
    getPosts: [Post]
  }
`;

const resolvers = {
  Post: {
    __resolveReference(postRepresentation) {
      return posts[0].id;
    },
  },
  Query: {
    getPosts: async (root, {}, ctx) => {
      return posts;
    },
  },
};

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
});

server.listen(5002).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
