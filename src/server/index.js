import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from '../graphql/index.js';
import resolvers from '../graphql/resolvers/index.js';
import { connectDB } from '../database/db.js'
import { getUserFromToken } from '../helpers/tokenization.js';

const start = async () => {
    const db = await connectDB();
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });

    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
        context: async ({ req }) => {
            const user = await getUserFromToken(req.headers.authorization, db)
            return {
              db,
              user
            }
          },
    });

    console.log(`🚀  Server ready at: ${url}`);
}

start();
