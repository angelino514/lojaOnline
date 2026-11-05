import { User, Mail, Phone, MapPin, Edit3 } from "lucide-react";
import "../styles/MyAccount.css";
import { useEffect, useState } from "react";
import Loading from "./Loading";

export default function UserProfile() {

   const [loading, setLoading] = useState(true)
   const [userdatas, setuserDatas] = useState([])

   useEffect(() => {
      async function verificarSessao() {
         try {
            const response = await fetch(
               "https://banck-end.vercel.app/verificarSessao",
               {
                  method: "GET",
                  credentials: "include"
               }
            );


            const data = await response.json();
            setuserDatas(data.usuario[0])
         } catch (error) {
            return
         } finally {
            setLoading(false)
         }
      }
      verificarSessao();
   }, [])


   return (

      <>
         {loading ? <Loading /> :
            <div className="profile-container">
               <div className="profile-header-card">
                  <User size={30} className="profile-avata" />
                  <div className="profile-titles">
                     <h2 className="profile-name">{userdatas.nome}</h2>
                     <span className="profile-role">Cliente Verificado</span>
                  </div>
                  <button className="profile-edit-btn">
                     <Edit3 size={14} /> Editar Perfil
                  </button>
               </div>

               <div className="profile-info-grid">
                  <div className="profile-info-item">
                     <Mail size={18} className="profile-icon" />
                     <div className="profile-info-text">
                        <span className="profile-label">E-mail</span>
                        <span className="profile-value">{userdatas.email}</span>
                     </div>
                  </div>

                  <div className="profile-info-item">
                     <Phone size={18} className="profile-icon" />
                     <div className="profile-info-text">
                        <span className="profile-label">Telefone</span>
                        <span className="profile-value">{userdatas.telefone}</span>
                     </div>
                  </div>
               </div>
            </div>}
      </>
   );
}