import { Tooltip } from '@/components'
import clsx from 'clsx'
import { FC } from 'react'

interface IProps {
  timeRange: string
  isSelected: boolean
  isBooked?: boolean
  onSelect: () => void
}

const TimeRangeCard: FC<IProps> = ({ timeRange, isSelected, isBooked, onSelect }) => {
  const cardClasses = clsx(
    'w-full px-7 py-4 border border-[#DEE1E6] rounded-xl cursor-pointer duration-300 transition-colors ease-in-out flex items-center justify-between',
    {
      'bg-green-primary text-white': isSelected,
      'border-[#DEE1E6] text-[#9093A3] bg-white': !isSelected,
      '!bg-green-primary/10 text-[#9093A3] !cursor-not-allowed': isBooked,
    },
  )

  return isBooked ? (
    <Tooltip text="Band qilingan">
      <div className={cardClasses}>
        <span>{timeRange}</span>
        <span className='text-green-primary font-medium italic'>Band</span>
      </div>
    </Tooltip>
  ) : (
    <div onClick={onSelect} className={cardClasses}>
      {timeRange}
    </div>
  )
}

export default TimeRangeCard
