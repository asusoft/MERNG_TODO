import { SignInDocument } from "../../generated/types/graphql";
import { createGraphQLRequest } from "../utils";


export const signIn = createGraphQLRequest(SignInDocument)

