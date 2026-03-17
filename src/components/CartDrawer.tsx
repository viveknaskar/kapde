import { X, Trash2, Plus, Minus } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onIncrement: (productId: number) => void;
  onDecrement: (productId: number) => void;
  onRemove: (productId: number) => void;
  onCheckout: () => void;
}

const CartDrawer = ({
  isOpen,
  onClose,
  cartItems,
  onIncrement,
  onDecrement,
  onRemove,
  onCheckout,
}: CartDrawerProps) => {
  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white dark:bg-gray-900 shadow-xl z-50 transform transition-transform duration-300 flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Your Cart ({cartItems.reduce((s, i) => s + i.quantity, 0)})
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400 mt-16">
              Your cart is empty.
            </p>
          ) : (
            cartItems.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="flex items-center gap-4 border-b border-gray-100 dark:border-gray-800 pb-4"
              >
                <img
                  src={`${import.meta.env.BASE_URL}${product.image.replace(/^\//, '')}`}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 dark:text-white truncate">
                    {product.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    ${product.price.toFixed(2)}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => onDecrement(product.id)}
                      className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <Minus className="h-3 w-3 text-gray-600 dark:text-gray-300" />
                    </button>
                    <span className="text-sm font-medium text-gray-900 dark:text-white w-6 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => onIncrement(product.id)}
                      className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <Plus className="h-3 w-3 text-gray-600 dark:text-gray-300" />
                    </button>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-semibold text-gray-900 dark:text-white">
                    ${(product.price * quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => onRemove(product.id)}
                    className="mt-1 p-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-between mb-4">
              <span className="text-lg font-semibold text-gray-900 dark:text-white">Total</span>
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                ${total.toFixed(2)}
              </span>
            </div>
            <button
              onClick={onCheckout}
              className="w-full bg-black dark:bg-white text-white dark:text-black py-3 rounded-md font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
