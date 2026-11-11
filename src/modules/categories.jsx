import { useEffect, useState } from "react"

export default function filtercategories() {

   const [products, setProducts] = useState([])
   const [loading, SetLoading] = useState(true)
   useEffect(() => {
      async function getProducts() {
         SetLoading(true)
         try {
            const response = await fetch('https://banck-end.vercel.app/categoriasStores', {
               credentials: 'include',
            })
            const data = await response.json()
            if (!Array.isArray(data)) {
               return false
            }
            setProducts(data)

         } catch (error) {
            return false
         } finally { SetLoading(false) }
      }
      getProducts()
   }, [])
   return { products: products, loading: loading }
}