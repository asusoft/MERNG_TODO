import { decrypt } from "../../../../helpers/CipherUtils.js";
import { getToken } from "../../../../helpers/tokenization.js";

export const signInResolver = async (_, { input }, { db }) => {
    const user = await db.collection('Users').findOne({ email: input.email });
    const isPasswordCorrect = user && decrypt(input.password, user.password)

    if (!user || !isPasswordCorrect) {
        throw new Error('Invalid Credentials')
    }

    return {
        user,
        token: getToken(user)
    };
};