import { LocalizedType } from './common'

export interface INews extends LocalizedType<'name' | 'description'> {
  readonly id: number
  image: string
  hashtag: INewsTags
  created_at: string
}

export interface INewsTags extends LocalizedType<'tag_name'> {
  readonly id: number
}
