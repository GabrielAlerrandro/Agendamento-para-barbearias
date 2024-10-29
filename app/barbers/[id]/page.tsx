import { getServerSession } from "next-auth"
import { db } from "@/lib/prisma"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { authOptions } from "@/lib/auth"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { format } from "date-fns"

interface paramsProp {
  params: {
    id?: string
  }
}

const BarbershopPage = async ({ params }: paramsProp) => {
  const { id } = params
  const session = await getServerSession(authOptions)

  if (!session) {
    return <p>Acesso negado. Você precisa estar logado.</p>
  }

  const user = session.user
  if (!user || !user.isBarber || user.barbershopID !== id) {
    return (
      <p>
        Acesso negado. Somente barbeiros desta barbearia podem acessar essa
        página.
      </p>
    )
  }
  const barbershop = await db.barbershop.findUnique({
    where: { id },
  })

  if (!barbershop) {
    return <p>Barbearia não encontrada.</p>
  }

  const confirmedBookings = await db.booking.findMany({
    where: {
      barbershopID: id,
      date: {
        gte: new Date(),
      },
    },
    include: {
      service: true,
      user: true,
    },
  })

  return (
    <div className="mt-6">
      <h2 className="text-sm uppercase text-gray-400 font-bold mb-3 pl-5">
        agendamentos para hoje
      </h2>
      {confirmedBookings.length > 0 ? (
        <>
          <div className=" px-5 flex gap-3 overflow-x-auto  [&::-webkit-scrollbar]:hidden">
            {confirmedBookings.map((booking) => (
              <Card key={booking.id}>
                <CardContent className="p-3 w-full">
                  <div className="flex gap-4 items-center w-full">
                    <div className="relative min-h-[110px] min-w-[110px] max-h-[110px] max-w-[110px]">
                      <Image
                        className="rounded-lg"
                        src={booking.service.imageUrl}
                        fill
                        style={{ objectFit: "contain" }}
                        alt={booking.service.name}
                      />
                    </div>

                    <div className="flex flex-col w-full">
                      <h2 className="font-bold">{booking.service.name}</h2>
                      <p className="text-sm text-gray-400">
                        {booking.service.description}
                      </p>

                      <div className="flex items-center justify-between mt-3">
                        <p className="text-primary text-sm font-bold">
                          {Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }).format(Number(booking.service.price))}
                        </p>
                        <p className="text-primary text-sm font-bold">
                          {format(booking.date, "k':'mm")}
                        </p>
                      </div>
                      <div className="flex items-center mt-1">
                        <Avatar className="h-6 w-6">
                          <AvatarImage
                            src={
                              booking.user.image
                                ? booking.user.image
                                : undefined
                            }
                          ></AvatarImage>
                          <AvatarFallback>
                            {booking.user.name
                              ? booking.user.name.split("")[0]
                              : "usuario".split("")[0]}
                          </AvatarFallback>
                        </Avatar>
                        <p>{booking.user.name}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      ) : (
        <p>Não há agendamentos para esta barbearia.</p>
      )}
    </div>
  )
}

export default BarbershopPage
