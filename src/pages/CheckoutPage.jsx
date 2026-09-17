import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, CreditCard, Lock, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import api from '../services/api';
import { getMyAddress, createAddress, updateAddress } from '../services/addressService';
import { getFriendlyErrorMessage } from '../utils/errorMessage';

const steps = ['Shipping', 'Payment', 'Review'];

export default function CheckoutPage() {
  const { cart, clearCart, showNotification } = useApp();
  console.log("Cart:", cart);

  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [placed, setPlaced] = useState(false);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', address2: '', city: '', pincode: '', state: '', country: '', cardNum: '', expiry: '', cvv: '', cardName: '' });
 const [finalTotal,setFinalTotal]=useState(0);
  const [addressId, setAddressId] = useState(null);
  const [loadingAddress, setLoadingAddress] = useState(true);
  const [savingAddress, setSavingAddress] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  useEffect(() => {
    loadSavedAddress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadSavedAddress = async () => {
    setLoadingAddress(true);
    try {
      const res = await getMyAddress();
      const a = res.data;
      if (a) {
        setAddressId(a.addressId ?? a.id ?? null);
        setForm(f => ({
          ...f,
          name: a.fullName || '',
          phone: a.mobileNumber || '',
          address: a.addressLine1 || '',
          address2: a.addressLine2 || '',
          city: a.city || '',
          state: a.state || '',
          country: a.country || '',
          pincode: a.pincode || '',
        }));
      }
    } catch (error) {
      // No saved address yet (or fetch failed) - leave the form empty.
      console.error(error);
    } finally {
      setLoadingAddress(false);
    }
  };

  const validateAddress = () => {
    const errors = {};
    if (!form.name.trim()) errors.name = 'Full name is required.';
    if (!form.phone.trim()) errors.phone = 'Mobile number is required.';
    else if (!/^\d{10}$/.test(form.phone.trim())) errors.phone = 'Enter a valid 10-digit mobile number.';
    if (!form.address.trim()) errors.address = 'Address is required.';
    if (!form.city.trim()) errors.city = 'City is required.';
    if (!form.state.trim()) errors.state = 'State is required.';
    if (!form.country.trim()) errors.country = 'Country is required.';
    if (!form.pincode.trim()) errors.pincode = 'Pincode is required.';
    else if (!/^\d{4,10}$/.test(form.pincode.trim())) errors.pincode = 'Enter a valid pincode.';
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleContinueToPayment = async () => {
    if (!validateAddress()) return;

    const payload = {
      fullName: form.name.trim(),
      mobileNumber: form.phone.trim(),
      addressLine1: form.address.trim(),
      addressLine2: form.address2.trim(),
      city: form.city.trim(),
      state: form.state.trim(),
      country: form.country.trim(),
      pincode: form.pincode.trim(),
    };

    setSavingAddress(true);
    try {
      if (addressId) {
        await updateAddress(addressId, payload);
      } else {
        const res = await createAddress(payload);
        setAddressId(res.data?.addressId ?? res.data?.id ?? null);
      }
      setStep(1);
    } catch (error) {
      showNotification?.(getFriendlyErrorMessage(error, 'Failed to save address.'), 'error');
    } finally {
      setSavingAddress(false);
    }
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.productPrice * item.quantity,
    0
  );

  console.log("total:", subtotal);

  const handleSubmit = async () => {
    console.log("handle submit called");
    if (placingOrder) return;

    try {
      setPlacingOrder(true);

      await Promise.all(
        cart.map(item =>
          api.post(`/orders/place/${item.product.productId}?quantity=${item.quantity}`)
        )
      );

      showNotification?.('Order placed successfully!', 'success');

     setFinalTotal(total);   // Save the bill before clearing the cart

      setPlaced(true);

      await clearCart();
      setTimeout(() => navigate('/dashboard'), 4000);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data ||
        'Failed to place order. Please try again.';

      showNotification?.(message, 'error');
    } finally {
      setPlacingOrder(false);
    }
  };

  const shipping = subtotal > 500 ? 0 : 49;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + shipping + tax;

  if (placed) return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 bg-hero-pastel">
      <div className="card p-12 text-center max-w-md w-full">
        <div className="w-20 h-20 bg-gradient-to-br from-sage-100 to-sage-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-sage-500" strokeWidth={1.6} />
        </div>
        <h2 className="font-display text-2xl font-semibold text-surface-800 mb-2">Order Placed!</h2>
        <p className="text-surface-300 mb-4 text-sm">Your order has been confirmed. You'll receive a confirmation email shortly.</p>
        <div className="bg-surface-50 rounded-2xl p-4 mb-6">
          <p className="text-sm text-surface-800">Order Total: <span className="font-bold">₹{finalTotal.toLocaleString()}</span></p>
          <p className="text-xs text-surface-300 mt-1">Est. Delivery: 3–5 business days</p>
        </div>
        <p className="text-sm text-surface-300">Redirecting to your dashboard…</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <p className="section-eyebrow">Almost there</p>
      <h1 className="section-title mb-8">Checkout</h1>

      {/* Steps */}
      <div className="flex items-center gap-2 mb-10">
        {steps.map((s, i) => (
          <React.Fragment key={s}>
            <div className={`flex items-center gap-2 ${i <= step ? 'text-primary-600' : 'text-surface-300'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 ${i < step ? 'bg-primary-500 border-primary-500 text-white' : i === step ? 'border-primary-500 text-primary-600' : 'border-surface-200 text-surface-300'}`}>
                {i < step ? <CheckCircle className="w-4 h-4" /> : i + 1}
              </div>
              <span className="font-semibold text-sm hidden sm:block">{s}</span>
            </div>
            {i < steps.length - 1 && <div className={`flex-1 h-0.5 ${i < step ? 'bg-primary-400' : 'bg-surface-200'}`} />}
          </React.Fragment>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Step 0: Shipping */}
          {step === 0 && (
            <div className="card p-6">
              <h2 className="font-display font-semibold text-surface-800 mb-5 text-lg">Shipping Details</h2>
              {loadingAddress ? (
                <div className="grid sm:grid-cols-2 gap-4">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-11 bg-surface-100 rounded-2xl animate-pulse" />
                  ))}
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    ['name','Full Name'],
                    ['email','Email'],
                    ['phone','Mobile Number'],
                    ['address','Address Line 1', 'sm:col-span-2'],
                    ['address2','Address Line 2', 'sm:col-span-2'],
                    ['city','City'],
                    ['state','State'],
                    ['country','Country'],
                    ['pincode','Pincode'],
                  ].map(([key,label,span]) => (
                    <div key={key} className={span || ''}>
                      <label className="label">{label}</label>
                      <input className="input-field" value={form[key]} onChange={e => set(key, e.target.value)} placeholder={label} />
                      {fieldErrors[key] && <p className="text-xs text-blush-500 mt-1">{fieldErrors[key]}</p>}
                    </div>
                  ))}
                </div>
              )}
              <button onClick={handleContinueToPayment} disabled={savingAddress || loadingAddress} className="btn-primary mt-6">
                {savingAddress ? 'Saving…' : 'Continue to Payment'} <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Step 1: Payment */}
          {step === 1 && (
            <div className="card p-6">
              <div className="flex items-center gap-2 mb-5">
                <CreditCard className="w-5 h-5 text-primary-500" strokeWidth={1.8} />
                <h2 className="font-display font-semibold text-surface-800 text-lg">Payment Details</h2>
                <Lock className="w-3.5 h-3.5 text-surface-300 ml-auto" />
                <span className="text-xs text-surface-300">SSL Secured</span>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="label">Card Number</label>
                  <input className="input-field" value={form.cardNum} onChange={e => set('cardNum', e.target.value)} placeholder="1234 5678 9012 3456" maxLength={19} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="label">Expiry</label>
                    <input className="input-field" value={form.expiry} onChange={e => set('expiry', e.target.value)} placeholder="MM/YY" />
                  </div>
                  <div>
                    <label className="label">CVV</label>
                    <input className="input-field" value={form.cvv} onChange={e => set('cvv', e.target.value)} placeholder="•••" maxLength={3} type="password" />
                  </div>
                </div>
                <div>
                  <label className="label">Name on Card</label>
                  <input className="input-field" value={form.cardName} onChange={e => set('cardName', e.target.value)} placeholder="As on card" />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setStep(0)} className="btn-secondary">Back</button>
                <button onClick={() => setStep(2)} className="btn-primary flex-1">Review Order <ChevronRight className="w-4 h-4" /></button>
              </div>
            </div>
          )}

          {/* Step 2: Review */}
          {step === 2 && (
            <div className="card p-6">
              <h2 className="font-display font-semibold text-surface-800 mb-5 text-lg">Review Order</h2>
              <div className="space-y-3 mb-6">
                {cart.map(item => (
                  <div key={item.cartId} className="flex gap-3 items-center p-3 bg-surface-50 rounded-2xl">
                    <img src={item.product.imageUrl} alt={item.product.productName} className="w-14 h-14 object-cover rounded-xl shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-surface-800 text-sm truncate">{item.product.productName}</p>
                      <p className="text-xs text-surface-300">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-bold text-surface-800">₹{(item.product.productPrice * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>
              <div className="bg-surface-50 rounded-2xl p-4 text-sm space-y-1.5 mb-6">
                <div className="flex justify-between text-surface-800"><span>Subtotal</span><span>₹{subtotal.toLocaleString()}</span></div>
                <div className="flex justify-between text-surface-800"><span>Shipping</span><span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span></div>
                <div className="flex justify-between text-surface-800"><span>GST (18%)</span><span>₹{tax}</span></div>
                <div className="flex justify-between font-bold text-surface-800 text-base pt-2 border-t border-surface-200"><span>Total</span><span>₹{total.toLocaleString()}</span></div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="btn-secondary">Back</button>
                <button onClick={handleSubmit} className="btn-primary flex-1 py-3.5" disabled={placingOrder}>
                  <Lock className="w-4 h-4" /> {placingOrder ? 'Placing Order...' : 'Place Order'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Summary sidebar */}
        <div className="card p-5 h-fit">
          <h3 className="font-display font-semibold text-surface-800 mb-4">Cart Summary</h3>
          <div className="space-y-2 mb-4">
            {cart.map(item => (
              <div key={item.cartId} className="flex justify-between text-sm text-surface-800">
                <span className="truncate mr-2">{item.product.productName} × {item.quantity}</span>
                <span className="font-semibold shrink-0">₹{(item.product.productPrice * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-surface-100 pt-3 flex justify-between font-bold text-surface-800">
            <span>Total</span><span>₹{total.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
