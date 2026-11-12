import "../styles/MyAccount.css";
import { User, Package, Heart, LogOut, LogIn } from "lucide-react";
import { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";


export default function MyAccount() {

   const navAccount = [
      { item: "Meu perfil", icon: User, path: "UserProfile " },
      { item: "Meus pedidos", icon: Package, path: "Orders" },
      { item: "Lista de favoritos", icon: Heart, path: "Favorites" }
   ];

   const [section, setSection] = useState(false);
   const [loading, setLoading] = useState(true);
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
                  onClick={() => { navigate('/UserCount/Login') }}>
                     <LogIn size={15} />
                     <span>Iniciar sessão</span>
                  </button>}
            </nav>

            <main className="main-container-account">
               <Outlet />
            </main>
         </aside>
      </section>
   );
}