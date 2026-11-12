import { useEffect, useState } from "react";
import { Heart, Trash2, ShoppingBag } from "lucide-react";
import "../styles/MyAccount.css";
import getBrowserId from "../modules/getBrowserId";
import Loading from "./Loading";


export default function Favorites({ actions }) {

   const [favoritesData, setfavoritesData] = useState([])
   const [loading, setLoading] = useState(true)

   useEffect(() => {
      async function getFav() {

         const formData = new FormData()
         formData.append('browserId', getBrowserId())

         try {

            const res = await fetch('https://banck-end.vercel.app/pegarFav', {
               method: 'POST',
               credentials: 'include',
               body: formData
            })

            const data = await res.json()
            if (data.success) {
               setfavoritesData(data.favoritos)
            }

         } catch (err) {
            return
         } finally {
            setLoading(false)
         }
      }
      getFav()
   })


   async function deleteFav(id) {

      const formData = new FormData()
      formData.append('produto_id', id)
      formData.append('browserId', getBrowserId())

      try {

         const res = await fetch('https://banck-end.vercel.app/deleteFav', {
            method: 'DELETE',
            credentials: 'include',
            body: formData
         })

         const data = await res.json()

         if (data.success) {
            setfavoritesData(prev =>
               prev.filter(p => p.id !== id)
            )
         }

      } catch (err) {
         return
      }
   }

   return (
      <>
         {/* actions */}
         {loading ? <Loading /> :
            <div className={`favorites-container ${actions === 'mobile' ? '' : 'hiden-userProfile'}`}>
               <div className="favorites-header">
                  <h2>
                     <Heart size={20} /> Lista de Favoritos
                  </h2>
                  <span className="favorites-count">{favoritesData.length} itens salvos</span>
               </div>

               <div className="favorites-grid">
                  {favoritesData.map((product) => (
                     <div key={product.id} className="favorite-card">
                        <div className="favorite-image-wrapper">

                           <img src={`https://banck-end.vercel.app/imagens/${product.id}`}
                              alt={product.nome} className="favorite-img" />
                           <button className="btn-remove-favorite" title="Remover dos favoritos"
                              onClick={() => { deleteFav(product.id) }}
                           >
                              <Trash2 size={16} />
                           </button>
                        </div>

                        <div className="favorite-details">
                           <span className="favorite-title">{product.nome}</span>

                           <div className="favorite-price-box">
                              <span className="favorite-price">{product.preco}</span>
                              {product.oldPrice && (
                                 <span className="favorite-old-price">{product.preco}</span>
                              )}
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div >
         }
      </>
   );
}