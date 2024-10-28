import { db } from "@/lib/prisma"
import { hash } from "bcrypt"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { name, email, password, isBarber, barbershopID } = await req.json()

  if (!name || !email || !password) {
    return NextResponse.json(
      { error: "Todos os campos são obrigatórios." },
      { status: 400 }
    )
  }

  try {
    const hashedPassword = await hash(password, 10)
    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        isBarber,
        barbershopID,
      },
    })

    return NextResponse.json(user, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Erro ao criar usuário" },
      { status: 500 }
    )
  }
}
