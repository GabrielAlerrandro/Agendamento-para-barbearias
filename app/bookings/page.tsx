import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { db } from "@/lib/prisma"
import Header from "@/components/ui/header"
import BookingItem from "@/components/ui/booking-item"
import { authOptions } from "@/lib/auth"

const BookingsPage = async () => {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return redirect("/")
  }

  const [confirmedBookings, finishedBookings] = await Promise.all([
    db.booking.findMany({
      where: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        userID: (session.user as any).id,
        date: {
          gte: new Date(),
        },
      },
      include: {
        service: true,
        barbershop: true,
      },
    }),
    db.booking.findMany({
      where: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        userID: (session.user as any).id,
        date: {
          lt: new Date(),
        },
      },
      include: {
        service: true,
        barbershop: true,
      },
    }),
  ])
  return (
    <>
      <Header />

      <div className="px-5 py-6">
        <h1 className="text-xl font-bold mt-6">Agendamentos</h1>
        {confirmedBookings.length > 0 && (
          <>
            <h2 className="text-gray-400 uppercase font-bold text-sm  mb-3">
              Confirmados
            </h2>
            <div className="flex flex-col gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
              {confirmedBookings.map((booking) => (
                <BookingItem key={booking.id} booking={booking} />
              ))}
            </div>
          </>
        )}

        {finishedBookings.length > 0 && (
          <>
            <h2 className="text-gray-400 uppercase font-bold text-sm mt-6 mb-3">
              Finalizados
            </h2>
            <div className="flex flex-col gap-3">
              {finishedBookings.map((booking) => (
                <BookingItem key={booking.id} booking={booking} />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default BookingsPage
