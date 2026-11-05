import '../styles/Categories.css'
import filtercategories from '../modules/categories'
import Header from '../components/Header'
import MenuMobile from '../components/MenuMobile'

export default function Categories() {
   const categories = filtercategories()

   return (
      <>

         <Header pagin={'categorias'} />
         <MenuMobile />

         <section className="section-header-cat">
            <aside className="categories-grid-container face">
               {categories.map((item, index) => (
                  <button key={index} className="category-card-btn">
                     <img
                        className="category-card-img"
                        src={`https://banck-end.vercel.app/imagens/${item.id}`}
                        alt={item.nome || 'Categoria'}
                     />
                     <span className="category-card-text">{item.categoria}</span>
                  </button>
               ))}
            </aside>
         </section>
      </>
   )
}