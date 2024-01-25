import { GetResponseWithStatusType, IChatFile, ChatFieldParamsType } from '@/types'
import { addChatFileApi } from '@/api'
import { useCustomMutation } from './common'

export const useAddChatFileMutation = () =>
  useCustomMutation<Pick<ChatFieldParamsType, 'size' | 'video'> & Pick<ChatFieldParamsType, 'pk'>, GetResponseWithStatusType<IChatFile>>(
    addChatFileApi as any,
  )


// export const useAddChatFileMutation = () =>
//   useCustomMutation<
//     { body: Pick<ChatFieldParamsType, 'size' | 'video'>; params: Pick<ChatFieldParamsType, 'pk'> },
//     GetResponseWithStatusType<IChatFile>
//   >(addChatFileApi)
