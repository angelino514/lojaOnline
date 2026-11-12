import "../styles/Login.css";
import { Mail, Lock, ArrowRight, ShieldCheck, Eye, EyeOff } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react'
import validateEmail from "../modules/validateEmail";
import CartToastLoader from "./CartToastLoader";
import TextErro from "./TextErro";
import TextSucess from "./TextSucess";
import getBrowserId from "../modules/getBrowserId";


export default function Login() {

   const [sucess, setSucess] = useState(null)
   const [loading, setLoading] = useState(false)
   const [message, setMessage] = useState('')
   const [action, setAction] = useState(null)
   const [typeText, setTypeText] = useState(false)

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
         return
      }

      if (userData.email === '' || userData.password === '') {
         return
      }

      if (!validateEmail(userData.email)) {
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
            navigation('/UserCount/MyAccount/UserProfile')
            return
         }

         if (!result.success) {
            setSucess(false)
            setMessage(result.message)
            return
         }


      } catch (error) {
         return
      } finally { setLoading(false) }
   }

   useEffect(() => {
      if (action === 'cancel' || action === 'continue') {
         setSucess(null)
         setAction(null)
      }
   }, [action])

   return (

      <>
         {loading && <CartToastLoader />}
         {sucess === false && <TextErro message={message} setAction={setAction} />}
         {sucess === true && <TextSucess message={message} setAction={setAction} />}


         <div className="ali-login-page">
            <div className="login-container">

               {/* CABEÇALHO */}
               <div className="login-header">
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
                        {/* <label htmlFor="password">Palavra-passe</label>
                        <a href="#recuperar" className="forgot-password">Esqueceu-se?</a> */}
                     </div>
                     <div className="input-field-wrapper">
                        <Lock size={18} className="input-icon" />
                        <input
                           type={!typeText ? 'password' : 'text'}
                           id="password"
                           name="password"
                           placeholder="••••••••"
                           value={userData.password}
                           onChange={handleChange}
                        />
                        {!typeText ? <Eye onClick={() => { setTypeText(!typeText) }} size={18} /> : <EyeOff size={18} onClick={() => { setTypeText(!typeText) }} />}
                     </div>
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
                  {<NavLink className={'link-to-register'} to={'/UserCount/Register'}> Criar uma conta </NavLink>}
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