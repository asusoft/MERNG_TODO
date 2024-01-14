import { types } from './types/index.js'
import { queries } from './queries/index.js'
import { mutations } from './mutations/index.js';

export const typeDefs = `#graphql
    ${queries}
    ${mutations}
    ${types}
`;
