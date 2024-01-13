import { v4 } from 'uuid'
import { bucket } from '../../init-firebase.js'

export const FileUpload = async (path) => {
    try {
        const res = await bucket.upload(path, {
            destination: 'files/avatars.jpg',
            metadata: {
                metadata: { firebaseStorageDownloadTokens: v4() }
            }
        });

        const file = res[0];
        const signedUrlConfig = { action: 'read', expires: '03-09-2491' };
        const [url] = await file.getSignedUrl(signedUrlConfig);

        return url;
    } catch (error) {
        throw error;
    }
};
