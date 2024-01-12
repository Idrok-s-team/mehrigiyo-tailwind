import React, { FC, FormEvent, InputHTMLAttributes, memo, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { CloseRoundIcon, SendChatIcon } from '@/assets/icons'
import { ActionButton } from '@/components/common'
import { useChatStore } from '@/store'

type Props = InputHTMLAttributes<HTMLInputElement> & {
  onSubmit?: (e: FormEvent<HTMLFormElement | HTMLInputElement>) => void
}

const ChatInput: FC<Props> = ({ onSubmit, ...props }) => {
  const [fileUrl, setFileUrl] = useState<string>('')
  const inputRef = useRef<HTMLInputElement | null>(null)
  const { selectedChatFile, updateChatState } = useChatStore()

  useEffect(() => {
    if (selectedChatFile) {
      const newFileUrl = URL.createObjectURL(selectedChatFile)
      setFileUrl(newFileUrl)
    }

    // Clean up the URL on unmount or when file changes
    return () => {
      if (fileUrl) {
        URL.revokeObjectURL(fileUrl)
        setFileUrl('')
      }
    }
  }, [selectedChatFile])

  const handleRemoveFile = () => {
    updateChatState('selectedChatFile', null)
  }

  return (
    <form className="relative w-full rounded-xl flex flex-col" onSubmit={onSubmit}>
      {selectedChatFile && fileUrl && (
        <div className="absolute bottom-[100%] p-2 pb-0 w-full rounded-t-xl bg-white shadow-action-button">
          <div className="relative mb-2 flex items-center w-14 h-14 rounded-xl hover:shadow-secondary">
            <Image
              src={fileUrl}
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
        </div>
      )}
      <div className="relative">
        <input
          {...props}
          placeholder="Xabar yozing..."
          ref={inputRef}
          className={`w-full !h-[40px] px-[13px] pr-[40px] placeholder:text-sm text-sm outline-green-primary rounded-[10px] ${
            selectedChatFile ? 'rounded-t-none focus:border-none focus:outline-none' : ''
          }`}
        />
        <ActionButton
          isHoverable
          className="absolute top-0 right-2 px-[10px] flex items-center justify-center z-50"
          type="submit"
        >
          <SendChatIcon />
        </ActionButton>
      </div>
    </form>
  )
}

export default memo(ChatInput)
