import { useRouter } from 'next/navigation'
import React from 'react'
import { IoArrowBack } from 'react-icons/io5'

function BackButton() {
    const router = useRouter()
    return (
        <button
            onClick={() => router.back()}
            className="w-fit inline-flex items-center gap-2 text-white bg-blue-600 px-2 rounded-md py-2 shadow hover:bg-blue-700 transition-all"
        >
            <IoArrowBack className="text-xl" />
            <span className="font-medium">Back</span>
        </button>
    )
}

export default BackButton