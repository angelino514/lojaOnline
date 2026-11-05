import ImageGallery from "../components/ImageGallery";
import { useParams } from "react-router-dom";
import getBrowserId from "../modules/getBrowserId";
import CartToastLoader from "../components/CartToastLoader";
import CartMessageSection from "../components/CartMessageSection";
import CartErrorMessageSection from "../components/CartErrorMessageSection";
import ProductDetailsSkeleton from "../components/ProductDetailsSkeleton";
import "../styles/ProductDetails.css";
import {
  Star,
  Truck,
  ShieldCheck,
  ChevronRight,
  Store,
  MessageSquare,
  Minus,
  Plus
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CartContext } from '../App'
import { useContext } from "react"
import Header from "../components/Header";
import ListCards from "../components/ListaCards";


export default function ProductDetails() {


  const [product, setproduct] = useState([])
  const { setCartNumber } = useContext(CartContext)

  const [quantidade, setquantidade] = useState(1)
  const [espSelected, setEspSelected] = useState(null)
  const [otherEspSelected, setOtherEspSelected] = useState(null)

  const [loadingAddCart, setLoadingAddCart] = useState(false)
  const [cartMessage, setCartMessage] = useState(false)
  const [erroMessage, setErroMessage] = useState(false)
  const [loadingProduct, setLoadingProduct] = useState(true)

  const { id, action, values } = useParams()

  async function getProductDetails(id) {
    setLoadingProduct(true)
    try {
      const response = await fetch(
        `https://banck-end.vercel.app/detailsStore/${id}`, {
        credentials: 'include',
      }
      );

      if (!response.ok) {
        throw new Error('Erro ao buscar detalhes do produto');
      }

      const data = await response.json();
      setproduct(data[0])

    } catch (error) {
    } finally { setLoadingProduct(false) }
  }

  useEffect(() => {
    getProductDetails(id)
    window.scrollTo(0, 0);
  }, [id])

  useEffect(() => {
    if (product?.specifications?.length > 0) {
      setEspSelected(product.specifications[0].valor);
    }

    if (product?.otherSpecifications?.length > 0) {
      setOtherEspSelected(product.otherSpecifications[0].valor);
    }
  }, [product]);


  const [products, setProducts] = useState([])
  const [offset, setOffset] = useState(0)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const loadingRef = useRef(false)
  const requestId = useRef(0)

  async function fetchProducts(pageOffset, replace = false) {

    if (loadingRef.current) return

    loadingRef.current = true
    setLoading(true)

    const currentRequest = requestId.current

    try {

      const formData = new FormData()
      formData.append('browserId', getBrowserId())

      const response = await fetch(
        `https://banck-end.vercel.app/searchStore/${action}/${encodeURIComponent(values)}?limit=10&offset=${pageOffset}`,
        {
          method: 'POST',
          credentials: 'include',
          body: formData
        }
      )

      const data = await response.json()

      // Ignorar respostas de pesquisas anteriores
      if (currentRequest !== requestId.current) return
      if (data.success) {
        const newProducts = data.produtos

        setProducts(prev =>
          replace ? newProducts : [...prev, ...newProducts]
        )
        setOffset(pageOffset + newProducts.length)
        setHasMore(newProducts.length === 10)

      } else {
        return
      }

    } catch (error) {
      return
    } finally {
      if (currentRequest === requestId.current) {
        loadingRef.current = false
        setLoading(false)
      }
    }
  }

  // Executar sempre que mudar a categoria ou pesquisa
  useEffect(() => {
    requestId.current++
    loadingRef.current = false
    setProducts([])
    setOffset(0)
    setHasMore(true)
    fetchProducts(0, true)
  }, [action, values])

  // Carregar próxima página
  function loadMore() {
    if (loadingRef.current || !hasMore) return
    fetchProducts(offset)
  }


  async function addCart() {
    setLoadingAddCart(true)
    try {
      const formData = new FormData()

      formData.append('produto_id', product.id);
      formData.append('preco', product.preco);
      formData.append('quantidade', quantidade);
      formData.append('promocao', product.promocao);
      formData.append('browser_id', getBrowserId())
      formData.append('espSelecionado', espSelected);
      formData.append('outrasEspSelecionado', otherEspSelected);

      const response = await fetch('https://banck-end.vercel.app/addCart', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      const data = await response.json();
      if (data.success) {
        setCartNumber(prev => prev + 1)
      }

    } catch (error) {
    } finally { setLoadingAddCart(false) }
  }

  const newProducts = products.filter(p => p.id != id)
  return (

    <>
      <Header pagin={'Details'} />
      {cartMessage && <CartMessageSection />}
      {loadingAddCart && <CartToastLoader />}
      {erroMessage && <CartErrorMessageSection />}


      {loadingProduct ? <ProductDetailsSkeleton /> :
        <div className="ali-product-details-page">
          <div className="product-details-container">

            {/* --- COLUNN Left */}
            <div className="product-gallery-section">
              <ImageGallery images={product.images} id={product.id} />
            </div>

            {/* --- COLUNN Rith */}
            <div className="product-info-section">

              {/* Tag de Super Oferta */}
              <div className="product-flash-tag">
                <span>SUPER OFERTA</span>
              </div>


              {/* Título do Produto */}
              <h1 className="product-title-text">{product.nome}</h1>

              {/* Despription */}
              <div className="">
                <p> {product.descricao} </p>
              </div>

              {/* Avaliações e Vendas */}
              <div className="product-rating-row">
                <div className="stars-box">
                  {/* <spa> </spa<Star size={14} fill="#ff4747" color="#ff4747" />
                  <span className="rating-score">{product.rating}</span> */}
                </div>
                <span className="meta-text">{product.stock} Uni.</span>
                <span className="dot-divider">•</span>
              </div>

              {/* Bloco de Preços */}
              <div className="product-price-box">
                <div className="price-main-row">
                  <span className="currency-symbol">Kz</span>
                  <span className="price-amount">{product.preco - ((product.preco * 5) / 100)}</span>
                </div>
                <div className="original-price-row">
                  <span>De: Kz {product.preco}</span>
                </div>
              </div>

              <hr className="details-divider" />

              {/* Seleção de Variação (Especificações) */}
              <div className="product-option-group">
                <div className="spec-options-list">
                  {product.specifications?.map((esp, index) => {
                    const isSelected = espSelected === esp.valor;
                    return (
                      <div
                        key={index}
                        className={`spec-option-chip ${isSelected ? "selected" : ""}`}
                        onClick={() => setEspSelected(esp.valor)}
                      >
                        <span className="spec-value">{esp.valor}</span>
                      </div>
                    );
                  })}
                </div>
              </div>


              {/* Seleção de Variação (Outras Especificações) */}
              <div className="product-option-group">
                <div className="spec-options-list">
                  {product.otherSpecifications?.map((esp, index) => {
                    const isSelected = otherEspSelected === esp.valor;
                    return (
                      <div
                        key={index}
                        className={`spec-option-chip ${isSelected ? "selected" : ""}`}
                        onClick={() => setOtherEspSelected(esp.valor)}
                      >
                        <span className="spec-value">{esp.valor}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Quantidade */}
              <div className="product-option-group">
                <label className="option-label">Quantidade:</label>
                <div className="quantity-selector">

                  <button className="qty-btn" onClick={() => {
                    if (quantidade > 1) {
                      setquantidade(quantidade - 1)
                    }
                  }}><Minus size={14} /></button>
                  <input type="text" value={quantidade} readOnly className="qty-input" />
                  <button className="qty-btn"
                    onClick={() => { setquantidade(quantidade + 1) }}
                  ><Plus size={14} /></button>

                </div>
              </div>

              <hr className="details-divider" />

              {/* Frete e Garantias */}
              <div className="shipping-guarantee-box">
                <div className="info-row">
                  <Truck size={18} className="info-icon" />
                  <div className="info-content">
                    <span className="info-title">Frete Grátis</span>
                    <span className="info-sub">Entrega estimada: 7 a 15 dias úteis</span>
                  </div>
                  <ChevronRight size={16} className="arrow-right" />
                </div>

                <div className="info-row">
                  <ShieldCheck size={18} className="info-icon" />
                  <div className="info-content">
                    <span className="info-title">Proteção ao Comprador</span>
                    <span className="info-sub">Reembolso em até 15 dias se houver problemas</span>
                  </div>
                </div>
              </div>

              {/* Botões de Ação (Desktop) */}
              <div className="product-actions-desktop">
                <button className="btn-add-cart" onClick={() => { addCart() }} >Adicionar ao Carrinho</button>
                <button className="btn-buy-now">Comprar Agora</button>
              </div>

            </div>
          </div>

          {/* --- BARRA FIXA DE COMPRA MOBILE (Estilo AliExpress) --- */}
          <div className="mobile-bottom-bar">
            <div className="mobile-btn-group">
              <button className="mobile-btn-cart" onClick={() => { addCart() }}>Carrinho</button>
              <button className="mobile-btn-buy">Comprar</button>
            </div>
          </div>
        </div>}
      <div className="face">
        <h2> Produtos Relacionados </h2>
      </div>
      <ListCards products={newProducts} loadMore={loadMore} loading={loading} pagin={'Details'} />
    </>
  );
}