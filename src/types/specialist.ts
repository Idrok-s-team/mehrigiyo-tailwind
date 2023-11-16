import { LocalizedNamesType } from './common'

export interface ISpecialistTypes extends LocalizedNamesType {
  readonly id: number
  image: string
  get_doctors_count: number;
}
