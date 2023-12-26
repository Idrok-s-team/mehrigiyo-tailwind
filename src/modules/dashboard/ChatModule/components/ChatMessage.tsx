import Image from 'next/image'
import { FC } from 'react'
import dayjs from 'dayjs'
import { DateFormat } from '@/constants'
import { IChatMessage, IUserMe } from '@/types'
import clsx from 'clsx'

interface IProps {
  message: IChatMessage
  currentUser?: IUserMe
}

const ChatMessage: FC<IProps> = ({ message, currentUser }) => {
  const isCurrentUser = currentUser?.id === message.owner

  const messageCardClasses = clsx('py-2.5 px-4 text-sm', {
    'rounded-t-2xl rounded-bl-2xl bg-green-primary text-white': isCurrentUser,
    'rounded-t-2xl rounded-br-2xl bg-green-primary/10': !isCurrentUser,
  })

  const messageTimeClasses = clsx('text-[#9093A3] ', {
    'flex justify-end mt-1 mr-2.5': isCurrentUser,
    'mt-2.5 ml-2.5 ': !isCurrentUser,
  })

  const renderAvatar = () => (
    <Image src={currentUser?.avatar as string} width={35} height={35} alt="" className="w-9 h-9 rounded-full" />
  )

  return (
    <div className={`flex ${isCurrentUser ? 'justify-end' : ''} gap-3 my-5`}>
      {!isCurrentUser && renderAvatar()}
      <div className="max-w-[40%]">
        <div className={messageCardClasses}>
          <p>{message.text}</p>
        </div>
        <small className={messageTimeClasses}>{dayjs(message.created_at).format(DateFormat.LOCAL_TIME)}</small>
      </div>
      {isCurrentUser && renderAvatar()}
    </div>
  )
}

export default ChatMessage
