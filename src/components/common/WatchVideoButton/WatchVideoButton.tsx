'use client'

import React, { FC, useState } from 'react'
import { VideoPlayIcon } from '@/assets/icons'
import { Loader, Modal } from '..'

interface IProps {
  className?: string
  videoUrl: string
}

const WatchVideoButton: FC<IProps> = ({ className, videoUrl }) => {
  const [isModalOpen, setModalOpen] = useState(false)
  const [iframeLoading, setIframeLoading] = useState(true)

  const openModal = () => {
    setModalOpen(true)
    setIframeLoading(true)
  }

  const closeModal = () => setModalOpen(false)

  return (
    <>
      <button className={`flex items-center gap-3 cursor-pointer ${className}`} onClick={openModal}>
        <span className="flex items-center justify-center w-11 h-11 rounded-full bg-gray-primary">
          <VideoPlayIcon />
        </span>
        <span className="text-gray-primary">Videoni ko’rish</span>
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={() => {}}
        withFooter={false}
        className="w-[70%] max-lg:w-full"
        isVideo
      >
        {iframeLoading && (
          <div className="absolute left-[48%] top-[48%]">
            <Loader />
          </div>
        )}

        <iframe
          src={videoUrl}
          title="Doctor ali shifobaxsh choylari"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          onLoad={() => setIframeLoading(false)}
          className="w-full h-[70vh] rounded-xl mx-auto max-sm:h-[50vh]"
        />
      </Modal>
    </>
  )
}

export default WatchVideoButton
