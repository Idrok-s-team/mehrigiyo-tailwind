import clsx from 'clsx'
import { FC } from 'react'

interface IProps {
  day: string
  date: string
  isSelected: boolean
  onSelect: () => void
}

const DayCard: FC<IProps> = ({ day, date, isSelected, onSelect }) => {
  const classes = clsx(
    ' w-[62px] h-[72px] rounded-2xl border flex flex-col items-center justify-center cursor-pointer duration-300 transition-colors ease-in-out',
    {
      'bg-green-primary text-white': isSelected,
      'border-[#DEE1E6] bg-white': !isSelected,
    },
  )

  return (
    <div onClick={onSelect} className={classes}>
      <small className={isSelected ? 'font-medium' : ''}>{day}</small>
      <h5 className="font-normal">{date}</h5>
    </div>
  )
}

export default DayCard
