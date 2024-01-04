import { CommentQuestionErrorType, GetResponseWithStatusType, ICommentQuestion } from '@/types'
import { addCommentQuestion } from '@/api'
import { useCustomMutation } from './common'

export const useAddCommentQuestion = () =>
  useCustomMutation<Omit<ICommentQuestion, 'id'>, GetResponseWithStatusType<string | CommentQuestionErrorType>>(
    addCommentQuestion,
  )
