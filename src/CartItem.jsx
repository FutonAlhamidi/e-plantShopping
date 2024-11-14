import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
        return total + (item.cost * item.quantity);
      }, 0);
  };
  

  


  // دالة لزيادة الكمية
  const handleIncrement = (item) => {
    // زيادة الكمية بواحد
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // دالة لتقليل الكمية
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      // إذا كانت الكمية أكبر من 1، نخفضها بمقدار 1
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      // إذا كانت الكمية تساوي 1، نقوم بإزالة العنصر من السلة
      dispatch(removeItem(item));
    }
  };

  // إزالة العنصر من السلة
  const handleRemove = (item) => {
    dispatch(removeItem(item));
  };

  // حساب التكلفة الإجمالية للعنصر بناءً على الكمية
  const calculateTotalCost = (item) => {
    return item.cost * item.quantity; // ضرب الكمية في تكلفة الوحدة
  };

  // الدالة التي يتم استدعاؤها للعودة إلى صفحة التسوق
  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping();  // استدعاء الدالة المرسلة من المكون الأب
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


