import React, { FC, useRef } from 'react'
import Image from 'next/image'
import uploadIcon from '@/assets/images/common/uploadImage.png'
import { useAuthStore } from '@/store'
import { CloseRoundIcon } from '@/assets/icons'
import { ActionButton } from '..'

type Props = {}

const Upload: FC<Props> = () => {
  const { selectedAuthImage, updateAuthState } = useAuthStore()
  const fileInputRef = useRef<HTMLInputElement>(null)

  function beforeUpload(file: File): boolean {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      alert('Faqat JPG/PNG fayl yuklash kerak!')
      return false
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      alert(`Rasm hajmi 2MB dan kichik bo'lishi kerak`)
      return false
    }
    return true
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files ? event.target.files[0] : null
    if (file && beforeUpload(file)) {
      updateAuthState('selectedAuthImage', file)
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="flex items-center justify-center rounded-lg">
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleFileChange}
        accept="image/jpeg, image/png"
        onClick={(event) => (event.currentTarget.value = '')}
      />
      {selectedAuthImage ? (
        <div className="w-full p-1 flex items-center justify-between rounded-md border">
          <div className="flex items-center gap-2">
            <Image
              src={URL.createObjectURL(selectedAuthImage)}
              alt="Preview"
              width={60}
              height={60}
              className="w-14 h-14 object-cover rounded-md"
            />
            <p className="text-sm">{selectedAuthImage.name}</p>
          </div>
          <ActionButton isHoverable className="scale-75" onClick={() => updateAuthState('selectedAuthImage', null)}>
            <CloseRoundIcon />
          </ActionButton>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center cursor-pointer" onClick={handleUploadClick}>
          <Image src={uploadIcon} alt="Upload Icon" width={100} height={100} />
          <p className="text-sm text-gray-700">Rasm yuklang (ixtiyoriy)</p>
        </div>
      )}
    </div>
  )
}

export default Upload
