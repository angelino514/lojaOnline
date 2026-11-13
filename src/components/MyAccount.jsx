import "../styles/MyAccount.css";
import { User, Package, Heart, LogOut, LogIn, UserCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation, NavLink, useOutletContext } from "react-router-dom";
import MyAccountSkeleton from "./MyAccountSkeleton"


export default function MyAccount() {

   const navAccount = [
      { item: "Meu perfil", icon: User, path: "UserProfile", action: 'profile' },
      { item: "Meus pedidos", icon: Package, path: "Orders", action: 'Orders' },
      { item: "Lista de favoritos", icon: Heart, path: "Favorites", action: 'Favorites' }
   ];

   const [section, setSection] = useState(false)
   const [loading, setLoading] = useState(true)
   const [userdatas, setuserDatas] = useState([])

   useEffect(() => {
      async function verificarSessao() {
         setLoading(true)
         try {
            const response = await fetch(
               "https://banck-end.vercel.app/verificarSessao",
               {
                  method: "GET",
                  credentials: "include"
               }
            )

            const data = await response.json()
            setuserDatas(data.usuario)
            setSection(response.ok && data.success)
         } catch (error) {
            setSection(false)
         } finally {
            setLoading(false)
         }
      }
      verificarSessao()
   }, [])

   async function deleteUserSession() {
      try {
         const res = await fetch('https://banck-end.vercel.app/deleteUserSession', {
            method: 'DELETE',
            credentials: 'include'
         })

         const data = await res.json()
         if (data.success) {
            navigate('/')
            return
         }

      } catch (err) {
         return
      }
   }

   const navigate = useNavigate();
   const location = useLocation();

   return (
      <section className="section-account">
         <aside className="face">

            <nav className="nav-account-items">
               <ul className="ul-lidt-account-items">
                  {navAccount.map((item, index) => {
                     const Icon = item.icon;
                     const isActive = location.pathname.includes(item.path);

                     return (
                        <li
                           className={`li-item-account ${isActive ? "active" : ""}`}
                           key={index}
                           onClick={() => navigate(item.path)}
                        >
                           <Icon size={15} />
                           <span>{item.item}</span>
                        </li>
                     );
                  })}
               </ul>

               {section ? <button className="account-logout" onClick={() => { deleteUserSession() }}>
                  <LogOut size={15} />
                  <span>Terminar sessão</span>
               </button> :

                  <button className="account-logout"
                     onClick={() => { navigate(`/UserCount/Login/${'UserCoount'}`) }}>
                     <LogIn size={15} />
                     <span>Iniciar sessão</span>
                  </button>}
            </nav>

            <div className="menu-mobile-container-main">
               {loading ? <MyAccountSkeleton /> :
                  <nav className="navbar-MyAccount-mobile">
                     <div className="user-inf-mobile">
                        <div className="face">
                           <div className="avatar-user-inf-mobile">
                              {section ? <span> {userdatas[0]?.nome?.charAt(0).toUpperCase()}</span> : <span> A </span>}
                           </div>
                           <h2> Olá {section ? <span> {userdatas[0]?.nome + ' ' + userdatas[0]?.sobrenome}</span> : <span > Usuário </span>}</h2>
                           <span className="text-span-user-inf"> Bem Vindo ao seu Painel </span>
                        </div>
                     </div>

                     <aside className="containers-aside-menu">
                        {navAccount.map((p) => {
                           const Icon = p.icon
                           return (
                              <NavLink
                                 key={p.action}
                                 className='btns-mobils-accont-menu'
                                 to={`/UserCount/FilterUserCount/${p.action}`}
                              >
                                 <div className="face">
                                    <Icon size={20} />
                                    <span>{p.item}</span>
                                 </div>
                              </NavLink>
                           )
                        })}

                        {section ? <button className="btns-mobils-accont-menu"
                           onClick={() => { deleteUserSession() }}>
                           <div className="face">
                              <LogOut size={15} />
                              <span>Terminar sessão</span>
                           </div>
                        </button> :

                           <button className="btns-mobils-accont-menu"
                              onClick={() => { navigate('/UserCount/Login') }}>
                              <div className="face">
                                 <LogIn size={15} />
                                 <span>Iniciar sessão</span>
                              </div>
                           </button>}
                     </aside>
                  </nav>
               }
            </div>

            <main className="main-container-account">
               <Outlet />
            </main>
         </aside>
      </section>
   );
}