import { Star } from "lucide-react"
import '../styles/ListCards.css'
import { useNavigate } from "react-router-dom"
import { useEffect, useRef } from "react"
import Loading from "./Loading"

export default function ListCards({ products, loadMore, loading, pagin }) {

   const navigation = useNavigate()
   const lastProductRef = useRef(null)

   function viewDetails(id, categoria) {
      navigation(`/ProductDetails/${id}/Categories/${categoria}`)
   }

   useEffect(() => {
      const observer = new IntersectionObserver(
         ([entry]) => {
            if (entry.isIntersecting) {
               loadMore()
            }
         },
         {
            rootMargin: '200px'
         }
      )
      if (lastProductRef.current) {
         observer.observe(lastProductRef.current)
      }
      return () => {
         observer.disconnect()
      }
   }, [products.length])



   return (
      <>
         <div className="container-list-cards face">
            {products.map((product, index) => (
               <div
                  key={index}
                  ref={
                     index === products.length - 1
                        ? lastProductRef
                        : null
                  }
                  className="container-item"
                  onClick={() => viewDetails(product.id, product.categoria)}
               >

                  <aside className="face">
                     <div className="image-wrapper">
                        <img
                           src={`https://banck-end.vercel.app/imagens/${product.id}`}
                           alt={product.nome}
                        />
                        {product.promocao === 'sim' && (
                           <span className="discount-badge">
                              -50%
                           </span>
                        )}
                     </div>

                     <div className="product-info">
                        <p className="name">
                           {product.nome.length > 40
                              ? `${product.nome.slice(0, 40)}...`
                              : product.nome}
                        </p>
                        <p className="price-container">
                           <span className="currency">
                              Kz
                           </span>

                           <span className="price">
                              {product.preco}
                           </span>
                        </p>

                        <div className="meta-info">
                           <span className="sales">
                              {product.stock} uni.
                           </span>
                           <span className="star">
                              {product.star}
                              <Star
                                 size={12}
                                 fill="#ff4747"
                                 color="#ff4747"
                              />
                           </span>
                        </div>
                     </div>
                  </aside>
               </div>
            ))}
         </div>
         {loading && <Loading />}
      </>
   )
}