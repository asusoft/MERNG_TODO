import { FileUpload } from "../../helpers/FileUpload.js";

export const UploadFileResolver = async (_, { file }, { db, user }) => {
    if (!user) { throw new Error('Unauthenticated') }

    const response = await FileUpload(file)

    console.log(response)
    
};