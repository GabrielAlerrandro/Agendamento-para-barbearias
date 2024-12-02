/* eslint-disable @typescript-eslint/no-explicit-any */
import { ptBR } from "date-fns/locale"
import Header from "../../components/ui/header"
import { format } from "date-fns"
import BookingItem from "@/components/ui/booking-item"
import { db } from "../../lib/prisma"
import BarbershopItem from "./components/barbershop-item"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import Search from "@/components/ui/search"
import SupportButton from "./components/support-button"

export default async function Home() {
  const session = await getServerSession(authOptions)
  const phoneNumber = "5511999999999"
  const [barbershops, confirmedBookings] = await Promise.all([
    db.barbershop.findMany({}),
    session?.user
      ? db.booking.findMany({
          where: {
            userID: (session.user as any).id,
            date: {
              gte: new Date(),
            },
          },
          include: {
            service: true,
            barbershop: true,
          },
        })
      : Promise.resolve([]),
  ])
  return (
    <div>
      <Header />
      <SupportButton phoneNumber={phoneNumber} />
      <div className="px-5 mt-2 flex items-center justify-center  ">
        <Search barbershops={barbershops} />
      </div>
      <div className="px-5 pt-5">
        <h2 className="text-xl font-bold">
          {session?.user
            ? `Olá, ${session.user.name?.split(" ")[0]}!`
            : "Olá! Vamos agendar um corte hoje?"}
        </h2>
        <p className="capitalize text-sm">
          {format(new Date(), "EEEE, dd 'de' MMMM ", { locale: ptBR })}
        </p>
      </div>
      <div className="mt-6">
        {confirmedBookings.length > 0 && (
          <>
            <h2 className="text-sm uppercase text-gray-400 font-bold mb-3 pl-5">
              agendamentos
            </h2>
            <div className=" px-5 flex gap-3 overflow-x-auto  [&::-webkit-scrollbar]:hidden">
              {confirmedBookings.map((booking) => (
                <BookingItem key={booking.id} booking={booking} />
              ))}
            </div>
          </>
        )}
      </div>
      <div className="mt-6 mb-[4.5rem]">
        <h2 className="text-sm uppercase text-gray-400 font-bold mb-3 px-5">
          recomendados
        </h2>
        <div className="flex px-5 gap-4 overflow-x-auto  [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarbershopItem barbershop={barbershop} key={barbershop.id} />
          ))}
        </div>
      </div>
    </div>
  )
}
