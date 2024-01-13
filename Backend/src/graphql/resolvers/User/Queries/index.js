import { getAllUsersResolver } from "./get-all-users.js";
import { getMeResolver } from "./get-me.js";

export const UserQueriesResolvers = {
    getAllUsers: getAllUsersResolver,
    getMe: getMeResolver
};