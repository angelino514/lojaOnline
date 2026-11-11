import { useEffect, useRef, useState } from "react";
import "../styles/ImageGallery.css";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import getBrowserId from "../modules/getBrowserId";

export default function ImageGallery({ images = [], id }) {


   const scrollRef = useRef(null);
   const [activeIndex, setActiveIndex] = useState(0);

   const [fav, setFav] = useState(false)


   const handleScroll = () => {
      if (scrollRef.current) {
         const { scrollLeft, clientWidth } = scrollRef.current;
         const newIndex = Math.round(scrollLeft / clientWidth);
         setActiveIndex(newIndex);
      }
   };

   const scrollToIndex = (index) => {
      if (index < 0 || index >= images.length) return;
      if (scrollRef.current) {
         const clientWidth = scrollRef.current.clientWidth;
         scrollRef.current.scrollTo({
            left: index * clientWidth,
            behavior: "smooth"
         });
         setActiveIndex(index);
      }
   };

   async function addFavorite() {

      try {
         const formData = new FormData();

         formData.append('produto_id', id);
         formData.append('browserId', getBrowserId());

         const response = await fetch(
            'https://banck-end.vercel.app/favoritosAdd',
            {
               method: 'POST',
               body: formData,
               credentials: 'include'
            }
         );

         const data = await response.json();
         if (!response.ok || !data.success) {
            return;
         }

         setFav(true);

      } catch (error) {
         console.error('Erro ao adicionar favorito:', error);
      }
   }


   function actionFav() {
      if (fav) {
         return
      }
      setFav(true)
      addFavorite()
   }

   return (
      <div className="ali-image-gallery-wrapper">

         <div className="gallery-main-container">
            <span className="badge-discount-float">5%</span>

            {/* Botão Esquerda */}
            <button
               className="gallery-nav-btn left"
               onClick={() => scrollToIndex(activeIndex - 1)}
            >
               <ChevronLeft size={18} />
            </button>

            {/* Trilho de Imagens com Scroll Sincronizado */}
            <div
               className="gallery-scroll-track"
               ref={scrollRef}
               onScroll={handleScroll}
            >
               {images.map((imagen, index) => (
                  <div key={index} className="gallery-slide-item">
                     <img src={`https://banck-end.vercel.app/imagem/${imagen.id}`} alt={index + 1} />
                  </div>
               ))}
            </div>

            <button
               className="gallery-nav-btn right"
               onClick={() => scrollToIndex(activeIndex + 1)}
            >
               <ChevronRight size={18} />
            </button>


            <div className="gallery-actions-overlay">
               <button
                  className="btn-icon-circle"
                  onClick={() => { actionFav() }}
               >
                  <Heart className={fav ? 'redb' : ''}
                     size={18}
                     fill={fav ? 'currentColor' : 'none'}
                  />
               </button>
            </div>
         </div>


         <div className="thumbnail-list">
            {images.map((imagen, idx) => (
               <div
                  key={idx}
                  className={`thumbnail-item ${idx === activeIndex ? "active" : ""}`}
                  onClick={() => scrollToIndex(idx)}
               >
                  <img src={`https://banck-end.vercel.app/imagem/${imagen.id}`} alt={`Thumb ${idx + 1}`} />
               </div>
            ))}
         </div>
      </div>
   );
}