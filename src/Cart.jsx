import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  clearCart,
  addOrder,
} from "./store";
import {
  applyDiscount,
  calculateTotal,
  getCouponDiscount,
} from "./discountUtils";
import { QRCodeCanvas } from "qrcode.react"; // ✅ QR import
import "./Cart.css";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.Cart);
  const dispatch = useDispatch();

  const [discountRate, setDiscountRate] = useState(0);
  const [couponcode, setCouponCode] = useState("");
  const [couponResult, setCouponResult] = useState({
    isValid: false,
    discountPercent: 0,
    discountAmount: 0,
  });

  const [paymentMethod, setPaymentMethod] = useState(""); // payment selection

  
  

  const totalPrice = calculateTotal(cartItems);
  const discountedPrice = applyDiscount(totalPrice, discountRate);
  const finalTotal = totalPrice - discountedPrice - couponResult.discountAmount;

  const upiLink = `upi://pay?pa=9347143166@ybl&pn=DailyFresh&am=${finalTotal.toFixed(
    2
  )}&cu=INR`;

  const handleApplyCoupon = () => {
    const result = getCouponDiscount(couponcode, totalPrice);
    setCouponResult(result);
  };

  const handleCompletePurchase = () => {
    const purchaseDetails = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      items: [...cartItems],
      totalPrice: totalPrice,
      discountRate,
      coupon: couponResult,
      couponcode,
      finalTotal,
    };
    dispatch(addOrder(purchaseDetails));
    dispatch(clearCart());
    alert("✅ Order placed successfully!");
    navigate('/orders')
  };

  

  return (
    <div className="cart-container">
      <h2 className="cart-title">🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-layout">
          {/* LEFT: Cart Items */}
          <div className="cart-items">
            <ul>
              {cartItems.map((item) => (
                <li key={item.id} className="cart-item">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-img"
                  />
                  <div className="cart-item-details">
                    <strong>{item.name}</strong>
                    <p>
                      ₹{item.price} × {item.quantity}
                    </p>
                    <div className="cart-actions">
                      <button onClick={() => dispatch(incrementQuantity(item.id))}>
                        +
                      </button>
                      <button onClick={() => dispatch(decrementQuantity(item.id))}>
                        −
                      </button>
                      <button onClick={() => dispatch(removeFromCart(item.id))}>
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT: Summary */}
          <div className="cart-summary">
            <h3>Total: ₹{totalPrice.toFixed(2)}</h3>
            <h3>Discounted Total: ₹{discountedPrice.toFixed(2)}</h3>

            {couponResult.isValid ? (
              <h3>
                Coupon "{couponcode}" applied {couponResult.discountPercent}% Off
                : ₹{couponResult.discountAmount}
              </h3>
            ) : (
              couponcode && <h3 className="invalid-coupon">Invalid Coupon</h3>
            )}

            <h2>Net Total: ₹{finalTotal.toFixed(2)}</h2>

            {/* Discount buttons */}
            <div className="discount-buttons">
              <button onClick={() => setDiscountRate(10)}>10% Discount</button>
              <button onClick={() => setDiscountRate(20)}>20% Discount</button>
              <button onClick={() => setDiscountRate(30)}>30% Discount</button>
              <button onClick={() => setDiscountRate(0)}>Remove Discount</button>
            </div>

            {/* Coupon */}
            <div className="coupon-section">
              <input
                type="text"
                placeholder="Enter Coupon Code"
                value={couponcode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="coupon-input"
              />
              <button onClick={handleApplyCoupon} className="apply-btn">
                Apply Coupon
              </button>
            </div>

            

            {/* Payment Method */}
            <div className="payment-method">
              <h3>Select Payment Method</h3>
              <button onClick={() => setPaymentMethod("qr")}>QR Code</button>
              <button onClick={() => setPaymentMethod("card")}>Card</button>
            </div>

            {/* QR Section */}
            {paymentMethod === "qr" && (
              <div className="qr-section">
                <h4>Scan UPI QR to pay ₹{finalTotal.toFixed(2)}</h4>
                <QRCodeCanvas value={upiLink} size={220} includeMargin={true} />
                <p>UPI ID: 9347143166@ybl</p>
                <button
                  onClick={handleCompletePurchase}
                  className="complete-btn"
                >
                  ✅ I Have Paid
                </button>
              </div>
            )}

            {paymentMethod === "card" && (
              <div className="card-section">
                <p>💳 Card Payment coming soon...</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
