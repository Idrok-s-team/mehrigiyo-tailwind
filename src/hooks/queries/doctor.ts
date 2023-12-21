import { GetResponseType } from '@/types'
import { getDoctorTypesApi, getDoctorsApi } from '@/api'
import { QueryProps, useGetQuery } from './common'
import { IDoctor, IDoctorTypes } from '@/types/doctor'

export const useDoctorsQuery = (props?: QueryProps<GetResponseType<IDoctor[]>>) =>
  useGetQuery('doctors', getDoctorsApi, [], props)

export const useDoctorTypesQuery = (props?: QueryProps<GetResponseType<IDoctorTypes[]>>) =>
  useGetQuery('doctor-types', getDoctorTypesApi, [], props)
