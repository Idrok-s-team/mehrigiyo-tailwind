import { GetResponseType, GetResponseWithStatusType, QueryParamsType } from '@/types'
import { fetchApi } from './common'
import { DoctorAdviceParamsType, DoctorFieldParamsType, IDoctor, IDoctorAdvice, IDoctorTypes } from '@/types/doctor'

// DOCTORS API
export const getDoctorsApi = async (params?: QueryParamsType) => {
  return fetchApi<GetResponseType<IDoctor[]>>('/specialist/doctors/', 'GET', { params })
}

export const getDoctorByIdApi = async (id: number, params?: QueryParamsType) => {
  return fetchApi<IDoctor>(`/specialist/doctors/${id}/`, 'GET', { params })
}

export const getDoctorTypesApi = async () => {
  return fetchApi<GetResponseType<IDoctorTypes[]>>('/specialist/types/')
}

export const getDoctorAdviceApi = async (
  params: Partial<DoctorAdviceParamsType>,
): Promise<GetResponseWithStatusType<IDoctorAdvice[]>> => {
  return fetchApi('/specialist/advice/', 'GET', { params, withAuth: true })
}

export const addDoctorAdviceApi = async (body: DoctorFieldParamsType): Promise<GetResponseWithStatusType<string>> => {
  return fetchApi('/specialist/advice/', 'POST', { body, withAuth: true })
}
