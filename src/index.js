import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { MongoClient, ServerApiVersion } from 'mongodb';
import { TaskListType, TodoType, UserType} from './graphql/types/index.js'

import dotenv from 'dotenv';
dotenv.config();


const { DB_NAME, DB_URI } = process.env

const client = new MongoClient(DB_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const typeDefs = `#graphql
        type Query {
            myTaskLists: [TaskList!]!
        }

        ${UserType}
        ${TaskListType}
        ${TodoType}
`;

const resolvers = {
    Query: {
        myTaskLists: () => []
    }
};

const start = async () => {
    await client.connect();
    const db = client.db(DB_NAME);

    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });

    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
        context: async ({ req, res }) => ({
            db,
        }),
    });

    console.log(`🚀  Server ready at: ${url}`);
}

start();
