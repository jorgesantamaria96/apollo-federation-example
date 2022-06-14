const express = require("express");
const http = require("http");
const { ApolloGateway, IntrospectAndCompose } = require("@apollo/gateway");
const { ApolloServer } = require("apollo-server-express");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");

const gateway = new ApolloGateway({
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [
      { name: "users", url: "http://localhost:5001/" },
      { name: "posts", url: "http://localhost:5002/" },
    ],
  }),
});

(async () => {
  const app = express();
  const httpServer = http.createServer(app);
  const { schema, executor } = await gateway.load();

  const server = new ApolloServer({
    schema,
    executor,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  server.applyMiddleware({ app });

  httpServer.listen(5000, () => {
    console.log(`🚀 Gateway ready at http://localhost:5000/graphql`);
  });
})();
