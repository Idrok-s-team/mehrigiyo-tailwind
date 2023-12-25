import { addDoctorAdviceApi } from '@/api'
import { useCustomMutation } from './common'
import { DoctorFieldParamsType } from '@/types/doctor'
import { GetResponseWithStatusType } from '@/types'

export const useAddDoctorAdviceMutation = () =>
  useCustomMutation<DoctorFieldParamsType, GetResponseWithStatusType<string>>(addDoctorAdviceApi)
