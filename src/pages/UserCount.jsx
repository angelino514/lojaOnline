import "../styles/UserCount.css";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import MenuMobile from "../components/MenuMobile";
import Loading from "../components/Loading";

export default function UserCount() {

   const [section, setSection] = useState(false);
   const [loading, setLoading] = useState(true);
   const location = useLocation();
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
            console.log(data)
            setuserDatas(data.usuario)
            setSection(response.ok && data.success)
         } catch (error) {
            setSection(false)
         } finally {
            setLoading(false)
         }
      }

      verificarSessao();
   }, [])

   const isAuthPage =
      location.pathname === "/UserCount" ||
      location.pathname === "/UserCount/Register";

   return (
      <>
         <Header />
         <MenuMobile />

         <main className="main-app-containers">
            {loading ? (
               <Loading />
            ) : section && isAuthPage ? (
               <Navigate to="/UserCount/MyAccount" replace />
            ) : !section && !isAuthPage ? (
               <Navigate to="/UserCount" replace />
            ) : (
               <Outlet context={{ userdatas }} />
            )}
         </main>
      </>
   );
}