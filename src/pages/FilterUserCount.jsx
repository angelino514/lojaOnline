import UserProfile from "../components/UserProfile";
import Favorites from "../components/Favorites";
import Orders from "../components/Orders";
import { useParams } from "react-router-dom";

export default function FilterUserCount() {

   const { action } = useParams()
   if (action === 'profile') {
      return (
         <main className="face">
            <UserProfile actions={'mobile'} />
         </main>)
   }

   if (action === 'Favorites') {
      return (

         <div className="face">
            <Favorites actions={'mobile'} />
         </div>

      )
   }

   if (action === 'Orders') {
      return (
         <div className="face">
            <Orders actions={'mobile'} />
         </div>)
   }
}