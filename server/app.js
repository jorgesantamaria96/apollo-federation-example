const { ApolloGateway } = require("@apollo/gateway");
const { ApolloServer } = require("apollo-server");

const gateway = new ApolloGateway({
  serviceList: [
    { name: "users", url: "http://localhost:5001/" },
    { name: "posts", url: "http://localhost:5002/" },
  ],
});

(async () => {
  const { schema, executor } = await gateway.load();

  const server = new ApolloServer({ schema, executor });

  server.listen(5000).then(({ url }) => {
    console.log(`🚀 Gateway ready at ${url}`);
  });
})();
