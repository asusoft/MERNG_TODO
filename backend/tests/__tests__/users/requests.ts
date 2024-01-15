import { GetMeDocument, SignInDocument } from "../../generated/types/graphql";
import { createGraphQLRequest } from "../utils";

export const signIn = createGraphQLRequest(SignInDocument)
export const getMe = createGraphQLRequest(GetMeDocument)

