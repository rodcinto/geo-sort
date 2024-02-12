import { graphqlHTTP } from 'express-graphql';
import { createServer, proxy } from 'aws-serverless-express';
import { schema } from './schema.js';
import root from "./resolvers/root.js";
import app from "./app.js";

const PORT = process.env.PORT || 3000;

app.use(
  "/",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

const server = createServer(app);

if (!process.env.LAMBDA_TASK_ROOT) {
  server.listen(PORT, () => {
    const { port } = server.address();
    console.log(`Running on http://localhost:${port}/`);
  });
}

const handler = (event, context) => { return proxy(server, event, context); }

export { handler }
