import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Trash2, ArrowLeft, Tag, ChevronRight } from 'lucide-react';
import api from "../services/api";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponMsg, setCouponMsg] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    fetchCart();
}, []);

const fetchCart = async () => {

    try {

        const response = await api.get("/cart");

        const formattedCart = response.data.map(item => ({
            cartId: item.cartId,
            productId: item.product.productId,
            name: item.product.productName,
            image: item.product.imageUrl,
            category: item.product.productCategory.name,
            price: item.product.productPrice,
            qty: item.quantity
        }));

        setCart(formattedCart);

    } catch (error) {

        console.error(error);

    }

};
const removeFromCart = async (cartId) => {

    try {

        await api.delete(`/cart/${cartId}`);

        fetchCart();

    } catch (error) {

        console.error(error);

    }

};

const updateQty = async (cartId, qty) => {

    if (qty < 1) return;

    try {

        await api.put(`/cart/${cartId}?quantity=${qty}`);

        fetchCart();

    } catch (error) {

        console.error(error);

    }

};

const clearCart = async () => {

    try {

        await api.delete("/cart/clear");

        fetchCart();

    } catch (error) {

        console.error(error);

    }

};
  const applyCoupon = () => {
    if (coupon.toUpperCase() === 'WELCOME20') {
      setDiscount(Math.round(cartTotal * 0.2));
      setCouponMsg('20% discount applied!');
    } else if (coupon.toUpperCase() === 'SAVE50') {
      setDiscount(50);
      setCouponMsg('₹50 discount applied!');
    } else {
      setDiscount(0);
      setCouponMsg('Invalid coupon code.');
    }
  };

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
);

const shipping = cartTotal > 500 ? 0 : 49;
const tax = Math.round((cartTotal - discount) * 0.18);
const total = cartTotal - discount + shipping + tax;
  if (cart.length === 0) return (
    <div className="max-w-4xl mx-auto px-4 py-24 text-center">
      <div className="w-24 h-24 bg-gradient-to-br from-primary-100 to-blush-100 rounded-4xl flex items-center justify-center mx-auto mb-6">
        <ShoppingCart className="w-10 h-10 text-primary-300" strokeWidth={1.5} />
      </div>
      <h2 className="font-display text-2xl font-semibold text-surface-800 mb-2">Your cart is empty</h2>
      <p className="text-surface-300 mb-8 text-sm">Looks like you haven't added anything yet.</p>
      <Link to="/products" className="btn-primary">Continue Shopping</Link>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
        <div>
          <p className="section-eyebrow">Your selections</p>
          <h1 className="section-title">Shopping Cart</h1>
          <p className="text-surface-300 mt-1 text-sm">{cart.length} item{cart.length > 1 ? 's' : ''}</p>
        </div>
        <button onClick={() => navigate(-1)} className="btn-ghost text-sm">
          <ArrowLeft className="w-4 h-4" /> Continue Shopping
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map(item => (
            <div key={item.cartId} className="card p-4 flex gap-4">
              <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-2xl shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-surface-800 truncate">{item.name}</h3>
                    <p className="text-xs text-surface-300 mt-0.5">{item.category}</p>
                  </div>
                  <button onClick={() => removeFromCart(item.cartId)} className="text-surface-200 hover:text-blush-500 transition-colors shrink-0">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center border border-surface-200 rounded-2xl overflow-hidden">
                    <button onClick={() => updateQty(item.cartId, item.qty - 1)} className="w-8 h-8 flex items-center justify-center text-surface-800 hover:bg-primary-50 font-bold">−</button>
                    <span className="w-8 text-center text-sm font-semibold">{item.qty}</span>
                    <button onClick={() => updateQty(item.cartId, item.qty + 1)} className="w-8 h-8 flex items-center justify-center text-surface-800 hover:bg-primary-50 font-bold">+</button>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-surface-800">₹{(item.price * item.qty).toLocaleString()}</p>
                    <p className="text-xs text-surface-300">₹{item.price} each</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <button onClick={clearCart} className="btn-ghost text-sm text-blush-500 hover:bg-blush-50 hover:text-blush-600">
            <Trash2 className="w-4 h-4" /> Clear Cart
          </button>
        </div>

        {/* Order Summary */}
        <div className="space-y-4">
          <div className="card p-5">
            <h2 className="font-display font-semibold text-surface-800 mb-4">Order Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-surface-800"><span>Subtotal</span><span>₹{cartTotal.toLocaleString()}</span></div>
              {discount > 0 && <div className="flex justify-between text-sage-600"><span>Coupon Discount</span><span>-₹{discount}</span></div>}
              <div className="flex justify-between text-surface-800"><span>Shipping</span><span>{shipping === 0 ? <span className="text-sage-600 font-semibold">Free</span> : `₹${shipping}`}</span></div>
              <div className="flex justify-between text-surface-800"><span>GST (18%)</span><span>₹{tax}</span></div>
              <div className="border-t border-surface-100 pt-3 flex justify-between font-bold text-surface-800 text-base">
                <span>Total</span><span>₹{total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="card p-5">
            <h3 className="font-semibold text-surface-800 mb-3 flex items-center gap-2 text-sm"><Tag className="w-4 h-4 text-primary-400" /> Apply Coupon</h3>
            <div className="flex gap-2">
              <input value={coupon} onChange={e => setCoupon(e.target.value)} placeholder="Enter code"
                className="input-field text-sm" />
              <button onClick={applyCoupon} className="btn-secondary text-sm shrink-0">Apply</button>
            </div>
            {couponMsg && (
              <p className={`text-xs mt-2 font-medium ${couponMsg.includes('Invalid') ? 'text-blush-500' : 'text-sage-600'}`}>
                {couponMsg}
              </p>
            )}
            <p className="text-xs text-surface-300 mt-2">Try: WELCOME20 or SAVE50</p>
          </div>

          <Link to="/checkout" className="btn-primary w-full py-3.5">
            Proceed to Checkout <ChevronRight className="w-4 h-4" />
          </Link>
          {cartTotal < 500 && (
            <p className="text-xs text-center text-surface-300">Add ₹{500 - cartTotal} more for free shipping</p>
          )}
        </div>
      </div>
    </div>
  );
}
