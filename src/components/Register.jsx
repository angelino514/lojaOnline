import { useEffect, useState } from "react";
import "../styles/Register.css";
import { User, Mail, Phone, Lock, ArrowRight, ShieldCheck } from "lucide-react";
import TextErro from "./TextErro";
import validateText from "../modules/validateText";
import validateEmail from "../modules/validateEmail"
import CartToastLoader from "./CartToastLoader";
import TextSucess from "./TextSucess";
import getBrowserId from "../modules/getBrowserId";


export default function Register() {


   const [userData, setUserData] = useState({
      name: '',
      surname: '',
      email: '',
      phone: '',
      password: '',
      password_confirm: ''

   })

   const [messageerrors, setMessageerrors] = useState({
      messagename: '',
      messagesurname: '',
      messageemail: '',
      messagephone: '',
      messagepassword: '',
      messagepassword_confirm: ''
   })


   const [statesSucess, setStatesSucess] = useState({
      name: false,
      surname: false,
      email: false,
      phone: false,
      password: false,
      password_confirm: false
   })


   const [message, setMessage] = useState('')
   const [sucess, setSucess] = useState(null)
   const [action, setAction] = useState(null)
   const [loading, setLoading] = useState(false)


   function handleChange(e) {
      const { name, value } = e.target;

      if (name === 'phone') {
         let numbers = value.replace(/\D/g, '')

         // Remove o código +244 caso seja colado
         numbers = numbers.replace(/^244/, '')

         // O primeiro dígito deve ser 9
         if (numbers.length > 0 && numbers[0] !== '9') {
            numbers = ''
         }

         // Máximo de 9 dígitos
         numbers = numbers.slice(0, 9)

         let formatted = '+244'

         if (numbers.length > 0) {
            formatted += ' ' + numbers.slice(0, 3)
         }

         if (numbers.length > 3) {
            formatted += ' ' + numbers.slice(3, 6)
         }

         if (numbers.length > 6) {
            formatted += ' ' + numbers.slice(6, 9)
         }

         setUserData(prev => ({
            ...prev,
            phone: formatted
         }));

         return
      }

      setUserData(prev => ({
         ...prev,
         [name]: value
      }));
   }


   async function sendDatas(e) {
      e.preventDefault()


      const formaData = new FormData()
      // Name
      if (userData.name.trim() === '') {
         setStatesSucess(prev => ({
            ...prev,
            name: true
         }))
         setMessageerrors(prev => ({
            ...prev,
            messagename: 'Este campo é obrigaório'
         }))
      }

      else {
         if (!validateText(userData.name)) {
            setStatesSucess(prev => ({
               ...prev,
               name: true
            }))
            setMessageerrors(prev => ({
               ...prev,
               messagename: 'Texto inválido'
            }))
         }

         else {
            formaData.append('nome', userData.name)
         }
      }


      // Surname
      if (userData.surname === '') {
         setStatesSucess(prev => ({
            ...prev,
            surname: true
         }))

         setMessageerrors(prev => ({
            ...prev,
            messagesurname: 'Este campo é obrigaório'
         }))
      }

      else {
         if (!validateText(userData.surname)) {
            setStatesSucess(prev => ({
               ...prev,
               surname: true
            }))

            setMessageerrors(prev => ({
               ...prev,
               messagesurname: 'Texto invalido'
            }))
         } else {
            formaData.append('sobrenome', userData.surname)
         }
      }

      // Email
      if (userData.email === '') {
         setStatesSucess(prev => ({
            ...prev,
            email: true
         }))

         setMessageerrors(prev => ({
            ...prev,
            messageemail: 'Este campo é obrigaório'
         }))
      }
      else {
         if (!validateEmail(userData.email)) {
            setStatesSucess(prev => ({
               ...prev,
               email: true
            }))

            setMessageerrors(prev => ({
               ...prev,
               messageemail: 'E-mail inválido'
            }))
         } else {
            formaData.append('email', userData.email)
         }
      }

      // phone
      if (userData.phone === '') {
         setStatesSucess(prev => ({
            ...prev,
            phone: true
         }))

         setMessageerrors(prev => ({
            ...prev,
            messagephone: 'Este campo é obrigaório'
         }))
      }
      else {
         const phone = userData.phone
            .replace(/\s/g, '')
            .replace('+244', '');

         formaData.append('telefone', phone);
      }

      // password
      if (userData.password === '') {
         setStatesSucess(prev => ({
            ...prev,
            password: true
         }))

         setMessageerrors(prev => ({
            ...prev,
            messagepassword: 'Este campo é obrigaório'
         }))
      }
      // password_confirm
      if (userData.password_confirm === '') {
         setStatesSucess(prev => ({
            ...prev,
            password_confirm: true
         }))

         setMessageerrors(prev => ({
            ...prev,
            messagepassword_confirm: 'Este campo é obrigaório'
         }))
         return
      }

      if (userData.password !== userData.password_confirm) {
         setMessage('As palavras-passe não coincidem.');
         setSucess(false)
         return
      }

      formaData.append('senha', userData.password)
      formaData.append('browserId', getBrowserId())
      if (
         formaData.get('nome').trim() === '' ||
         formaData.get('sobrenome').trim() === '' ||
         formaData.get('email').trim() === '' ||
         formaData.get('telefone').trim() === '' ||
         formaData.get('senha').trim() === ''
      ) {
         setMessage('Preencha todos os campos.');
         setSucess(false);
         return;
      }

      setLoading(true)

      try {
         const response = await fetch('https://banck-end.vercel.app/register', {
            method: 'POST',
            credentials: 'include',
            body: formaData
         })

         const data = await response.json()
         if (!data.success && !response.ok) {
            setMessage(data.message)
            setSucess(false)
            return
         }

         if (data.success) {
            window.location.reload()
            return
         }

      } catch (error) {
         console.error('Erro ao enviar os dados:', error)
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

         {sucess === false && <TextErro message={message} setAction={setAction} />}
         {sucess === true && <TextSucess message={message} setAction={setAction} />}
         {loading && <CartToastLoader />}

         <div className="ali-register-page">
            <div className="register-container">

               {/* CABEÇALHO */}
               <div className="register-header">

                  <div className="register-logo-box">
                     <span className="logo-text">Ali<span className="logo-highlight">Express</span></span>
                  </div>
                  <h1>Criar Conta</h1>
                  <p>Preencha os campos abaixo para se registar e aproveitar ofertas exclusivas.</p>
               </div>

               {/* FORMULÁRIO DE REGISTO */}
               <form className="register-form" onSubmit={sendDatas}>

                  {/* Nome e Sobrenome (Grid para otimizar espaço) */}
                  <div className="form-row-grid">
                     <div className="input-group">
                        <label htmlFor="nome">Nome</label>
                        <div className="input-field-wrapper">
                           <User size={18} className="input-icon" />
                           <input type="text" id="nome" name="name" placeholder="Seu nome"
                              onChange={handleChange}
                           />
                        </div>
                        {statesSucess.name && <span> {messageerrors.messagename} </span>}
                     </div>

                     <div className="input-group">
                        <label htmlFor="sobrenome">Sobrenome</label>
                        <div className="input-field-wrapper">
                           <User size={18} className="input-icon" />
                           <input type="text" name="surname" id="sobrenome" placeholder="Seu sobrenome"
                              onChange={handleChange} />
                        </div>
                        {statesSucess.surname && (
                           <span>{messageerrors.messagesurname}</span>
                        )}
                     </div>
                  </div>

                  {/* E-mail */}
                  <div className="input-group">
                     <label htmlFor="email">E-mail</label>
                     <div className="input-field-wrapper">
                        <Mail size={18} className="input-icon" />
                        <input type="email" name="email" id="email" placeholder="exemplo@email.com"
                           onChange={handleChange} />
                     </div>
                     {statesSucess.email && (
                        <span>{messageerrors.messageemail}</span>
                     )}
                  </div>

                  {/* Telefone */}
                  <div className="input-group">
                     <label htmlFor="telefone">Telefone</label>
                     <div className="input-field-wrapper">
                        <Phone size={18} className="input-icon" />
                        <input
                           type="tel"
                           name="phone"
                           id="telefone"
                           value={userData.phone}
                           placeholder="+244 923 456 789"
                           onChange={handleChange}
                        />
                     </div>


                     {statesSucess.phone && (
                        <span>{messageerrors.messagephone}</span>
                     )}
                  </div>

                  {/* Palavra-passe */}
                  <div className="input-group">
                     <label htmlFor="password">Palavra-passe</label>
                     <div className="input-field-wrapper">
                        <Lock size={18} className="input-icon" />
                        <input type="password" name="password" id="password" placeholder="Mínimo de 6 caracteres"
                           onChange={handleChange} />
                     </div>

                     {statesSucess.password && (
                        <span>{messageerrors.messagepassword}</span>
                     )}
                  </div>

                  {/* Palavra-passe */}
                  <div className="input-group">
                     <label htmlFor="password">Confirmar pala-passe</label>
                     <div className="input-field-wrapper">
                        <Lock size={18} className="input-icon" />
                        <input type="password" name="password_confirm" id="password" placeholder="Mínimo de 6 caracteres"
                           onChange={handleChange} />
                     </div>
                     {statesSucess.password_confirm && (
                        <span>{messageerrors.messagepassword_confirm}</span>
                     )}
                  </div>

                  {/* Termos e Condições */}
                  <div className="register-terms">
                     <input type="checkbox" id="terms" className="ali-checkbox" />
                     <label htmlFor="terms">
                        Concordo com os <a href="#termos">Termos de Utilização</a> e a <a href="#privacidade">Política de Privacidade</a>.
                     </label>
                  </div>

                  {/* Botão de Submissão */}
                  <button type="submit" className="btn-submit">
                     <span>Registar Conta</span>
                     <ArrowRight size={18} />
                  </button>
               </form>

               {/* LINK PARA LOGIN */}
               <div className="toggle-mode-bar">
                  <span>Já tem uma conta?</span>
                  <a href="#login" className="link-to-login">Iniciar Sessão</a>
               </div>

               {/* GARANTIA */}
               <div className="register-security-badge">
                  <ShieldCheck size={16} color="#ff4747" />
                  <span>Proteção de dados e transações 100% seguras</span>
               </div>

            </div>
         </div >
      </>
   );
}