"use server"

import { db } from "@/lib/prisma"
import { endOfDay, startOfDay } from "date-fns"

export const getDayBookings = async (date: Date, barbershopID: string) => {
  const bookings = await db.booking.findMany({
    where: {
      barbershopID,
      date: {
        lte: endOfDay(date),
        gte: startOfDay(date),
      },
    },
  })

  return bookings
}
