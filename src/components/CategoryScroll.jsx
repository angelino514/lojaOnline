import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../styles/CategoryScroll.css';
import filtercategories from '../modules/categories';

export default function CategoryScroll() {
   const newProducts = filtercategories()
   const scrollContainerRef = useRef(null);
   const navigation = useNavigate();

   function statusSearch(values) {
      navigation(`/Result/Categories/${values}`);
   }

   const handleScroll = (direction) => {
      if (scrollContainerRef.current) {
         const { scrollLeft, clientWidth } = scrollContainerRef.current;
         const scrollAmount = clientWidth * 0.6;

         scrollContainerRef.current.scrollTo({
            left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
            behavior: 'smooth',
         });
      }
   };

   return (
      <section className="categoryScroll">
         <aside className="face">
            <button
               className="scroll-btn left hiden-btn"
               onClick={() => handleScroll('left')}
               aria-label="Rolar para esquerda"
               type="button"
            >
               <ChevronLeft size={20} />
            </button>

            <div className="category-scroll-inner" ref={scrollContainerRef}>
               {newProducts.map((item, index) => (
                  <div
                     className="container-categoryScroll"
                     key={item.id || index}
                     onClick={() => { statusSearch(item.categoria) }}
                  >
                     <div className="category-icon-wrapper">
                        <img
                           src={`https://banck-end.vercel.app/imagens/${item.id}`}
                           alt={item.categoria}
                        />
                     </div>
                     <span className="category-title">{item.categoria}</span>
                  </div>
               ))}
            </div>

            <button
               className="scroll-btn right hiden-btn"
               onClick={() => handleScroll('right')}
               aria-label="Rolar para direita"
               type="button"
            >
               <ChevronRight size={20} />
            </button>
         </aside>
      </section>
   );
}