export interface ICommentQuestion {
  readonly id: number
  full_name: string
  email: string
  phone: string
  question: string
  answer: boolean
}

export type CommentQuestionErrorType = Record<keyof ICommentQuestion, string[]>
