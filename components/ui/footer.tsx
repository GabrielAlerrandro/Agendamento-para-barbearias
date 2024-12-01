import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa" // Importando os ícones

const Footer = () => {
  return (
    <footer className="bg-secondary w-full py-8 px-6 mt-12">
      <div className="max-w-6xl mx-auto">
        {/* Seção 1: Sobre a Plataforma */}
        {/* <div className="text-white text-center mb-6">
          <h3 className="text-lg font-semibold mb-2 text-primary">
            Agende Seu Corte Com Facilidade
          </h3>{" "}
          <p className="text-sm mb-2">
            Acesse as melhores barbearias da cidade e agende seu corte de
            maneira rápida e prática!
          </p>
          <p className="text-sm">
            Seu próximo visual está a um clique de distância.
          </p>
        </div> */}

        {/* Seção 2: Links Úteis */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-white">
          {/* Informações de contato */}
          <div>
            <h3 className="text-lg font-semibold mb-2 text-primary">Contato</h3>{" "}
            {/* Cor de destaque */}
            <p className="text-sm mb-2">E-mail: suporte@agendabarbearias.com</p>
            <p className="text-sm mb-2">Telefone: (85) 9876-5432</p>
            <p className="text-sm">
              Endereço: Rua das Agendas, 456, Fortaleza - CE
            </p>
          </div>

          {/* Links rápidos */}
          <div>
            <h3 className="text-lg font-semibold mb-2 text-primary">
              Links Rápidos
            </h3>{" "}
            {/* Cor de destaque */}
            <ul>
              <li>
                <a href="/sobre" className="text-sm hover:underline ">
                  Sobre
                </a>
              </li>{" "}
              {/* Cor nos links */}
              <li>
                <a href="/ajuda" className="text-sm hover:underline ">
                  Ajuda
                </a>
              </li>{" "}
              {/* Cor nos links */}
              <li>
                <a
                  href="/politica-de-privacidade"
                  className="text-sm hover:underline "
                >
                  Política de Privacidade
                </a>
              </li>{" "}
              {/* Cor nos links */}
              <li>
                <a
                  href="/termos-de-servico"
                  className="text-sm hover:underline "
                >
                  Termos de Serviço
                </a>
              </li>{" "}
              {/* Cor nos links */}
            </ul>
          </div>

          {/* Redes sociais */}
          <div>
            <h3 className="text-lg font-semibold mb-2 text-primary">
              Nos Siga
            </h3>{" "}
            {/* Cor de destaque */}
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/agendabarbearias"
                target="_blank"
                className="text-white hover:text-primary"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://www.facebook.com/agendabarbearias"
                target="_blank"
                className="text-white hover:text-primary"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="https://twitter.com/agendabarbearias"
                target="_blank"
                className="text-white hover:text-primary"
              >
                <FaTwitter size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Seção 3: Copyright */}
        <div className="border-t border-gray-700 pt-4 mt-8 text-center">
          <p className="text-sm text-gray-400">
            &copy; 2024 Agenda Barbearias. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
