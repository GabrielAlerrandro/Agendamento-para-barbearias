"use client"
import React, { useState, useEffect } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import "./Formulario.css"
import { fetchBarbershops } from "./barbershopService"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { getSession } from "next-auth/react"
import {
  FaEnvelope,
  FaFacebookF,
  FaGoogle,
  FaLinkedinIn,
  FaLock,
  FaUser,
} from "react-icons/fa6"

interface Barbershop {
  id: string
  name: string
}

interface LoginFormData {
  email: string
  password: string
}

interface RegisterFormData {
  email: string
  password: string
  name: string
  isBarber: boolean
  barbershop?: string
}

const Formulario = () => {
  const router = useRouter()

  const [isRegistering, setIsRegistering] = useState(false)
  const [isBarber, setIsBarber] = useState(false)
  const [barbershops, setBarbershops] = useState<Barbershop[]>([])
  const [loginError, setLoginError] = useState("")

  const { register: registerLogin, handleSubmit: handleSubmitLogin } =
    useForm<LoginFormData>()
  const { register: registerRegister, handleSubmit: handleSubmitRegister } =
    useForm<RegisterFormData>()

  const toggleForm = () => {
    setIsRegistering(!isRegistering)
  }

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession()
      if (session) {
        router.push("/")
      }
    }
    checkSession()
  }, [])

  const onSubmitLogin: SubmitHandler<LoginFormData> = async (data) => {
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    })

    if (result?.error) {
      console.error("Login error:", result.error)
      setLoginError("Email ou senha incorretos.") // Define a mensagem de erro
    } else {
      setLoginError("") // Limpa a mensagem de erro se o login for bem-sucedido
      router.push("/")
    }
  }

  const onSubmitRegister: SubmitHandler<RegisterFormData> = async (data) => {
    const { email, password, name, isBarber, barbershop } = data

    const requestBody = {
      email,
      password,
      name,
      isBarber,
      barbershopID: isBarber ? barbershop : null,
    }

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })

      if (response.ok) {
        const loginResult = await signIn("credentials", {
          redirect: false,
          email,
          password,
        })

        if (loginResult?.error) {
          console.error("Login error after registration:", loginResult.error)
        } else {
          router.push("/")
        }
      } else {
        const errorResponse = await response.json()
        console.error("Registration failed:", errorResponse)
      }
    } catch (error) {
      console.error("Error during registration:", error)
    }
  }

  useEffect(() => {
    const fetchBarbers = async () => {
      const barbersFetched = await fetchBarbershops()
      setBarbershops(barbersFetched)
    }
    fetchBarbers()
  }, [])

  return (
    <main>
      <div
        className={`login-container ${isRegistering ? "move" : ""}`}
        id="login-container"
      >
        <div className="form-container">
          {/* Formulário de Login */}
          <form
            className="form form-login"
            onSubmit={handleSubmitLogin(onSubmitLogin)}
          >
            <h2 className="form-title">Entrar com</h2>
            <div className="form-social">
              <a href="#" className="social-icon">
                <FaFacebookF />
              </a>
              <a href="#" className="social-icon">
                <FaGoogle />
              </a>
              <a href="#" className="social-icon">
                <FaLinkedinIn />
              </a>
            </div>
            <p className="form-text">ou utilize sua conta</p>
            <div className="form-input-container">
              <div className="class-input">
                <FaEnvelope />
                <input
                  type="email"
                  className="form-input"
                  placeholder="Email"
                  {...registerLogin("email", { required: true })}
                />
              </div>
              <div className="class-input">
                <FaLock />
                <input
                  type="password"
                  className="form-input"
                  placeholder="Senha"
                  {...registerLogin("password", { required: true })}
                />
              </div>
            </div>
            <span className="error-message p-0 m-0">{loginError}</span>{" "}
            <a href="#" className="form-link my-2">
              Esqueceu a senha?
            </a>
            <button type="submit" className="form-button">
              Entrar
            </button>
            <p className="mobile-text">
              Não tem conta?{" "}
              <a href="#" id="open-register-mobile">
                Registre-se
              </a>
            </p>
          </form>

          {/* Formulário de Registro */}
          <form
            className="form form-register"
            onSubmit={handleSubmitRegister(onSubmitRegister)}
          >
            <h2 className="form-title">Criar Conta</h2>
            <div className="form-social">
              <a href="#" className="social-icon">
                {/* <i className="fab fa-facebook-f"></i> */}
                <FaFacebookF />
              </a>
              <a href="#" className="social-icon">
                <FaGoogle />
              </a>
              <a href="#" className="social-icon">
                {/* <i className="fab fa-linkedin-in"></i> */}
                <FaLinkedinIn />
              </a>
            </div>
            <p className="form-text">ou cadastre seu email</p>
            <div className="form-input-container">
              <label className="flex flex-row items-center justify-center gap-1">
                <FaUser />
                {/* <i className="far fa-user icon-modify"></i> */}
                <input
                  type="text"
                  className="form-input"
                  placeholder="Nome"
                  {...registerRegister("name", { required: true })}
                />
              </label>
              <label className="flex flex-row items-center justify-center gap-1">
                {/* <i className="far fa-envelope icon-modify"></i> */}
                <FaEnvelope />
                <input
                  type="email"
                  className="form-input"
                  placeholder="Email"
                  {...registerRegister("email", { required: true })}
                />
              </label>
              <label className="flex flex-row items-center justify-center gap-1">
                {/* <i className="fa-regular fa-lock"></i> */}
                <FaLock />
                <input
                  type="password"
                  className="form-input"
                  placeholder="Senha"
                  {...registerRegister("password", { required: true })}
                />
              </label>
              <label>
                <input
                  className="mr-2 mb-2"
                  type="checkbox"
                  {...registerRegister("isBarber")}
                  onChange={(e) => {
                    setIsBarber(e.target.checked)
                  }}
                />
                Sou barbeiro
              </label>
              {isBarber && (
                <label>
                  <select
                    className="form-input mb-6"
                    {...registerRegister("barbershop", { required: isBarber })}
                  >
                    <option value="">Selecione uma barbearia</option>
                    {barbershops.map((barbershop) => (
                      <option key={barbershop.id} value={barbershop.id}>
                        {barbershop.name}
                      </option>
                    ))}
                  </select>
                </label>
              )}
            </div>
            <button type="submit" className="form-button">
              Cadastrar
            </button>
            <p className="mobile-text">
              Já tem conta?{" "}
              <a href="#" id="open-login-mobile">
                Login
              </a>
            </p>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <h2 className="form-title form-title-light">Já tem conta?</h2>
            <p className="form-text">
              Para entrar na nossa plataforma faça login com suas informações
            </p>
            <button
              className="form-button form-button-light"
              onClick={toggleForm}
            >
              Entrar
            </button>
          </div>
          <div className="overlay">
            <h2 className="form-title form-title-light">Olá!</h2>
            <p className="form-text">
              Cadastre-se e comece a usar a nossa plataforma on-line
            </p>
            <button
              className="form-button form-button-light"
              onClick={toggleForm}
            >
              Cadastrar
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Formulario
