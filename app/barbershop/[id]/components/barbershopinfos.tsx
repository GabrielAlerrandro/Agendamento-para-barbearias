"use client"
import { ChevronLeftIcon, MapPinIcon, StarIcon } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Barbershop } from "@prisma/client"
import { useRouter } from "next/navigation"

interface BarbershopInfoProps {
  barbershop: Barbershop
}

const BarbershopInfos = ({ barbershop }: BarbershopInfoProps) => {
  const router = useRouter()
  const handleBackClick = () => {
    router.replace("/")
  }

  return (
    <div>
      <div className="h-[250px] w-full relative">
        <Button
          variant="outline"
          size="icon"
          className="z-50 top-4 left-4 absolute"
          onClick={handleBackClick}
        >
          <ChevronLeftIcon></ChevronLeftIcon>
        </Button>

        <Image
          src={barbershop.imageUrl}
          fill
          alt={`Imagem da barbearia ${barbershop.name}`}
          style={{ objectFit: "cover" }}
          className="opacity-85"
        ></Image>
      </div>

      <div className="px-5 pt-3 pb-6 border-b border-solid border-secondary ">
        <h1 className="font-bold text-xl">{barbershop.name}</h1>
        <div className="flex items-center gap-1 mt-2">
          <MapPinIcon className="text-primary" size={18}></MapPinIcon>
          <p className="text-sm">{barbershop.address}</p>
        </div>
        <div className="flex items-center gap-1 mt-2">
          <StarIcon className="text-primary" size={18}></StarIcon>
          <p className="text-sm">5,0 (2000 avaliações)</p>
        </div>
      </div>
    </div>
  )
}

export default BarbershopInfos
