import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import MenuMobile from "../components/MenuMobile"
import { useEffect, useRef, useState } from "react"


export default function Home() {

   const [products, setProducts] = useState([])
   const [loading, setLoading] = useState(false)
   const [hasMore, setHasMore] = useState(true)

   const offsetRef = useRef(0)

   async function loadMore() {

      if (loading || !hasMore) return

      setLoading(true)

      try {

         const offset = offsetRef.current
         const response = await fetch(
            `https://banck-end.vercel.app/productsStore?offset=${offset}`, {
            credentials: 'include',
         }
         )

         const data = await response.json()

         if (!Array.isArray(data)) return
         if (data.length === 0) {
            setHasMore(false)
            return
         }
         setProducts(prev => [
            ...prev,
            ...data
         ])
         offsetRef.current += data.length
      } finally {
         setLoading(false)
      }
   }

   useEffect(() => {
      loadMore()
   }, [])

   const pagin = 'Home'

   return (
      <>
         <Header pagin={'Home'} />
         <MenuMobile />

         <main className="main">
            <Outlet
               context={{
                  products,
                  loadMore,
                  loading,
                  pagin
               }}
            />
         </main>
      </>
   )
}
