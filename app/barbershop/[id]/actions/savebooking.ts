"use server"

import { db } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

interface SaveBookingParams {
  barbershopId: string
  serviceId: string
  userId: string
  date: Date
}
export const saveBooking = async (params: SaveBookingParams) => {
  await db.booking.create({
    data: {
      serviceID: params.serviceId,
      userID: params.userId,
      barbershopID: params.barbershopId,
      date: params.date,
    },
  })

  revalidatePath("/")
  revalidatePath("/bookings")
}
