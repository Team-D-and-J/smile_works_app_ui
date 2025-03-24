"use client"
import { useRouter } from 'next/navigation'
import React from 'react'
import { IoArrowBack } from 'react-icons/io5'

function BackButton() {
    const router = useRouter()
    return (
        <button
            onClick={() => router.back()}
            className="w-fit inline-flex items-center gap-2 text-white bg-btnDark px-2 rounded-md py-2 shadow transition-all"
        >
            <IoArrowBack className="text-xl" />
            <span className="text-xs">Back</span>
        </button>
    )
}

export default BackButton