"use client"
import { Prisma } from "@prisma/client"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"
import { Badge } from "./badge"
import { Card, CardContent } from "./card"
import { format, isFuture } from "date-fns"
import { ptBR } from "date-fns/locale"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet"
import Image from "next/image"
import { Button } from "./button"
import { CancelBooking } from "@/app/actions/cancel-booking"
import { toast } from "sonner"
import { useState } from "react"
import { Loader2 } from "lucide-react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./alert-dialog"
import BookingInfo from "./booking-info"

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: true
      barbershop: true
    }
  }>
}

const BookingItem = ({ booking }: BookingItemProps) => {
  const isBookingConfirmed = isFuture(booking.date)
  const [isDeleteLoading, setIsDeleteLoading] = useState(false)
  const handleCancelBooking = async () => {
    setIsDeleteLoading(true)
    try {
      await CancelBooking(booking.id)
      toast.success("Reserva cancelada com sucesso!")
    } catch (error) {
      console.error(error)
    } finally {
      setIsDeleteLoading(false)
    }
  }
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Card className="min-w-full ">
          <CardContent className="flex px-0 py-0">
            <div className="flex flex-col gap-2 py-5 flex-[3] pl-5">
              <Badge
                variant={isBookingConfirmed ? "default" : "secondary"}
                className="w-fit"
              >
                {isBookingConfirmed ? "Confirmado" : "Finalizado"}
              </Badge>
              <h2 className="font-bold">{booking.service.name}</h2>
              <div className="flex gap-2 items-center">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={booking.barbershop.imageUrl}></AvatarImage>
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>

                <h3 className="text-sm ">{booking.barbershop.name}</h3>
              </div>
            </div>

            <div className="flex flex-1 flex-col items-center justify-center border-l border-solid border-secondary">
              <p className="text-sm capitalize">
                {format(booking.date, "MMMM", { locale: ptBR })}
              </p>
              <p className="text-2xl ">{format(booking.date, "dd")}</p>
              <p className="text-sm">{format(booking.date, "hh:mm")}</p>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>
      <SheetContent className="px-0">
        <SheetHeader className="px-5 text-left pb-6 border-b border-solid border-secondary">
          <SheetTitle>Informações da Reserva</SheetTitle>
        </SheetHeader>
        <div className="px-5">
          <div className="relative h-[180px] w-full mt-6 ">
            <Image  src={booking.barbershop.imageUrl} alt={booking.barbershop.name} fill></Image>
            <div className="w-full absolute bottom-4 left-0 px-5">
              <Card>
                <CardContent className="p-3 flex gap-2">
                  <Avatar>
                    <AvatarImage
                      src={booking.barbershop.imageUrl}
                    ></AvatarImage>
                  </Avatar>
                  <div>
                    <h2 className="font-bold">{booking.barbershop.name}</h2>
                    <h3 className="text-xs overflow-hidden text-nowrap text-ellipsis">
                      {booking.barbershop.address}
                    </h3>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Badge
            variant={isBookingConfirmed ? "default" : "secondary"}
            className="w-fit my-3"
          >
            {isBookingConfirmed ? "Confirmado" : "Finalizado"}
          </Badge>

          <BookingInfo booking={booking} />

          {/* <BookingItem booking={booking} /> */}

          <SheetFooter className="flex-row mt-6 gap-3 ">
            <SheetClose asChild>
              <Button className="w-full" variant={"secondary"}>
                Voltar
              </Button>
            </SheetClose>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  disabled={!isBookingConfirmed || isDeleteLoading}
                  className="w-full"
                  variant={"destructive"}
                >
                  {isDeleteLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin"></Loader2>
                  )}
                  Cancelar Reserva
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="w-[90%]">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-center">
                    Você tem certeza?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-center">
                    Essa ação não pode ser desfeita. Isso irá apagar de forma
                    permanente sua reserva da barbearia.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex flex-row gap-3">
                  <AlertDialogCancel className="w-full mt-0">
                    Voltar
                  </AlertDialogCancel>
                  <AlertDialogAction
                    disabled={isDeleteLoading}
                    className="w-full"
                    onClick={handleCancelBooking}
                  >
                    {isDeleteLoading && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin"></Loader2>
                    )}
                    Confirmar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default BookingItem
