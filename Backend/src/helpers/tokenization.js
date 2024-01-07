import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const { JWT_SECRET } = process.env;

export const  getToken = (user) => jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '30 days' })

export const getUserFromToken= async (token, db) => {
    if(!token) { return null}
    const tokenData = jwt.verify(token, JWT_SECRET)

    if(!tokenData.id) {
        return null
    }

    return await db.collection('Users').findOne({ _id: new ObjectId(tokenData.id)})
}