import { uuidv4 } from 'uuid'
import { bucket } from '../../init-firebase.js'

export const FileUpload = async (path) => {
    bucket.upload(path, {
        destination: 'files/avatars',
        metadata: {
            metadata: {firebaseStorageDownloadTokens: uuidv4()}
        }
    }).then(res => {
        return res
    }).catch(err=>{
        return err
    })
}
