import { db } from "@/lib/prisma"
import BarbershopInfos from "./components/barbershopinfos"
import ServiceItem from "./components/service-item"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

interface BarberShopDetailsPageProps {
  params: {
    id?: string
  }
}

const BarbershopDetailsPage = async ({
  params,
}: BarberShopDetailsPageProps) => {
  const session = await getServerSession(authOptions)
  if (!params.id) return null

  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services: true,
    },
  })

  if (!barbershop) return null
  return (
    <div>
      <BarbershopInfos barbershop={barbershop}></BarbershopInfos>
      <div className="px-5 flex flex-col gap-4 py-6">
        {barbershop.services.map((service) => (
          <ServiceItem
            barbershop={barbershop}
            key={service.id}
            service={service}
            isAuthenticated={!!session?.user}
          ></ServiceItem>
        ))}
      </div>
    </div>
  )
}

export default BarbershopDetailsPage
