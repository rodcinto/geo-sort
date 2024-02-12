import { graphqlHTTP } from 'express-graphql';

import app from "./app.js";
import { schema } from './schema.js';
import root from "./resolvers/root.js";

const PORT = process.env.PORT || 3000;
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }),
);

app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));
