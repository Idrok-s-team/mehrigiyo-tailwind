import { FC } from 'react'
import { formatDate } from '@/utils'

type Props = {
  hashtag: string
  date: string
}

const HashtagTime: FC<Props> = ({ hashtag, date }) => {
  return (
    <div className="flex items-center gap-1 text-sm flex-wrap">
      <span className="text-green-primary">#{hashtag}</span>
      <span className="w-1 h-1 rounded-full bg-[#C4C4C4]"></span>
      <span className="text-[#C4C4C4]">{formatDate(date)}</span>
    </div>
  )
}

export default HashtagTime
