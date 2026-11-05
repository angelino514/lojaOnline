import { useEffect, useState } from "react"

export default function filtercategories() {

   const [products, setProducts] = useState([])
   useEffect(() => {
      async function getProducts() {
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
         }
      }
      getProducts()
   }, [])
   return products
}