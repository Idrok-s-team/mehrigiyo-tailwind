import { GetResponseType, GetResponseWithStatusType } from '@/types'
import { getDoctorAdviceApi, getDoctorTypesApi, getDoctorsApi } from '@/api'
import { QueryProps, useGetQuery } from './common'
import { DoctorAdviceParamsType, IDoctor, IDoctorAdvice, IDoctorTypes } from '@/types/doctor'

export const useDoctorsQuery = (props?: QueryProps<GetResponseType<IDoctor[]>>) =>
  useGetQuery('doctors', getDoctorsApi, [], props)

export const useDoctorTypesQuery = (props?: QueryProps<GetResponseType<IDoctorTypes[]>>) =>
  useGetQuery('doctor-types', getDoctorTypesApi, [], props)

export const useDoctorAdviceQuery = (
  params: Partial<DoctorAdviceParamsType>,
  props?: QueryProps<GetResponseWithStatusType<IDoctorAdvice[]>>,
) => useGetQuery('doctor-advice', getDoctorAdviceApi, [params], props)
