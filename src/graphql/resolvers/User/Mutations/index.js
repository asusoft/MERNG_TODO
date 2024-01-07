import { signUpResolver } from './sign-up.js';
import { signInResolver } from './sign-in.js';

export const UserMutationResolvers = {
   
        signUp: signUpResolver,
        signIn: signInResolver
    
};