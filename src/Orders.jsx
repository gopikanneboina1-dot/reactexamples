import React from "react";
import { useSelector } from "react-redux";
import "./Orders.css";

function Orders() {
  const orders = useSelector((state) => state.Orders);

  return (
    <div className="orders-container">
      <h2>📦 Your Orders</h2>

      {orders.length === 0 ? (
        <p className="empty-orders">No orders yet. Start shopping! 🛒</p>
      ) : (
        <ul className="orders-list">
          {orders.map((order) => (
            <li key={order.id} className="order-card">
              <h3>🆔 Order #{order.id}</h3>
              <p>📅 Date: {order.date}</p>
              <p>💰 Total Price: ₹{order.totalPrice.toFixed(2)}</p>
              <p>📌 Status: <span className="status">{order.status}</span></p>

              <h4>🛍 Items:</h4>
              <ul className="order-items">
                {order.items.map((item) => (
                  <li key={item.id}>
                    {item.name} × {item.quantity} = ₹{(item.price * item.quantity).toFixed(2)}
                  </li>
                ))}
              </ul>

              <h3 className="final-amount">Final Amount: ₹{order.totalPrice.toFixed(2)}</h3>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Orders;
