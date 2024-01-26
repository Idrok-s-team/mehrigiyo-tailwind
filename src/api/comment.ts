import { CommentQuestionErrorType, GetResponseWithStatusType, ICommentQuestion } from '@/types'
import { fetchApi } from './common'

export const addCommentQuestion = async (
  body: Omit<ICommentQuestion, 'id'>,
): Promise<GetResponseWithStatusType<string | CommentQuestionErrorType>> => {
  return fetchApi('/comment/question/', 'POST', { body })
}
