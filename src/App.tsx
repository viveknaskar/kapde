import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CategorySection from './components/CategorySection';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import CartDrawer, { CartItem } from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const newArrivals: Product[] = [
  { id: 1, name: "Summer Dress", price: 89.99, image: "/images/summer-dress.jpg" },
  { id: 2, name: "Casual Shirt", price: 49.99, image: "/images/casual-shirt.jpg" },
  { id: 3, name: "Denim Jacket", price: 129.99, image: "/images/denim-jacket.jpg" },
  { id: 4, name: "Classic Watch", price: 199.99, image: "/images/classic-watch.jpg" },
];

const menProducts: Product[] = [
  { id: 5, name: "Classic Suit", price: 299.99, image: "/images/classic-suit.jpg" },
  { id: 6, name: "Leather Shoes", price: 149.99, image: "/images/leather-shoes.jpg" },
  { id: 7, name: "Cotton T-Shirt", price: 29.99, image: "/images/cotton-t-shirt.jpg" },
  { id: 8, name: "Casual Sneakers", price: 89.99, image: "/images/casual-sneakers.jpg" },
];

const womenProducts: Product[] = [
  { id: 9, name: "Evening Gown", price: 199.99, image: "/images/evening-gown.jpg" },
  { id: 10, name: "Designer Bag", price: 159.99, image: "/images/designer-bag.jpg" },
  { id: 11, name: "Summer Hat", price: 39.99, image: "/images/summer-hat.jpg" },
  { id: 12, name: "High Heels", price: 129.99, image: "/images/high-heels.jpg" },
];

const accessories: Product[] = [
  { id: 13, name: "Pearl Necklace", price: 299.99, image: "/images/pearl-necklace.jpg" },
  { id: 14, name: "Sunglasses", price: 79.99, image: "/images/sunglasses.jpg" },
  { id: 15, name: "Travel Bag", price: 49.99, image: "/images/travel-bag.jpg" },
  { id: 16, name: "Diamond Bracelet", price: 89.99, image: "/images/diamond-bracelet.jpg" },
];

const allCategories = [
  { title: 'New Arrivals', products: newArrivals },
  { title: 'Men', products: menProducts },
  { title: 'Women', products: womenProducts },
  { title: 'Accessories', products: accessories },
];

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleIncrement = (productId: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (productId: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.product.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemove = (productId: number) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleCheckoutSuccess = () => {
    setCartItems([]);
    setCheckoutOpen(false);
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const filterProducts = (products: Product[]) => {
    if (!searchQuery.trim()) return products;
    return products.filter((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Navbar
        cartCount={cartCount}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode((prev) => !prev)}
        onCartClick={() => setCartOpen(true)}
      />
      <Hero />
      {allCategories.map(({ title, products }) => (
        <CategorySection
          key={title}
          title={title}
          products={filterProducts(products)}
          onAddToCart={handleAddToCart}
        />
      ))}
      <Newsletter />
      <Footer />

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        onRemove={handleRemove}
        onCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
      />

      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        cartItems={cartItems}
        onSuccess={handleCheckoutSuccess}
      />
    </div>
  );
}

export default App;
