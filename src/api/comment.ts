import { CommentQuestionErrorType, GetResponseWithStatusType, ICommentQuestion } from '@/types'
import { authorizedFetchApi } from './common'

export const addCommentQuestion = async (
  body: Omit<ICommentQuestion, 'id'>,
): Promise<GetResponseWithStatusType<string | CommentQuestionErrorType>> => {
  return authorizedFetchApi('/comment/question/', 'POST', { body, withAuth: false })
}
