import { useRef } from "react";
import "../styles/HeroBanner.css";
import { Flame, Clock, ChevronLeft, ChevronRight } from "lucide-react";

export default function HeroBanner() {
   // Referências para controlar a rolagem horizontal de cada carrossel
   const promoScrollRef = useRef(null);
   const highlightScrollRef = useRef(null);

   // Função genérica para rolar para a esquerda ou direita
   const scrollContainer = (ref, direction) => {
      if (ref.current) {
         const scrollAmount = 250; // Quantidade de pixels que o carrossel avança
         ref.current.scrollBy({
            left: direction === "left" ? -scrollAmount : scrollAmount,
            behavior: "smooth"
         });
      }
   };

   // Produtos para a primeira seção (Promoções Relâmpago)
   const promoProducts = [
      { id: 1, name: "Smartwatch Esportivo Pro", price: "8.900", discount: "-70%", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&auto=format&fit=crop&q=60" },
      { id: 2, name: "Fone Bluetooth TWS Gamer", price: "3.500", discount: "-85%", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&auto=format&fit=crop&q=60" },
      { id: 3, name: "Mini Projetor Portátil HD", price: "24.000", discount: "-60%", image: "https://images.unsplash.com/photo-1517649763962-0c6232660102?w=300&auto=format&fit=crop&q=60" },
      { id: 4, name: "Suporte Articulado Notebook", price: "6.200", discount: "-50%", image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300&auto=format&fit=crop&q=60" },
      { id: 5, name: "Luminária LED Mesa RGB", price: "4.500", discount: "-55%", image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300&auto=format&fit=crop&q=60" }
   ];

   // Produtos para a segunda seção (Destaques)
   const highlightProducts = [
      { id: 6, name: "Câmera de Segurança Wi-Fi", price: "11.000", discount: "-40%", image: "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?w=300&auto=format&fit=crop&q=60" },
      { id: 7, name: "Teclado Mecânico RGB Sem Fio", price: "18.500", discount: "-45%", image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&auto=format&fit=crop&q=60" },
      { id: 8, name: "Mouse Gamer Ergonômico", price: "7.400", discount: "-55%", image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=300&auto=format&fit=crop&q=60" },
      { id: 9, name: "Carregador Portátil PowerBank", price: "9.900", discount: "-65%", image: "https://images.unsplash.com/photo-1609592424075-103e622b781a?w=300&auto=format&fit=crop&q=60" },
      { id: 10, name: "Caixa de Som Bluetooth Pro", price: "14.200", discount: "-50%", image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=300&auto=format&fit=crop&q=60" }
   ];

   return (
      <section className="ali-hero-banner face">
         {/* Banner Principal de Oferta Relâmpago */}
         <div className="ali-hero-main-banner">
            <div className="hero-banner-left">
               <div className="hero-tag-flash">
                  <Flame size={14} fill="#ffffff" /> <span>Super Oferta Relâmpago</span>
               </div>
               <h2>Descontos de até 80%</h2>
               <p>Frete grátis e ofertas imperdíveis por tempo limitado</p>

               <div className="hero-timer">
                  <Clock size={14} />
                  <span>Termina em: <strong>02:45:12</strong></span>
               </div>
            </div>

            <div className="hero-banner-right">
               <span className="hero-big-discount">80% OFF</span>
            </div>
         </div>

         {/* --- PRIMEIRA DIV: SUPER PROMOÇÕES (Com Botões de Navegação) --- */}
         <div className="hero-section-wrapper">
            <div className="hero-section-header">
               <h1>Super Promoções</h1>
               <span className="hero-subtitle-link">Ver todas &gt;</span>
            </div>

            <div className="carousel-container">
               {/* Botão Esquerdo */}
               <button className="carousel-btn left hiden-btn" onClick={() => scrollContainer(promoScrollRef, "left")}>
                  <ChevronLeft size={20} />
               </button>

               {/* Container com Scroll Infinito */}
               <div className="hero-conteiners" ref={promoScrollRef}>
                  {promoProducts.map((p) => (
                     <div key={`promo-${p.id}`} className="hero-card">
                        <span className="hero-badge-discount">{p.discount}</span>
                        <img src={p.image} alt={p.name} className="hero-card-img" />
                        <div className="hero-card-info">
                           <span className="hero-card-name">{p.name}</span>
                           <span className="hero-card-price">Kz {p.price}</span>
                        </div>
                     </div>
                  ))}
               </div>

               {/* Botão Direito */}
               <button className="carousel-btn right hiden-btn" onClick={() => scrollContainer(promoScrollRef, "right")}>
                  <ChevronRight size={20} />
               </button>
            </div>
         </div>

         {/* --- SEGUNDA DIV: MAIS DESTAQUES (Com Botões de Navegação) --- */}
         <div className="hero-section-wrapper">
            <div className="hero-section-header">
               <h1 className="highlight-title">Mais Destaques</h1>
               <span className="hero-subtitle-link">Explorar &gt;</span>
            </div>

            <div className="carousel-container">
               {/* Botão Esquerdo */}
               <button className="carousel-btn left hiden-btn" onClick={() => scrollContainer(highlightScrollRef, "left")}>
                  <ChevronLeft size={20} />
               </button>

               {/* Container com Scroll Infinito */}
               <div className="hero-conteiners" ref={highlightScrollRef}>
                  {highlightProducts.map((p) => (
                     <div key={`high-${p.id}`} className="hero-card">
                        <span className="hero-badge-discount">{p.discount}</span>
                        <img src={p.image} alt={p.name} className="hero-card-img" />
                        <div className="hero-card-info">
                           <span className="hero-card-name">{p.name}</span>
                           <span className="hero-card-price">Kz {p.price}</span>
                        </div>
                     </div>
                  ))}
               </div>

               {/* Botão Direito */}
               <button className="carousel-btn right hiden-btn" onClick={() => scrollContainer(highlightScrollRef, "right")}>
                  <ChevronRight size={20} />
               </button>
            </div>
         </div>
      </section>
   );
}