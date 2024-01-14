import { FileUpload } from "../../../../helpers/FileUpload.js";

export const UploadFileResolver = async (_, { file }, { db, user }) => {
    if (!user) { throw new Error('Unauthenticated'); }
    try {
        const response = await FileUpload(file);
        return response || 'No response'; 
    } catch (error) {
        throw error; 
    }
};