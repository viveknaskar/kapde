import { useState } from 'react';
import { X, CheckCircle } from 'lucide-react';
import { CartItem } from './CartDrawer';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onSuccess: () => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
}

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080';

const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (document.getElementById('razorpay-script')) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.id = 'razorpay-script';
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const CheckoutModal = ({ isOpen, onClose, cartItems, onSuccess }: CheckoutModalProps) => {
  const [form, setForm] = useState<FormData>({ name: '', email: '', phone: '', address: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [paid, setPaid] = useState(false);

  const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalInPaise = Math.round(total * 100);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      setError('Failed to load Razorpay. Please check your connection.');
      setLoading(false);
      return;
    }

    try {
      // 1. Create order on backend
      const orderRes = await fetch(`${API_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: totalInPaise,
          currency: 'INR',
          receipt: `receipt_${Date.now()}`,
        }),
      });

      if (!orderRes.ok) throw new Error('Failed to create order.');
      const order = await orderRes.json();

      // 2. Open Razorpay checkout
      const rzp = new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        order_id: order.orderId,
        name: 'Kapde',
        description: 'Fashion & Accessories',
        prefill: { name: form.name, email: form.email, contact: form.phone },
        theme: { color: '#000000' },
        handler: async (response) => {
          // 3. Verify payment on backend
          const verifyRes = await fetch(`${API_URL}/api/payments/verify`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            }),
          });

          const result = await verifyRes.json();
          if (result.success) {
            setPaid(true);
            onSuccess();
          } else {
            setError('Payment verification failed. Contact support.');
          }
        },
        modal: {
          ondismiss: () => setLoading(false),
        },
      });

      rzp.open();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {paid ? (
          <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Order Placed!</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Thank you for your purchase. You'll receive a confirmation shortly.
            </p>
            <button
              onClick={onClose}
              className="bg-black dark:bg-white text-white dark:text-black px-8 py-3 rounded-md font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Checkout</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <X className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>

            <form onSubmit={handlePay} className="px-6 py-4 space-y-4">
              {/* Order summary */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-2">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Order Summary</h3>
                {cartItems.map(({ product, quantity }) => (
                  <div key={product.id} className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      {product.name} × {quantity}
                    </span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      ${(product.price * quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2 flex justify-between font-bold">
                  <span className="text-gray-900 dark:text-white">Total</span>
                  <span className="text-gray-900 dark:text-white">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Delivery details */}
              <h3 className="font-semibold text-gray-900 dark:text-white">Delivery Details</h3>

              <input
                name="name"
                type="text"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
              />
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
              />
              <input
                name="phone"
                type="tel"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
              />
              <textarea
                name="address"
                placeholder="Delivery Address"
                value={form.address}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white resize-none"
              />

              {error && (
                <p className="text-red-500 text-sm">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black dark:bg-white text-white dark:text-black py-3 rounded-md font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing...' : `Pay ₹${total.toFixed(2)}`}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default CheckoutModal;
