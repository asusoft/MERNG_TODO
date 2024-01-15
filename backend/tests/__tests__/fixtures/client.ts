import type { GraphQLClient } from 'graphql-request'
import { createGraphqlClient } from '../utils'

let globalClient: GraphQLClient
export function useClient (): GraphQLClient {
    if (globalClient === undefined) {
        globalClient = createGraphqlClient()
    }
    return globalClient
}