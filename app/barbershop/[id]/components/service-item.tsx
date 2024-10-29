"use client"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Barbershop, Booking, Service } from "@prisma/client"
import { ptBR } from "date-fns/locale"
import { signIn, useSession } from "next-auth/react"
import Image from "next/image"
import { useEffect, useMemo, useState } from "react"
import { generateDayTimeList } from "../helpers/hours"
import { addDays, format, setHours, setMinutes } from "date-fns"
import { saveBooking } from "../actions/savebooking"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { getDayBookings } from "../actions/get-day-bookings"

import { loadStripe } from "@stripe/stripe-js"
import BookingInfo from "@/components/ui/booking-info"

interface ServiceItemProps {
  barbershop: Barbershop
  service: Service
  isAuthenticated: boolean
}

const ServiceItem = ({
  service,
  isAuthenticated,
  barbershop,
}: ServiceItemProps) => {
  const [loading, setLoading] = useState(false)
  const { data } = useSession()
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [hour, setHour] = useState<string | undefined>()
  const [sheetIsOpen, setSheetIsOpen] = useState(false)
  const [dayBookings, setDayBookings] = useState<Booking[]>([])
  const router = useRouter()

  useEffect(() => {
    const hasReservation = localStorage.getItem("reservationCompleted")

    if (hasReservation) {
      const reservationDate = localStorage.getItem("reservationDate")
      if (reservationDate) {
        const newDate = new Date(reservationDate)
        toast("Reserva realizada com sucesso", {
          description: format(newDate, "'Para' dd 'de' MMMM 'às' HH':'mm'.'", {
            locale: ptBR,
          }),
          action: {
            label: "Visualizar",
            onClick: () => router.push("/bookings"),
          },
        })
      }
      localStorage.removeItem("reservationCompleted")
    }
  }, [router])

  useEffect(() => {
    if (!date) {
      return
    }
    const refreshAvaliableHours = async () => {
      const _dayBookings = await getDayBookings(date, barbershop.id)

      setDayBookings(_dayBookings)
    }
    refreshAvaliableHours()
  }, [date, barbershop.id])

  const handleHourClick = (time: string) => {
    setHour(time)
  }

  const handleDateClick = (date: Date | undefined) => {
    setDate(date)
    setHour(undefined)
  }

  const handleBookingSubmit = async () => {
    setLoading(true)
    try {
      if (!hour || !date || !data?.user) {
        return
      }

      const dateFormatted = Number(hour.split(":")[0])
      const dateMinutesFormatted = Number(hour.split(":")[1])

      const newDate = setMinutes(
        setHours(date, dateFormatted),
        dateMinutesFormatted
      )

      const reservationData = {
        serviceId: service.id,
        barbershopId: barbershop.id,
        date: newDate,
        userId: data.user.id,
      }

      await saveBooking(reservationData)
      await handleCheckout(newDate)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const handleCheckout = async (newDate: Date) => {
    const stripe = await stripePromise
    const items = [
      {
        price_data: {
          currency: "brl",
          product_data: {
            name: service.name,
          },
          unit_amount: Math.round(Number(service.price) * 100),
        },
        quantity: 1,
      },
    ]

    const response = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items }),
    })

    const session = await response.json()

    if (response.ok) {
      const result = await stripe?.redirectToCheckout({ sessionId: session.id })
      if (result && result.error) {
        console.error(result.error)
        return null
      }

      await saveBooking({
        serviceId: service.id,
        barbershopId: barbershop.id,
        date: newDate,
        userId: data!.user.id,
      })

      localStorage.setItem("reservationCompleted", "true")
      localStorage.setItem("reservationDate", newDate.toISOString())

      return session.id
    } else {
      console.error("Erro ao criar sessão de checkout: ", session.error)
      return null
    }
  }

  const timeList = useMemo(() => {
    if (!date) {
      return []
    }
    return generateDayTimeList(date).filter((time) => {
      const timeHour = Number(time.split(":")[0])
      const timeMinutes = Number(time.split(":")[1])

      const booking = dayBookings.find((booking) => {
        const bookingHour = booking.date.getHours()
        const bookingMinutes = booking.date.getMinutes()

        return bookingHour === timeHour && bookingMinutes === timeMinutes
      })

      if (!booking) {
        return true
      }

      return false
    })
  }, [date, dayBookings])

  const handleBookingClick = () => {
    if (!isAuthenticated) {
      return signIn("credentials")
    }
  }

  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
  )

  return (
    <Card>
      <CardContent className="p-3 w-full">
        <div className="flex gap-4 items-center w-full">
          <div className="relative min-h-[110px] min-w-[110px] max-h-[110px] max-w-[110px]">
            <Image
              className="rounded-lg"
              src={service.imageUrl}
              fill
              style={{ objectFit: "contain" }}
              alt={service.name}
            />
          </div>

          <div className="flex flex-col w-full">
            <h2 className="font-bold">{service.name}</h2>
            <p className="text-sm text-gray-400">{service.description}</p>

            <div className="flex items-center justify-between mt-3">
              <p className="text-primary text-sm font-bold">
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(Number(service.price))}
              </p>

              <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
                {isAuthenticated ? (
                  <SheetTrigger asChild>
                    <Button variant="secondary" onClick={handleBookingClick}>
                      Reservar
                    </Button>
                  </SheetTrigger>
                ) : (
                  <Button disabled variant="secondary">
                    Reservar
                  </Button>
                )}
                <SheetContent className="p-0">
                  <SheetHeader className="text-left px-5 py-6 border-b border-solid border-secondary">
                    <SheetTitle>Fazer Reserva</SheetTitle>
                  </SheetHeader>
                  <div className="py-6">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={handleDateClick}
                      locale={ptBR}
                      fromDate={addDays(new Date(), 1)}
                    />
                  </div>
                  {date && (
                    <div className="flex gap-3 overflow-x-auto py-6 px-5 border-t border-solid border-secondary [&::-webkit-scrollbar]:hidden">
                      {timeList.map((time) => (
                        <Button
                          onClick={() => handleHourClick(time)}
                          variant={hour === time ? "default" : "outline"}
                          className="rounded-full"
                          key={time}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  )}
                  <div className="py-6 px-5 border-t border-solid border-secondary">
                    <BookingInfo
                      booking={{
                        barbershop: barbershop,
                        date:
                          date && hour
                            ? setMinutes(
                                setHours(date, Number(hour.split(":")[0])),
                                Number(hour.split(":")[1])
                              )
                            : undefined,
                        service: service,
                      }}
                    ></BookingInfo>
                  </div>

                  <SheetFooter className="px-5">
                    <Button
                      disabled={!hour || !date || loading}
                      onClick={handleBookingSubmit}
                    >
                      {loading && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin"></Loader2>
                      )}
                      Confirmar reserva
                    </Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ServiceItem
