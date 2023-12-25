import { addDoctorAdviceApi } from '@/api'
import { useCustomMutation } from './common'
import { DoctorFieldParamsType, IDoctorAppointmentResponse } from '@/types/doctor'

export const useAddDoctorAdviceMutation = () =>
  useCustomMutation<DoctorFieldParamsType, IDoctorAppointmentResponse>(addDoctorAdviceApi)
