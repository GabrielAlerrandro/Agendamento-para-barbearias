"use client"

import { FaWhatsapp } from "react-icons/fa"
import React from "react"
import { Button } from "@/components/ui/button"

interface SupportButton {
  phoneNumber: string
}

const SupportButton = ({ phoneNumber }: SupportButton) => {
  const handleClick = () => {
    const whatsappUrl = `https://wa.me/${phoneNumber}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <div className="fixed bottom-5 right-5 flex items-center justify-center z-50 group">
      <div className="absolute bottom-20 mb-2 hidden group-hover:block text-sm bg-secondary text-white rounded-lg px-3 py-2 shadow-lg z-10">
        Fale conosco no Zap
      </div>

      <Button
        onClick={handleClick}
        className="group transition-all duration-300 ease-in-out flex items-center justify-center w-16 h-16 bg-primary border-secondary hover:bg-primary text-secondary font-semibold rounded-full shadow-lg hover:border-4 hover:border-secondary"
      >
        <FaWhatsapp size={24} />
      </Button>
    </div>
  )
}

export default SupportButton
