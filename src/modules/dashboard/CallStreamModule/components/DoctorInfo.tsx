import { baseUrl } from '@/constants'
import { ChatRoomDoctorType } from '@/types'
import Image from 'next/image'

interface DoctorInfoProps {
  selectedDoctor: ChatRoomDoctorType
}

const DoctorInfo: React.FC<DoctorInfoProps> = ({ selectedDoctor }) => {
  if (!selectedDoctor) return null

  return (
    <div className="absolute top-10 left-10 z-[60] flex items-center gap-5 px-5 py-2 rounded-md bg-white/50">
      <Image
        src={`${baseUrl}/${selectedDoctor.image}`}
        alt={selectedDoctor.name}
        width={56}
        height={56}
        className="rounded-full"
      />
      <div>
        <h4>{selectedDoctor.name}</h4>
        <p className="text-sm uppercase">{selectedDoctor.type}</p>
      </div>
    </div>
  )
}

export default DoctorInfo
