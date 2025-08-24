'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { CreateTenderModal } from './create-tender-modal'

export function AddTenderButton() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-sm"
      >
        <Plus className="h-5 w-5 mr-2" />
        Add New Tender
      </button>

      <CreateTenderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}
