"use client"
import { useState } from "react"
import { SearchIcon } from "lucide-react"
import { Button } from "./button"
import { Input } from "./input"
import Link from "next/link" 
import Image from "next/image" 
import { Barbershop } from "@prisma/client"

interface SearchProps {
  barbershops: Barbershop[]; 
}

const Search = ({ barbershops }: SearchProps) => {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredBarbershops = searchTerm
    ? barbershops.filter((barbershop) =>
        barbershop.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [] 

  return (
    <div className="flex flex-col items-center gap-4 w-1/2">
      <div className="flex items-center gap-2 w-full">
        <Input
          placeholder="Busque por uma barbearia..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
        <Button variant="default" size="icon">
          <SearchIcon size={20} />
        </Button>
      </div>

      <div className="flex flex-col gap-4 mt-4 w-full">
        <div className="max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-transparent">
          {filteredBarbershops.map((barbershop) => (
            <Link href={`/barbershop/${barbershop.id}`} key={barbershop.id}>
              <div className="flex items-center p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow bg-[225, 9%, 9%]">
                <div className="flex-shrink-0 w-16 h-16 mr-4 flex items-center justify-center">
                  <Image
                    src={barbershop.imageUrl || "/default-image.jpg"} 
                    alt={barbershop.name}
                    width={64} 
                    height={64} 
                    className="object-cover rounded-md" 
                  />
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-primary">
                    {barbershop.name}
                  </h3>
                  <p className="text-sm text-gray-500">{barbershop.address}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Search
