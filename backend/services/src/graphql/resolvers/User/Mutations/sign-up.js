import { encrypt } from "../../../../helpers/CipherUtils.js";
import { getToken } from "../../../../helpers/tokenization.js";


export const signUpResolver = async (_, { input }, { db }) => {
    const hashedPassword = encrypt(input.password)
    const newUser = {
        ...input,
        password: hashedPassword
    }

    const result = await db.collection('Users').insertOne(newUser)

    if (result.acknowledged && result.insertedId) {
        const user = await db.collection('Users').findOne({ _id: result.insertedId });
        return {
            user,
            token: getToken(user)
        };
    }
};