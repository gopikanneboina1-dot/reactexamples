
export function calculateTotal(cartItems) {
  if (!Array.isArray(cartItems)) return 0;

  return cartItems.reduce((total, item) => {
    const itemTotal = (item.price || 0) * (item.quantity || 0);
    return total + itemTotal;
  }, 0);
}


export function applyDiscount(total, percentage) {
  if (typeof total !== 'number' || typeof percentage !== 'number') return total;
  const discountAmount = (percentage / 100) * total;
  return discountAmount;
}

export function getCouponDiscount(coupon , totalPrice){

  let discountPercent = 0;

  switch(coupon)
  {
    case"Gopi10":
    discountPercent = 10;
    break;

    case"Gopi20":
    discountPercent = 20;
    break;

    case"Gopi30":
    discountPercent = 30;
    break;

    default:
    discountPercent = 0;
  }

  const discountAmount = (totalPrice * discountPercent)/100;
  return{
    isValid : discountPercent>0,
    discountAmount,
    discountPercent
  };
}


