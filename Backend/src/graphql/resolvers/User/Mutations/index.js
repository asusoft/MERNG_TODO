import { signUpResolver } from './sign-up.js';
import { signInResolver } from './sign-in.js';
import { updateUserResolver } from './update-user.js';

export const UserMutationResolvers = {
        signUp: signUpResolver,
        signIn: signInResolver,
        updateUser: updateUserResolver
};