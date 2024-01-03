import React, { FC } from 'react'
import { LocationIcon } from '@/assets/icons'
import { useGeoLocation } from '@/hooks/common'

const AddressDisplay: FC = () => {
  const { address } = useGeoLocation()
  
  return address ? (
    <div className="flex items-center gap-2">
      <div>{address}</div>
      <LocationIcon />
    </div>
  ) : null
}

export default AddressDisplay
