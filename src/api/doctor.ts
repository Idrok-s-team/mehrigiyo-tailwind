import { GetResponseType, QueryParamsType } from '@/types'
import { authorizedFetchApi, fetchApi } from './common'
import { DoctorFieldParamsType, IDoctor, IDoctorAppointmentResponse, IDoctorTypes } from '@/types/doctor'

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

export const addDoctorAdviceApi = async (body: DoctorFieldParamsType): Promise<IDoctorAppointmentResponse> => {
  return authorizedFetchApi('/specialist/advice/', 'POST', { body })
}
