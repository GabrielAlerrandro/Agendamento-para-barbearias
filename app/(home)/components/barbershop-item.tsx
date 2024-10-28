"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Barbershop } from "@prisma/client"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface BarbershopItemProps {
  barbershop: Barbershop
}

const BarbershopItem = ({ barbershop }: BarbershopItemProps) => {
  const router = useRouter()
  const handleBookingClick = () => {
    router.push(`/barbershop/${barbershop.id}`)
  }

  return (
    <Card className="min-w-[167px] max-w-[167px] rounded-2xl">
      <CardContent className="px-1 pb-0">
        <div className="px-1 relative w-full h-[159px]">
          <Image
            src={barbershop.imageUrl}
            alt="Imagem da barbearia"
            fill
            style={{ objectFit: "cover" }}
            className="rounded-2xl"
          />
        </div>

        <div className="px-2 pb-0">
          <h2 className="font-bold mt-2 overflow-hidden text-ellipsis text-nowrap ">
            {barbershop.name}
          </h2>
          <p className="text-sm text-gray-400 overflow-hidden text-ellipsis text-nowrap">
            {barbershop.address}
          </p>
        </div>
      </CardContent>

      <Button
        variant="secondary"
        className="w-full mt-3"
        onClick={handleBookingClick}
      >
        Reservar
      </Button>
    </Card>
  )
}

export default BarbershopItem
