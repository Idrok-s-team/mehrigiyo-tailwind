import { GetResponseType, GetResponseWithStatusType, QueryParamsType } from '@/types'
import { authorizedFetchApi, fetchApi } from './common'
import { DoctorAdviceParamsType, DoctorFieldParamsType, IDoctor, IDoctorAdvice, IDoctorTypes } from '@/types/doctor'

// DOCTORS API
export const getDoctorsApi = async (params?: QueryParamsType) => {
  return fetchApi<GetResponseType<IDoctor[]>>('/specialist/doctors/', params)
}

export const getDoctorByIdApi = async (id: number, params?: QueryParamsType) => {
  return fetchApi<IDoctor>(`/specialist/doctors/${id}/`, params)
}

export const getDoctorTypesApi = async () => {
  return fetchApi<GetResponseType<IDoctorTypes[]>>('/specialist/types/')
}

export const getDoctorAdviceApi = async (
  params: Partial<DoctorAdviceParamsType>,
): Promise<GetResponseWithStatusType<IDoctorAdvice[]>> => {
  return authorizedFetchApi('/specialist/advice/', 'GET', { params })
}

export const addDoctorAdviceApi = async (body: DoctorFieldParamsType): Promise<GetResponseWithStatusType<string>> => {
  return authorizedFetchApi('/specialist/advice/', 'POST', { body })
}
