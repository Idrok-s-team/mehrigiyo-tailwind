import clsx from 'clsx'
import { FC } from 'react'

interface IProps {
  timeRange: string
  isSelected: boolean
  onSelect: () => void
}

const TimeRangeCard: FC<IProps> = ({ timeRange, isSelected, onSelect }) => {
  const classes = clsx(
    'w-full px-7 py-4 border border-[#DEE1E6] rounded-xl cursor-pointer duration-300 transition-colors ease-in-out',
    {
      'bg-green-primary text-white': isSelected,
      'border-[#DEE1E6] text-[#9093A3] bg-white': !isSelected,
    },
  )

  return (
    <div onClick={onSelect} className={classes}>
      {timeRange}
    </div>
  )
}

export default TimeRangeCard
