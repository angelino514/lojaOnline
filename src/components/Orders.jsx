import React, { useState } from "react";
import { Package, Clock, Truck, CheckCircle, ChevronRight } from "lucide-react";
import "../styles/MyAccount.css";

const ordersData = [
   {
      id: "ORD-98234",
      date: "28/10/2026",
      type: "in_progress",
      status: "Em trânsito",
      statusIcon: Truck,
      statusClass: "status-transit",
      total: "47.500 KZ",
      itemsCount: 2,
      image: "https://via.placeholder.com/80"
   },
   {
      id: "ORD-91043",
      date: "02/11/2026",
      type: "in_progress",
      status: "Processando",
      statusIcon: Clock,
      statusClass: "status-processing",
      total: "35.000 KZ",
      itemsCount: 1,
      image: "https://via.placeholder.com/80"
   },
   {
      id: "ORD-95112",
      date: "15/10/2026",
      type: "completed",
      status: "Entregue",
      statusIcon: CheckCircle,
      statusClass: "status-delivered",
      total: "12.500 KZ",
      itemsCount: 1,
      image: "https://via.placeholder.com/80"
   }
];

export default function Orders() {
   const [activeTab, setActiveTab] = useState("in_progress");

   const filteredOrders = ordersData.filter(order => order.type === activeTab);

   return (
      <div className="orders-container">
         <div className="orders-header">
            <h2>
               <Package size={20} /> Meus Pedidos
            </h2>
         </div>

         {/* Menu de Abas */}
         <div className="orders-tabs-menu">
            <button 
               className={`orders-tab-btn ${activeTab === "in_progress" ? "active" : ""}`}
               onClick={() => setActiveTab("in_progress")}
            >
               Em andamento
            </button>
            <button 
               className={`orders-tab-btn ${activeTab === "completed" ? "active" : ""}`}
               onClick={() => setActiveTab("completed")}
            >
               Concluído
            </button>
         </div>

         <div className="orders-list">
            {filteredOrders.length > 0 ? (
               filteredOrders.map((order) => {
                  const StatusIcon = order.statusIcon;
                  return (
                     <div key={order.id} className="order-card">
                        <div className="order-card-header">
                           <span className="order-id">{order.id}</span>
                           <span className={`order-status-badge ${order.statusClass}`}>
                              <StatusIcon size={14} /> {order.status}
                           </span>
                        </div>

                        <div className="order-card-body">
                           <img src={order.image} alt="Produto do pedido" className="order-img" />
                           <div className="order-info">
                              <span className="order-date">Data: {order.date}</span>
                              <span className="order-items-count">
                                 {order.itemsCount} {order.itemsCount === 1 ? 'item' : 'itens'} no pedido
                              </span>
                              <span className="order-total">Total: <strong>{order.total}</strong></span>
                           </div>
                        </div>

                        <div className="order-card-footer">
                           <button className="btn-track-order">
                              Ver detalhes <ChevronRight size={14} />
                           </button>
                        </div>
                     </div>
                  );
               })
            ) : (
               <div className="orders-empty-state">
                  <span>Nenhum pedido encontrado nesta seção.</span>
               </div>
            )}
         </div>
      </div>
   );
}