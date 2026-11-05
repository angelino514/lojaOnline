import "../styles/CartMessageSection.css";
import { Check } from "lucide-react";

export default function CartMessageSection() {
  return (
    <section className="cart-message-fullscreen-section">
      <div className="face">
        {/* Ícone de Sucesso */}
        <div className="success-icon-badge">
          <Check size={22} strokeWidth={3} />
        </div>

        {/* Mensagem Principal */}
        <div className="cart-message-content">
          <h3 className="cart-message-title">Adicionado com sucesso!</h3>
          <p className="cart-message-sub">O seu item já faz parte do carrinho.</p>
        </div>

        {/* Botões de Ação */}
        <div className="cart-message-actions">
          <button className="btn-action view-product">Ver Produto</button>
          <button className="btn-action continue-shopping">Continuar</button>
        </div>
      </div>
    </section>
  );
}