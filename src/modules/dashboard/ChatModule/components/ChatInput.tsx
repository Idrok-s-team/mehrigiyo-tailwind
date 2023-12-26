import React, { FC, FormEvent, InputHTMLAttributes } from 'react'
import { SendChatIcon } from '@/assets/icons'
import { ActionButton } from '@/components'

type Props = InputHTMLAttributes<HTMLInputElement> & {
  onSubmit?: (e: FormEvent<HTMLFormElement | HTMLInputElement>) => void
}

const ChatInput: FC<Props> = ({ onSubmit, ...props }) => {
  return (
    <form className="relative bg-red-200 h-full w-full  rounded-xl flex items-center" onSubmit={onSubmit}>
      <input
        {...props}
        className="flex-1 h-full px-[13px] pr-[40px] placeholder:text-sm text-sm outline-green-primary rounded-xl"
      />
      <ActionButton
        isHoverable
        className="absolute right-1 h-full px-[10px] flex items-center justify-center"
        type="submit"
      >
        <SendChatIcon />
      </ActionButton>
    </form>
  )
}

export default ChatInput
