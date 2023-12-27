import React, { FC, FormEvent, InputHTMLAttributes, TextareaHTMLAttributes, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { CloseRoundIcon, SendChatIcon } from '@/assets/icons'
import { ActionButton } from '@/components'
import { useChatStore } from '@/store'

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  onSubmit?: (e: FormEvent<HTMLFormElement | HTMLInputElement>) => void
}

const ChatInput: FC<Props> = ({ onSubmit, ...props }) => {
  const [textAreaHeight, setTextAreaHeight] = useState('auto')
  const { selectedChatFile, updateChatState } = useChatStore()
  const textAreaRef = useRef<HTMLTextAreaElement>()

  const handleRemoveFile = () => {
    updateChatState('selectedChatFile', null)
  }

  const autoResizeTextarea = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto'
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`
    }
  }

  return (
    <div
      className="relative bg-red-200 h-full w-full rounded-xl flex items-center"
      // onSubmit={onSubmit}
    >
      {selectedChatFile && (
        <div className="absolute z-10 bottom-12 left-2 flex items-center w-14 h-14 rounded-xl hover:shadow-secondary">
          <Image
            src={URL.createObjectURL(selectedChatFile)}
            alt={selectedChatFile.name}
            className="object-cover rounded-xl w-14 h-14 border border-gray-200"
            width={56}
            height={56}
          />
          <button
            className="absolute -top-2 -right-2 border border-gray-primary rounded-full"
            type="button"
            title="Faylni o'chirish"
            onClick={handleRemoveFile}
          >
            <CloseRoundIcon width={20} height={20} />
          </button>
        </div>
      )}
      <div className={`absolute w-full h-full flex-1 bg-green-200 ${selectedChatFile ? 'pt-[150px]' : ''}`}>
        <textarea
          {...props}
          ref={textAreaRef}
          style={{ height: textAreaHeight }}
          className="absolute bottom-10 flex items-center w-full px-[13px] pr-[40px] placeholder:text-sm pt-1.5 text-sm outline-green-primary bg-yellow-200 rounded-xl resize-none overflow-hidden"
          onInput={autoResizeTextarea}
        />
      </div>
      <ActionButton
        isHoverable
        className="absolute right-1 h-full px-[10px] flex items-center justify-center"
        type="submit"
      >
        <SendChatIcon />
      </ActionButton>
    </div>
  )
}

export default ChatInput
