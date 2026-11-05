import HeroBanner from "../components/HeroBanner"
import ListCards from "../components/ListaCards"
import { useOutletContext } from "react-router-dom"
import CategoryScroll from "../components/CategoryScroll"

export default function Start() {

   const { products, loadMore, loading, pagin } = useOutletContext()

   return (
      <>
         <HeroBanner />
         <CategoryScroll />

         <h2 className="face Recommended">
            Recomendados
         </h2>

         <ListCards
            products={products}
            loadMore={loadMore}
            loading={loading}
            pagin={pagin}
         />
      </>
   )
}