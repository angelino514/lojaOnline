import "../styles/UserCount.css";
import { Outlet, } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import MenuMobile from "../components/MenuMobile";
import Loading from "../components/Loading";

export default function UserCount() {

   const [section, setSection] = useState(false);
   const [loading, setLoading] = useState(true);
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

   return (
      <>
         <Header />
         <MenuMobile />

         <main className="main-app-containers">
            {loading ? (<Loading />) : (<Outlet context={{ userdatas }} />)}
         </main>
      </>
   );
}