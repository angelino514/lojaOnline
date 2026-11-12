import '../styles/Categories.css'
import filtercategories from '../modules/categories'
import Header from '../components/Header'
import MenuMobile from '../components/MenuMobile'
import { useNavigate } from 'react-router-dom'
import Loading from '../components/Loading'


export default function Categories() {

   const categories = filtercategories().products
   const loading = filtercategories().loading
   const navegation = useNavigate()

   return (
      <>
         <Header pagin={'categorias'} />
         <MenuMobile />

         <section className="section-header-cat main-app-containers">
            {loading ? <Loading />
               :
               <aside className="categories-grid-container face">
                  {categories.map((item, index) => (
                     <button key={index} className="category-card-btn"
                        onClick={() => { navegation(`/Result/Categories/${item.categoria}`) }}
                     >
                        <img
                           className="category-card-img"
                           src={`https://banck-end.vercel.app/imagens/${item.id}`}
                           alt={item.nome || 'Categoria'}
                        />
                        <span className="category-card-text">{item.categoria}</span>
                     </button>
                  ))}
               </aside>
            }
         </section>

      </>
   )
}