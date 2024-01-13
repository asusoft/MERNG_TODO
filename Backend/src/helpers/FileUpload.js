import { uuidv4 } from 'uuid'
import { bucket } from '../../init-firebase'

export const uploadFile = (path) => {
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
