import { LocalizedType } from './common'

export interface ISpecialistTypes extends LocalizedType<'name'> {
  readonly id: number
  image: string
  get_doctors_count: number
}
