import "../styles/Login.css";
import { Mail, Lock, ArrowRight, ShieldCheck } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from 'react'
import validateEmail from "../modules/validateEmail";
import CartToastLoader from "./CartToastLoader";
import TextErro from "./TextErro";
import TextSucess from "./TextSucess";
import getBrowserId from "../modules/getBrowserId";


export default function Login() {

   const [success, setSuccess] = useState(null)
   const [loading, setLoading] = useState(false)
   const [message, setMessage] = useState('')
   const [action, setAction] = useState(null)

   const navigation = useNavigate()

   const [userData, setUserData] = useState({
      email: '',
      password: ''
   })

   function handleChange(e) {
      const { name, value } = e.target

      setUserData(prev => ({
         ...prev,
         [name]: value
      }))
   }

   async function sendDatas(e) {
      e.preventDefault()

      if (!userData.email || !userData.password) {
         console.log('Nao foi possivel inciar sessao')
         return
      }

      if (userData.email === '' || userData.password === '') {
         console.log('Dados vazios')
         return
      }

      if (!validateEmail(userData.email)) {
         console.log('Dados inválidos')
         return
      }

      setLoading(true)

      try {

         const formData = new FormData()
         formData.append('email', userData.email)
         formData.append('password', userData.password)
         formData.append('browserId', getBrowserId())

         const response = await fetch('https://banck-end.vercel.app/entrarUsaurio', {
            method: 'POST',
            credentials: 'include',
            body: formData
         })

         const result = await response.json()
         if (result.success) {
            window.location.reload()
            return
         }

         if (!result.success) {
            setSuccess(false)
            setMessage(result.message)
            return
         }


      } catch (error) {
         return
      } finally { setLoading(false) }
   }

   return (

      <>
         {loading && <CartToastLoader />}
         {success === false && <TextErro message={message} />}
         {success === true && <TextSucess message={message} />}
         <div className="ali-login-page">
            <div className="login-container">

               {/* CABEÇALHO */}
               <div className="login-header">
                  <div className="login-logo-box">
                     <span className="logo-text">Ali<span className="logo-highlight">Express</span></span>
                  </div>
                  <h1>Iniciar Sessão</h1>
                  <p>Bem-vindo de volta! Aceda aos seus pedidos, favoritos e ofertas.</p>
               </div>

               {/* FORMULÁRIO DE LOGIN */}
               <form className="login-form" onSubmit={sendDatas}>

                  {/* E-mail */}
                  <div className="input-group">
                     <label htmlFor="email">E-mail</label>
                     <div className="input-field-wrapper">
                        <Mail size={18} className="input-icon" />
                        <input
                           type="email"
                           id="email"
                           name="email"
                           placeholder="exemplo@email.com"
                           value={userData.email}
                           onChange={handleChange}
                        />
                     </div>
                  </div>

                  {/* Palavra-passe */}
                  <div className="input-group">
                     <div className="label-row">
                        <label htmlFor="password">Palavra-passe</label>
                        <a href="#recuperar" className="forgot-password">Esqueceu-se?</a>
                     </div>
                     <div className="input-field-wrapper">
                        <Lock size={18} className="input-icon" />
                        <input
                           type="password"
                           id="password"
                           name="password"
                           placeholder="••••••••"
                           value={userData.password}
                           onChange={handleChange}
                        />
                     </div>
                  </div>

                  {/* Lembrar-me */}
                  <div className="remember-me">
                     <input type="checkbox" id="remember" className="ali-checkbox" />
                     <label htmlFor="remember">Lembrar-me neste dispositivo</label>
                  </div>

                  {/* Botão de Entrar */}
                  <button type="submit" className="btn-submit">
                     <span>Entrar</span>
                     <ArrowRight size={18} />
                  </button>
               </form>

               {/* LINK PARA CRIAR CONTA */}
               <div className="toggle-mode-bar">
                  <span>Ainda não tem conta?</span>
                  <a href="#register" className="link-to-register">Criar uma conta</a>
                  {<NavLink to={'/UserCount/Register'}> Registrar </NavLink>}
               </div>

               {/* GARANTIA */}
               <div className="login-security-badge">
                  <ShieldCheck size={16} color="#ff4747" />
                  <span>Sessão 100% Segura e Protegida</span>
               </div>

            </div>
         </div>
      </>
   );
}