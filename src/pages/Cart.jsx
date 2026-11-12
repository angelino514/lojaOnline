import { useEffect, useState } from "react";
import getBrowserId from "../modules/getBrowserId";
import "../styles/Cart.css";
import {
   Store,
   Trash2,
   Heart,
   Minus,
   Plus,
   ChevronUp,
   ChevronDown,
   X
} from "lucide-react";
import Header from "../components/Header";
import MenuMobile from "../components/MenuMobile";
import { CartContext } from '../App'
import { useContext } from "react"
import { useNavigate } from "react-router-dom";


export default function Cart() {

   const { setCartNumber } = useContext(CartContext)
   const navigation = useNavigate()

   const [products, setProducts] = useState([]);
   const [showMobileSummary, setShowMobileSummary] = useState(false);

   async function getCartItems() {
      const formdata = new FormData();
      formdata.append('browserId', getBrowserId());

      try {
         const res = await fetch('https://banck-end.vercel.app/getCartItems', {
            method: 'POST',
            credentials: 'include',
            body: formdata
         });

         const data = await res.json();
         const productsWithDefaults = data.productsCart.map(item => ({
            ...item,
            checked: false,
            quantidade: Number(item.quantidade) || 1
         }));
         setProducts(productsWithDefaults);

      } catch (error) {
         return;
      }
   }


   useEffect(() => {
      getCartItems();
   }, []);

   // Manipula o check individual de cada produto
   function handleCheck(e, id) {
      const isChecked = e.target.checked;
      setProducts(prev =>
         prev.map(item => item.id === id ? { ...item, checked: isChecked } : item)
      );
   }

   // Manipula o "Selecionar todos"
   function handleSelectAll(e) {
      const isChecked = e.target.checked;
      setProducts(prev =>
         prev.map(item => ({ ...item, checked: isChecked }))
      );
   }

   // Altera a quantidade em tempo real
   function handleQuantityChange(id, delta) {
      setProducts(prev =>
         prev.map(item => {
            if (item.id === id) {
               const newQty = item.quantidade + delta;
               return { ...item, quantidade: newQty > 0 ? newQty : 1 };
            }
            return item;
         })
      );
   }

   function finalizarCompra() {
      navigation('/Checkout', {
         state: {
            produtos: selectedItems
         }
      });
   }

   async function deleteProduct(carrinho_id) {
      try {

         const formdata = new FormData();
         formdata.append('carrinho_id', carrinho_id);
         formdata.append('browserId', getBrowserId());

         const res = await fetch(
            'https://banck-end.vercel.app/deleteCartItem',
            {
               method: 'DELETE',
               credentials: 'include',
               body: formdata
            }
         );
         const data = await res.json();
         if (data.success) {
            setProducts(prev => prev.filter(item => item.id != carrinho_id))
            setCartNumber(prev => prev - 1)
         }

      } catch (error) {
         return
      }
   }


   const selectedItems = products.filter(item => item.checked);
   const isAllSelected = products.length > 0 && products.every(item => item.checked);

   return (
      <>

         <Header pagin={'Cart'} />
         <MenuMobile />

         <div className="ali-cart-page main-app-containers">
            <div className="face">

               <div className="cart-container">
                  <div className="cart-items-section">

                     <div className="cart-header-title">
                        <h1>Carrinho de Compras</h1>
                        <span className="cart-count-badge">({products.length} itens)</span>
                     </div>

                     <div className="cart-select-all-bar">
                        <label className="checkbox-label">
                           <input
                              type="checkbox"
                              checked={isAllSelected}
                              onChange={handleSelectAll}
                              className="cart-checkbox"
                           />
                           <span>Selecionar todos os itens</span>
                        </label>
                     </div>

                     <div className="cart-store-group">
                        <div className="cart-store-header">
                           <div className="store-title-left">
                              <Store size={16} className="store-icon" />
                              <span className="store-name">Global Tech Official Store</span>
                           </div>
                           <span className="store-shipping-badge">Frete Grátis</span>
                        </div>

                        {/* Lista de Produtos */}
                        <div className="cart-products-list">
                           {products.map((item, index) => (
                              <section key={item.id || index}>
                                 <div className="cart-product-card">
                                    <input
                                       type="checkbox"
                                       checked={!!item.checked}
                                       className="cart-checkbox"
                                       onChange={(e) => handleCheck(e, item.id)}
                                    />

                                    <div className="cart-product-img-wrapper">
                                       <img
                                          src={`https://banck-end.vercel.app/imagens/${item.produto_id}`}
                                          alt={item.nome}
                                       />
                                    </div>

                                    <div className="cart-product-details">
                                       <h3 className="cart-product-title">{item.nome}</h3>

                                       {/* Renderiza especificacoes_selecionadas e outras_especificacoes_selecionadas */}
                                       {((item.especificacoes_selecionadas && item.especificacoes_selecionadas.length > 0) ||
                                          (item.outras_especificacoes_selecionadas && item.outras_especificacoes_selecionadas.length > 0)) && (
                                             <div className="cart-product-spec">
                                                {[
                                                   ...(item.especificacoes_selecionadas || []).map(esp => esp.valor || Object.values(esp)[0]),
                                                   ...(item.outras_especificacoes_selecionadas || []).map(esp => esp.valor)
                                                ].filter(Boolean).join(" / ")}
                                             </div>
                                          )}

                                       <div className="cart-product-bottom">
                                          <div className="cart-price-box">
                                             <span className="currency">Kz</span>
                                             <span className="amount">
                                                {Number(item.preco).toLocaleString("pt-PT", { minimumFractionDigits: 2 })}
                                             </span>
                                             {item.promocao === "Sim" && item.preco_original && (
                                                <span className="original-price">
                                                   Kz {Number(item.preco_original).toLocaleString("pt-PT")}
                                                </span>
                                             )}
                                          </div>

                                          <div className="cart-actions-row">
                                             <div className="quantity-selector">
                                                <button
                                                   className="qty-btn"
                                                   onClick={() => handleQuantityChange(item.id, -1)}
                                                >
                                                   <Minus size={12} />
                                                </button>

                                                <input
                                                   type="text"
                                                   value={item.quantidade}
                                                   readOnly
                                                   className="qty-input"
                                                />

                                                <button
                                                   className="qty-btn"
                                                   onClick={() => handleQuantityChange(item.id, 1)}
                                                >
                                                   <Plus size={12} />
                                                </button>
                                             </div>

                                             <div className="cart-item-icons">
                                                <button className="icon-action-btn" title="Favoritar"><Heart size={16} /></button>
                                                <button className="icon-action-btn delete" title="Remover"
                                                   onClick={() => { deleteProduct(item.id) }}
                                                ><Trash2 size={16} /></button>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </section>
                           ))}
                        </div>
                     </div>
                  </div>

                  {/* --- COLUNA DIREITA / RESUMO (RESPONSIVO) --- */}
                  <div className="cart-summary-section">
                     {/* O backdrop escuro só aparece quando showMobileSummary for true no telemóvel */}
                     {showMobileSummary && (
                        <div
                           className="mobile-summary-backdrop"
                           onClick={() => setShowMobileSummary(false)}
                        />
                     )}

                     <div className={`summary-card ${showMobileSummary ? "mobile-expanded" : ""}`}>
                        <div className="mobile-summary-header">
                           <h3>Resumo do Pedido</h3>
                           <button className="btn-close-summary" onClick={() => setShowMobileSummary(false)}>
                              <X size={18} />
                           </button>
                        </div>

                        <h2 className="summary-title-desktop">Resumo do Pedido</h2>

                        {(() => {
                           const subtotal = selectedItems.reduce((acc, item) => acc + (Number(item.preco) * item.quantidade), 0);

                           const totalDesconto = selectedItems.reduce((acc, item) => {
                              return item.promocao === "Sim" ? acc + (Number(item.preco) * 0.2 * item.quantidade) : acc;
                           }, 0);

                           const totalGeral = subtotal - totalDesconto;
                           const totalItens = selectedItems.reduce((acc, item) => acc + item.quantidade, 0);

                           return (
                              <>
                                 <div className="summary-row">
                                    <span>Subtotal ({totalItens} {totalItens === 1 ? 'item' : 'itens'})</span>
                                    <span>Kz {subtotal.toLocaleString("pt-PT", { minimumFractionDigits: 2 })}</span>
                                 </div>

                                 {totalDesconto > 0 && (
                                    <div className="summary-row">
                                       <span>Descontos</span>
                                       <span className="discount-text">-Kz {totalDesconto.toLocaleString("pt-PT", { minimumFractionDigits: 2 })}</span>
                                    </div>
                                 )}

                                 <div className="summary-row">
                                    <span>Frete</span>
                                    <span className="free-shipping">Grátis</span>
                                 </div>

                                 <hr className="summary-divider" />

                                 <div className="summary-total-row">
                                    <div>
                                       <span className="total-label-mobile">Total Estimado</span>
                                       <span className="summary-main-title-desktop">Total Estimado</span>
                                    </div>
                                    <div className="total-price-box">
                                       <span className="currency">Kz</span>
                                       <span className="total-amount">
                                          {totalGeral.toLocaleString("pt-PT", { minimumFractionDigits: 2 })}
                                       </span>
                                    </div>
                                 </div>

                                 <div className="summary-mobile-actions-row">
                                    <button
                                       className="btn-toggle-summary"
                                       onClick={() => setShowMobileSummary(!showMobileSummary)}
                                    >
                                       {showMobileSummary ? (
                                          <>Ocultar <ChevronDown size={14} /></>
                                       ) : (
                                          <>Ver Resumo <ChevronUp size={14} /></>
                                       )}
                                    </button>

                                    <button onClick={() => finalizarCompra()} className="btn-checkout" disabled={totalItens === 0}>
                                       Finalizar Compra ({totalItens})
                                    </button>
                                 </div>
                              </>
                           );
                        })()}

                        <div className="summary-guarantee">
                           <span>🛡️ Garantia de Reembolso AliExpress de 15 dias</span>
                        </div>
                     </div>
                  </div>

               </div>

            </div>
         </div>
      </>
   );
}