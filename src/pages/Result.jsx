
import { useParams, Outlet } from "react-router-dom"
import Header from "../components/Header"
import getBrowserId from "../modules/getBrowserId"
import { useState, useRef, useEffect, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { CartContext } from '../App'
import "../styles/Result.css"

export default function Result() {

   const { productList } = useContext(CartContext)
   const { action, values } = useParams()
   const [products, setProducts] = useState([])
   const [offset, setOffset] = useState(0)
   const [loading, setLoading] = useState(false)
   const [hasMore, setHasMore] = useState(true)

   const loadingRef = useRef(false)
   const requestId = useRef(0)

   async function fetchProducts(pageOffset, replace = false) {

      if (loadingRef.current) return

      loadingRef.current = true
      setLoading(true)

      const currentRequest = requestId.current

      try {

         const formData = new FormData()
         formData.append('browserId', getBrowserId())

         const response = await fetch(
            `https://banck-end.vercel.app/searchStore/${action}/${encodeURIComponent(values)}?limit=10&offset=${pageOffset}`,
            {
               method: 'POST',
               credentials: 'include',
               body: formData
            }
         )

         const data = await response.json()

         // Ignorar respostas de pesquisas anteriores
         if (currentRequest !== requestId.current) return
         if (data.success) {
            const newProducts = data.produtos

            setProducts(prev =>
               replace ? newProducts : [...prev, ...newProducts]
            )
            setOffset(pageOffset + newProducts.length)
            setHasMore(newProducts.length === 10)

         } else {
            return
         }

      } catch (error) {
         return
      } finally {
         if (currentRequest === requestId.current) {
            loadingRef.current = false
            setLoading(false)
         }
      }
   }

   // Executar sempre que mudar a categoria ou pesquisa
   useEffect(() => {
      requestId.current++
      loadingRef.current = false
      setProducts([])
      setOffset(0)
      setHasMore(true)
      fetchProducts(0, true)
   }, [action, values])

   // Carregar próxima página
   function loadMore() {
      if (loadingRef.current || !hasMore) return
      fetchProducts(offset)
   }

   const pagin = 'Result'

   const navegation = useNavigate()
   function filterProducts(values) {
      navegation(`/Result/Categories/${values}`)
   }

   return (
      <>
         <Header pagin="Result" />
         <main className="main">
            <nav className="navabar-result-filter">
               <div className="face">
                  <ul className="ul-result-filter">
                     <li className="li-iten-result-filter" onClick={() => { filterProducts('todas') }}>
                        todas
                     </li>
                     {productList.map((p, i) => (
                        <li key={i} className="li-iten-result-filter"
                           onClick={() => { filterProducts(p.categoria) }}
                        > {p.categoria}</li>
                     ))}
                  </ul>
               </div>
            </nav>

            <section>
               <Outlet context={{
                  products,
                  loadMore,
                  loading,
                  pagin
               }} />
            </section>
         </main>
      </>
   )
}
