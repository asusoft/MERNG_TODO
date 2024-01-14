import { decrypt } from "../../../../helpers/CipherUtils.js";
import { getToken } from "../../../../helpers/tokenization.js";
import { ErrorStatus } from "../../../../helpers/Constants.js";

export const signInResolver = async (_, { input }, { db }) => {
    const user = await db.collection('Users').findOne({ email: input.email });
    const isPasswordCorrect = user && decrypt(input.password, user.password)

    if (!user || !isPasswordCorrect) {
        return { status: ErrorStatus.INVALID_INPUT_DATA };
    }

    return {
        user,
        token: getToken(user)
    };
};