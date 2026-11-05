import "../styles/ProductDetailsSkeleton.css";

export default function ProductDetailsSkeleton() {
  return (
    <div className="ali-product-details-page">
      <div className="product-details-container">
        
        {/* --- COLUNA ESQUERDA: SKELETON DA GALERIA --- */}
        <div className="product-gallery-section">
          <div className="skeleton-main-image skeleton-pulse"></div>
          <div className="skeleton-thumbnail-list">
            <div className="skeleton-thumb skeleton-pulse"></div>
            <div className="skeleton-thumb skeleton-pulse"></div>
            <div className="skeleton-thumb skeleton-pulse"></div>
            <div className="skeleton-thumb skeleton-pulse"></div>
          </div>
        </div>

        {/* --- COLUNA DIREITA: SKELETON DAS INFORMAÇÕES --- */}
        <div className="product-info-section">
          
          {/* Tag de Oferta */}
          <div className="skeleton-line short skeleton-pulse"></div>

          {/* Título do Produto (2 linhas) */}
          <div className="skeleton-line title-line-1 skeleton-pulse"></div>
          <div className="skeleton-line title-line-2 skeleton-pulse"></div>

          {/* Avaliações e Vendas */}
          <div className="skeleton-line medium skeleton-pulse" style={{ width: "60%" }}></div>

          {/* Bloco de Preços */}
          <div className="skeleton-price-box skeleton-pulse"></div>

          <hr className="details-divider" />

          {/* Seleção de Variação (Cores / Specs) */}
          <div className="product-option-group">
            <div className="skeleton-line short skeleton-pulse"></div>
            <div className="skeleton-spec-list">
              <div className="skeleton-chip skeleton-pulse"></div>
              <div className="skeleton-chip skeleton-pulse"></div>
              <div className="skeleton-chip skeleton-pulse"></div>
            </div>
          </div>

          {/* Quantidade */}
          <div className="product-option-group">
            <div className="skeleton-line short skeleton-pulse"></div>
            <div className="skeleton-qty-box skeleton-pulse"></div>
          </div>

          <hr className="details-divider" />

          {/* Frete e Garantias */}
          <div className="skeleton-shipping-box skeleton-pulse"></div>

          {/* Loja */}
          <div className="skeleton-store-box skeleton-pulse"></div>

          {/* Botões de Ação */}
          <div className="skeleton-actions-row">
            <div className="skeleton-btn skeleton-pulse"></div>
            <div className="skeleton-btn skeleton-pulse"></div>
          </div>

        </div>
      </div>
    </div>
  );
}