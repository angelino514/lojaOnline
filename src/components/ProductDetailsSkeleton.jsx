import "../styles/ProductDetailsSkeleton.css";

export default function ProductDetailsSkeleton() {
  return (
    <div className="ali-product-details-page">
      <div className="face">

        <div className="product-details-container">

          {/* COLUNA ESQUERDA - GALERIA */}
          <div className="product-gallery-section">
            <div className="face">

              <div className="skeleton-gallery">

                <div className="skeleton-gallery-main">
                  <div className="skeleton-shimmer" />
                </div>

                <div className="skeleton-thumbnails">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <div
                      key={item}
                      className="skeleton-thumbnail"
                    >
                      <div className="skeleton-shimmer" />
                    </div>
                  ))}
                </div>

              </div>

            </div>
          </div>

          {/* COLUNA DIREITA - INFORMAÇÕES */}
          <div className="product-info-section">
            <div className="face">

              {/* ETIQUETA */}
              <div className="skeleton-tag">
                <div className="skeleton-shimmer" />
              </div>

              {/* TÍTULO */}
              <div className="skeleton-title">
                <div className="skeleton-shimmer" />
              </div>

              <div className="skeleton-title skeleton-title-short">
                <div className="skeleton-shimmer" />
              </div>

              {/* DESCRIÇÃO */}
              <div className="skeleton-description">
                <div className="skeleton-line">
                  <div className="skeleton-shimmer" />
                </div>
                <div className="skeleton-line">
                  <div className="skeleton-shimmer" />
                </div>
                <div className="skeleton-line skeleton-line-short">
                  <div className="skeleton-shimmer" />
                </div>
              </div>

              {/* AVALIAÇÕES */}
              <div className="skeleton-rating">
                <div className="skeleton-rating-stars">
                  <div className="skeleton-shimmer" />
                </div>
                <div className="skeleton-rating-stock">
                  <div className="skeleton-shimmer" />
                </div>
              </div>

              {/* PREÇO */}
              <div className="skeleton-price">
                <div className="skeleton-price-main">
                  <div className="skeleton-shimmer" />
                </div>
                <div className="skeleton-price-old">
                  <div className="skeleton-shimmer" />
                </div>
              </div>

              <hr className="details-divider" />

              {/* PRIMEIRAS ESPECIFICAÇÕES */}
              <div className="skeleton-options">
                <div className="skeleton-option">
                  <div className="skeleton-shimmer" />
                </div>
                <div className="skeleton-option">
                  <div className="skeleton-shimmer" />
                </div>
                <div className="skeleton-option">
                  <div className="skeleton-shimmer" />
                </div>
              </div>

              {/* OUTRAS ESPECIFICAÇÕES */}
              <div className="skeleton-options">
                <div className="skeleton-option">
                  <div className="skeleton-shimmer" />
                </div>
                <div className="skeleton-option">
                  <div className="skeleton-shimmer" />
                </div>
              </div>

              {/* QUANTIDADE */}
              <div className="skeleton-quantity">
                <div className="skeleton-quantity-label">
                  <div className="skeleton-shimmer" />
                </div>

                <div className="skeleton-quantity-control">
                  <div className="skeleton-qty-btn">
                    <div className="skeleton-shimmer" />
                  </div>
                  <div className="skeleton-qty-input">
                    <div className="skeleton-shimmer" />
                  </div>
                  <div className="skeleton-qty-btn">
                    <div className="skeleton-shimmer" />
                  </div>
                </div>
              </div>

              <hr className="details-divider" />

              {/* ENTREGA E GARANTIA */}
              <div className="skeleton-shipping">

                <div className="skeleton-info-row">
                  <div className="skeleton-info-icon">
                    <div className="skeleton-shimmer" />
                  </div>

                  <div className="skeleton-info-text">
                    <div className="skeleton-info-title">
                      <div className="skeleton-shimmer" />
                    </div>
                    <div className="skeleton-info-sub">
                      <div className="skeleton-shimmer" />
                    </div>
                  </div>
                </div>

                <div className="skeleton-info-row">
                  <div className="skeleton-info-icon">
                    <div className="skeleton-shimmer" />
                  </div>

                  <div className="skeleton-info-text">
                    <div className="skeleton-info-title">
                      <div className="skeleton-shimmer" />
                    </div>
                    <div className="skeleton-info-sub">
                      <div className="skeleton-shimmer" />
                    </div>
                  </div>
                </div>

              </div>

              {/* BOTÕES DESKTOP */}
              <div className="product-actions-desktop skeleton-actions">
                <div className="skeleton-action-btn">
                  <div className="skeleton-shimmer" />
                </div>
                <div className="skeleton-action-btn">
                  <div className="skeleton-shimmer" />
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* BARRA FIXA MOBILE */}
        <div className="mobile-bottom-bar">
          <div className="mobile-btn-group skeleton-mobile-actions">
            <div className="skeleton-mobile-btn">
              <div className="skeleton-shimmer" />
            </div>
            <div className="skeleton-mobile-btn">
              <div className="skeleton-shimmer" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
