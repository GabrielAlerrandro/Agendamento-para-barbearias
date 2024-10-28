"use server"
import { db } from "@/lib/prisma"
export const fetchBarbershops = async () => {
  try {
    const barbershops = await db.barbershop.findMany({})
    return barbershops
  } catch (error) {
    console.error("Erro ao buscar barbearias:", error)
    throw error
  }
}
