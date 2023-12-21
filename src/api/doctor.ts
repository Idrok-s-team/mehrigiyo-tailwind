import { GetResponseType, QueryParamsType } from '@/types'
import { fetchApi } from './common'
import { IDoctor, IDoctorTypes } from '@/types/doctor'

// DOCTORS API
export const getDoctorsApi = async () => {
  return fetchApi<GetResponseType<IDoctor[]>>('/specialist/doctors/')
}

export const getDoctorByIdApi = async (id: number, params?: QueryParamsType) => {
  return fetchApi<GetResponseType<IDoctor[]>>(`/shop/medicines/${id}/`, params)
}

export const getDoctorTypesApi = async () => {
  return fetchApi<GetResponseType<IDoctorTypes[]>>('/specialist/types/')
}
