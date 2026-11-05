import "../styles/MyAccount.css";
import { User, Package, Heart, LogOut } from "lucide-react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";


export default function MyAccount() {

   const navAccount = [
      { item: "Meu perfil", icon: User, path: "Profile" },
      { item: "Meus pedidos", icon: Package, path: "Orders" },
      { item: "Lista de favoritos", icon: Heart, path: "Favorites" }
   ];


   async function deleteUserSession() {

      try {
         const res = await fetch('http://localhost:3000/deleteUserSession', {
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

               <div className="account-logout" onClick={() => { deleteUserSession() }}>
                  <LogOut size={15} />
                  <span>Terminar sessão</span>
               </div>
            </nav>

            <main className="main-container-account">
               <Outlet />
            </main>
         </aside>
      </section>
   );
}