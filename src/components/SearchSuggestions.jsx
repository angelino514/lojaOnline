import "../styles/SearchSuggestions.css";
import { ArrowUpLeft, Search, X } from "lucide-react";
import { useState, useRef, useEffect, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { CartContext } from '../App'


export default function SearchSuggestions({ searchProducts }) {

   const { oldSearches, productList, suggestons, setSuggestons } = useContext(CartContext)
   const [values, setValues] = useState('')
   const navigation = useNavigate()

   function handleghange(e) {
      const value = e.target.value
      if (value.trim() === '' || !value) {
         return
      }
      setValues(value)
   }

   function activityFinaly() {
      if (!values || values.trim() === '') {
         return
      }
      searchProducts(values)
      setValues('')
   }
   const inputRef = useRef(null)
   useEffect(() => {
      inputRef.current?.focus()
   }, [])

   function viewDetails(id, categoria) {
      setSuggestons(false)
      navigation(`/ProductDetails/${id}/Categories/${categoria}`)
   }

   return (
      <>
         <div className="sugestons-container">
            <div className="face">

               {/* Caixa de Pesquisa */}
               <div className="container-box-all-caixa">
                  <button className="btn-close-searchSugestons">
                     <X size={20} onClick={() => { setSuggestons(false) }} />
                  </button>
                  <div className="container-input-box">
                     <Search className="search-icon-input" size={18} />
                     <input ref={inputRef}
                        type="text" placeholder="O que você está procurando?"
                        onChange={handleghange}
                        onKeyDown={(e) => {
                           if (e.key === 'Enter') {
                              activityFinaly()
                           }
                        }}
                     />
                     <button className="search-submit-btn"
                        onClick={() => { activityFinaly() }}
                     >Buscar</button>
                  </div>
               </div>

               {/* Pesquisas antigas */}
               <div className="old-searches-section">
                  <span className="section-title">Buscas recentes</span>
                  <div className="old-searches-list">
                     {oldSearches?.map((search, index) => (
                        <div key={index} className="old-search-item" onClick={() => {
                           searchProducts(search.pesquisa)
                        }}>
                           <span className="search-text">{search.pesquisa}</span>
                           <ArrowUpLeft className="arrow-icon" size={16} />
                        </div>
                     ))}
                  </div>
               </div>

               {/* List Cards de Produtos */}
               <div className="suggested-products-section">
                  <span className="section-title">Produtos sugeridos</span>
                  <div className="products-grid-list">
                     {productList.map((product, index) => (
                        <div key={index} className="product-card" onClick={() => {
                           viewDetails(product.id, product.categoria)
                        }}>
                           <img
                              className="product-img"
                              src={`https://banck-end.vercel.app/imagens/${product.id}`}
                              alt={product.nome}
                           />

                           <div className="product-details">
                              <span className="product-name">{product.nome}</span>
                              <span className="product-price"> Kz{product.preco}</span>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}