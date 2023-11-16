import { baseUrl } from '@/constants'
import { GetResponseType, ISpecialistTypes } from '@/types'

export const getSpecialistTypes = async (): Promise<GetResponseType<ISpecialistTypes[]>> => {
  const res = await fetch(`${baseUrl}/specialist/types/`)
  return res.json()
}
