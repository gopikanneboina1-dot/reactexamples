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
import { QRCodeCanvas } from "qrcode.react";
import "./Cart.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2"; // ✅ import sweetalert2


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
  const [paymentMethod, setPaymentMethod] = useState("");

  const totalPrice = calculateTotal(cartItems);
  const discountedPrice = applyDiscount(totalPrice, discountRate);
  const finalTotal = totalPrice - discountedPrice - couponResult.discountAmount;

  const upiLink = `upi://pay?pa=9347143166@ybl&pn=DailyFresh&am=${finalTotal.toFixed(
    2
  )}&cu=INR`;

  const handleApplyCoupon = () => {
    const result = getCouponDiscount(couponcode, totalPrice);
    setCouponResult(result);
    if (result.isValid) {
      toast.success(`🎉 Coupon "${couponcode}" applied!`);
    } else {
      toast.error("❌ Invalid coupon code");
    }
  };

  const handleDiscount = (rate) => {
    setDiscountRate(rate);
    if (rate === 0) {
      toast.info("Discount removed");
    } else {
      toast.success(`✅ ${rate}% discount applied`);
    }
  };

  const handleCompletePurchase = () => {
    const purchaseDetails = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      items: [...cartItems],
      totalPrice,
      discountRate,
      coupon: couponResult,
      couponcode,
      finalTotal,
    };
    dispatch(addOrder(purchaseDetails));
    dispatch(clearCart());

    // ✅ SweetAlert2 popup instead of alert/toast
    Swal.fire({
      title: "Payment Successful 🎉",
      text: "Thank you for your purchase! Your order has been placed.",
      icon: "success",
      confirmButtonText: "OK",
      confirmButtonColor: "#28a745",
    }).then(() => {
      navigate("/orders"); // redirect after closing popup
    });

    
  };
  



  return (
    <div className="cart-container">
      <h2 className="cart-title">🛒 Your Cart</h2>
      <ToastContainer position="top-right" autoClose={2000} />

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
            <h3>💰 Price Details</h3>
            <p>Total: ₹{totalPrice.toFixed(2)}</p>
            <p>Discounted Total: ₹{discountedPrice.toFixed(2)}</p>

            <hr />
            <h3>🏷️ Coupon</h3>
            {couponResult.isValid ? (
              <p>
                Coupon "{couponcode}" applied {couponResult.discountPercent}% Off: ₹
                {couponResult.discountAmount}
              </p>
            ) : (
              couponcode && <p className="invalid-coupon">Invalid Coupon</p>
            )}
            <div className="coupon-section">
              <input
                type="text"
                placeholder="Enter Coupon Code"
                value={couponcode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="coupon-input"
              />
              <button onClick={handleApplyCoupon} className="apply-btn">
                Apply
              </button>
            </div>

            <hr />
            <h3>💸 Apply Discount</h3>
            <div className="discount-buttons">
              <button onClick={() => handleDiscount(10)}>10%</button>
              <button onClick={() => handleDiscount(20)}>20%</button>
              <button onClick={() => handleDiscount(30)}>30%</button>
              <button onClick={() => handleDiscount(0)}>Remove</button>
            </div>

            <hr />
            <h2>Net Total: ₹{finalTotal.toFixed(2)}</h2>

              

            <hr />
            <h3>💳 Select Payment Method</h3>
            <div className="payment-method">
              <button onClick={() => setPaymentMethod("qr")}>QR Code</button>
              <button onClick={() => setPaymentMethod("card")}>Card</button>
            </div>

            {paymentMethod === "qr" && (
              <div className="qr-section">
                <h4>Scan UPI QR to pay ₹{finalTotal.toFixed(2)}</h4>
                <QRCodeCanvas value={upiLink} size={220} includeMargin={true} />
                <p>UPI ID: 9347143166@ybl</p>
                <button onClick={handleCompletePurchase} className="complete-btn">
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
