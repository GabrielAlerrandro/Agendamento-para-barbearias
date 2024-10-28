"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { signOut, useSession } from "next-auth/react"
import {
  CalendarIcon,
  HomeIcon,
  LogOutIcon,
  MenuIcon,
  Settings,
} from "lucide-react"
import Image from "next/image"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet"
import { Avatar, AvatarFallback } from "./avatar"
import { AvatarImage } from "@radix-ui/react-avatar"
import Link from "next/link"
import { useRouter } from "next/navigation"

const Header = () => {
  const router = useRouter()

  const { data } = useSession()
  const handleLoginClick = async () => {
    router.push("/auth/barber")
  }

  const handleLogoutClick = () => signOut()

  return (
    <header>
      <Card>
        <CardContent className="p-5 justify-between flex flex-row items-center">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="logo do sistema"
              height={22}
              width={120}
            />
          </Link>
          {data?.user ? (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant={"outline"} size={"icon"}>
                  <MenuIcon></MenuIcon>
                </Button>
              </SheetTrigger>

              <SheetContent className="p-0">
                <SheetHeader className="p-5 text-left border-b border-solid border-secondary">
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>

                <div className="flex justify-between px-5 py-6 items-center">
                  <div className="flex items-center gap-3 ">
                    <Avatar>
                      <AvatarImage src={data.user?.image ?? ""}></AvatarImage>
                      <AvatarFallback>
                        {data.user?.name?.split("")[0]}
                      </AvatarFallback>
                    </Avatar>

                    <h2 className="font-bold">{data.user?.name}</h2>
                  </div>

                  <Button variant="secondary" size="icon">
                    <LogOutIcon onClick={handleLogoutClick}></LogOutIcon>
                  </Button>
                </div>

                <div className="flex flex-col gap-3 px-5">
                  <Button variant="outline" className="justify-start" asChild>
                    <Link href="/">
                      <HomeIcon size={18} className="mr-2"></HomeIcon>
                      Inicio
                    </Link>
                  </Button>

                  <Button variant="outline" className="justify-start" asChild>
                    <Link href="/bookings">
                      <CalendarIcon size={18} className="mr-2"></CalendarIcon>
                      Agendamentos
                    </Link>
                  </Button>
                  {data.user.isBarber && (
                    <Button variant="outline" className="justify-start" asChild>
                      <Link href={`/barbers/${data.user.barbershopID}`}>
                        <Settings size={18} className="mr-2"></Settings>
                        Gerenciar
                      </Link>
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          ) : (
            <div>
              <Button
                className="mx-2 bg-transparent capitalize rounded-xl"
                onClick={handleLoginClick}
              >
                sou cliente
              </Button>
              <Button
                className="capitalize rounded-xl hover:bg-white hover:text-primary"
                onClick={handleLoginClick}
              >
                sou barbeiro
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </header>
  )
}

export default Header
