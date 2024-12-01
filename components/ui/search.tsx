"use client"
import { useState } from "react"
import { SearchIcon } from "lucide-react"
import { Button } from "./button"
import { Input } from "./input"
import Link from "next/link" // Importando o Link do Next.js
import Image from "next/image" // Usando o Image para otimização

const Search = ({ barbershops }) => {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredBarbershops = searchTerm
    ? barbershops.filter((barbershop) =>
        barbershop.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [] // Se não houver pesquisa, exibe todas as barbearias

  return (
    <div className="flex flex-col items-center gap-4 w-1/2">
      <div className="flex items-center gap-2 w-full">
        <Input
          placeholder="Busque por uma barbearia..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Atualiza o estado de busca
        />
        <Button variant="default" size="icon">
          <SearchIcon size={20} />
        </Button>
      </div>

      {/* Exibe as barbearias filtradas ou todas, dependendo da busca */}
      <div className="flex flex-col gap-4 mt-4 w-full">
        {/* Adicionando scroll personalizado */}
        <div className="max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-transparent">
          {filteredBarbershops.map((barbershop) => (
            <Link href={`/barbershop/${barbershop.id}`} key={barbershop.id}>
              <div className="flex items-center p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow bg-[225, 9%, 9%]">
                {/* Imagem da barbearia à esquerda */}
                <div className="flex-shrink-0 w-16 h-16 mr-4 flex items-center justify-center">
                  <Image
                    src={barbershop.imageUrl || "/default-image.jpg"} // Fallback de imagem
                    alt={barbershop.name}
                    width={64} // Tamanho da imagem (largo)
                    height={64} // Tamanho da imagem (alto)
                    className="object-cover rounded-md" // Garantir que a imagem seja quadrada
                  />
                </div>

                {/* Texto à direita da imagem */}
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
