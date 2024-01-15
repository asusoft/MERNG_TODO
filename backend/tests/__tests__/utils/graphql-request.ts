import { type TypedDocumentNode } from '@graphql-typed-document-node/core'
import type { GraphQLClient, Variables } from 'graphql-request'
import { FromEntries } from './types'


export function buildAuthHeaders (
    accessToken: string | undefined
): Record<string, string> {
    const headers: Record<string, string> = {}
    if (accessToken != null) {
        headers.Authorization = accessToken
    }
    return headers
}

export function createGraphQLRequest<Result, V extends Variables> (
    document: TypedDocumentNode<Result, V>,
    handleResult?: (res: Result) => void
) {
    return async (
        client: GraphQLClient,
        variables: V,
        accessToken: string | undefined
    ) => {
        const response = await client.request<Result, Variables>(
            document,
            variables,
            buildAuthHeaders(accessToken)
        )
        if (handleResult !== undefined) {
            handleResult(response)
        }
        return response
    }
}
type BaseResult<K extends string> = { __typename?: string } & Partial<FromEntries<[
    [K, { __typename?: string } | null]
]>>

type EnsureOKRequest<
    // eslint-disable-next-line no-use-before-define
    Result extends BaseResult<K>,
    V extends Variables,
    K extends Exclude<Extract<keyof Result, string>, '__typename'>,
    EnsureResult
> = (
    c: GraphQLClient, v: V, t: string | undefined
) => Promise<EnsureResult>

export function createEnsureRequest<
    // eslint-disable-next-line no-use-before-define
    Result extends BaseResult<K>,
    V extends Variables,
    K extends Exclude<Extract<keyof Result, string>, '__typename'>,
    EnsureResult
> (
    request: ReturnType<typeof createGraphQLRequest<Result, V>>,
    key: K,
    guard: (v: Result[K]) => EnsureResult
): EnsureOKRequest<Result, V, K, EnsureResult> {
    return async (client, variables, accessToken) => {
        const response = await request(client, variables, accessToken)
        const value = response[key]
        return guard(value)
    }
}