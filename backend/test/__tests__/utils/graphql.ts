import {
    GraphQLClient,
    GraphQLWebSocketClient,
    gql,
    type Variables
} from 'graphql-request'

import { GRAPHQL_TRANSPORT_WS_PROTOCOL } from 'graphql-ws'
import { GRAPHQL_ENDPOINT } from '../../config'
import { uploadMiddleware } from 'graphql-request-upload'
import { type BaseError } from '../../generated/types/graphql'

export function createGraphqlClient (): GraphQLClient {
    return new GraphQLClient(
        "http://localhost:4000/",
        { requestMiddleware: uploadMiddleware }
    )
}