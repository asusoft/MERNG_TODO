import { encrypt, decrypt } from '../../helpers/CipherUtils.js';
import { getToken } from '../../helpers/tokenization.js'
import { UserMutationResolvers } from './User/Mutations/index.js';

const resolvers = {
    Query: {
        myTaskLists: () => []
    },
   ...UserMutationResolvers,
    User: {
        id: ({ _id, id }) => _id || id
    }
};
export default resolvers;
