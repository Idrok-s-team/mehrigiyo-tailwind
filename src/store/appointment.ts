import { IDoctor } from '@/types/doctor'
import { create } from 'zustand'

interface IAppointmentStore {
  selectedDoctor: IDoctor | null
  selectedDay: string | null
  selectedRangeTime: string | null
  updateAppointmentState: <K extends keyof Omit<IAppointmentStore, 'updateAppointmentState'>>(
    key: K,
    value: IAppointmentStore[K],
  ) => void
}

const useAppointmentStore = create<IAppointmentStore>((set) => ({
  selectedDoctor: null,
  selectedDay: null,
  selectedRangeTime: null,
  updateAppointmentState: (key, value) => set({ [key]: value }),
}))

export default useAppointmentStore
