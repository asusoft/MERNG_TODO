import {ReactNativeFile} from 'apollo-upload-client'

import ImageCropPicker, { ImageOrVideo } from 'react-native-image-crop-picker'
import { File } from '../shared/generated/types/graphql'

export type PickedFileFromDevice = Awaited<ReturnType<typeof pickFromDevice>>

export const getFileNameFromPath = (path: string) => {
    return path.substring(path.lastIndexOf('/') + 1, path.length)
  }

export const createFileFormData = (file: File) => {
  const File = new ReactNativeFile(file)

  return {
    fileToUpload: File,
    source: file,
  }
}

export const pickFromDevice = async (
  mediaType: 'photo' | 'video' | 'any' | undefined = 'photo',
  cropping?: { height: number; width: number; withCircleOverlay?: boolean } | null,
  options?: {
    useCamera?: boolean
    maximumVideoDuration?: number
  },
) => {
  const helpers = {
    chooseFile: async () => {
      const file = await ImageCropPicker[
        options?.useCamera ? 'openCamera' : 'openPicker'
      ]({
        width: cropping?.width,
        height: cropping?.height,
        multiple: false,
        cropping: !!cropping,
        cropperCircleOverlay: cropping?.withCircleOverlay,
        mediaType,
        compressImageQuality: 0.8,
        compressVideoPreset: '1280x720',
        cropperCancelText: 'Cancel',
        cropperChooseText: 'Choose',
        maximumVideoDuration: options?.maximumVideoDuration,
      })

      return file
    },
    createFileFormData: (asset: ImageOrVideo) => {
      type TResult = {
        RNFile: ReactNativeFile
        file: {
          uri: string
          type: string
          name: string
          duration?: number
        }
      }
      let result: TResult

      const file = {
        name: asset.filename || getFileNameFromPath(asset.path),
        type: asset.mime,
        uri: asset.path,
        ...('duration' in asset && asset.duration && { duration: asset.duration }),
      }
      const RNFile = new ReactNativeFile(file)

      result = {
        RNFile,
        file,
      }

      return result
    },
  }
  const asset = await helpers.chooseFile()
 
  const fileFormData = helpers.createFileFormData(asset)
  return fileFormData
}

export const getRNFileFromSource = (
  source: { uri: string; type: string; name: string },
  duration?: number,
) => {
  const file = {
    name: source.name ?? getFileNameFromPath(source.uri),
    type: source.type,
    uri: source.uri,
    ...(duration && { duration }),
  }

  const RNFile = new ReactNativeFile(file) 

  return {
    file: source,
    RNFile,
    duration,
  }
}
