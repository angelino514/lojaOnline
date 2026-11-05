import { useOutletContext } from "react-router-dom"
import ListCards from "./ListaCards"

export default function ReferencesResult() {
   const { products, loadMore, loading, pagin } = useOutletContext()
   return (
      <ListCards products={products} loadMore={loadMore} loading={loading} pagin={pagin} />
   )
}