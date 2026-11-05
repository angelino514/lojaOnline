
import { useParams, Outlet } from "react-router-dom"
import Header from "../components/Header"
import { useEffect, useState, useRef } from "react"
import getBrowserId from "../modules/getBrowserId"

export default function Result() {

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

   return (
      <>
         <Header pagin="Result" />

         <main className="main">
            <Outlet context={{
               products,
               loadMore,
               loading,
               pagin
            }} />
         </main>
      </>
   )
}
