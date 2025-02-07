import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CategorySection from './components/CategorySection';
import Newsletter from './components/Newsletter';

const newArrivals = [
  {
    id: 1,
    name: "Summer Dress",
    price: 89.99,
    image: "/images/summer-dress.jpg"
  },
  {
    id: 2,
    name: "Casual Shirt",
    price: 49.99,
    image: "/images/casual-shirt.jpg"
  },
  {
    id: 3,
    name: "Denim Jacket",
    price: 129.99,
    image: "/images/denim-jacket.jpg"
  },
  {
    id: 4,
    name: "Classic Watch",
    price: 199.99,
    image: "/images/classic-watch.jpg"
  }
];

const menProducts = [
  {
    id: 5,
    name: "Classic Suit",
    price: 299.99,
    image: "/images/classic-suit.jpg"
  },
  {
    id: 6,
    name: "Leather Shoes",
    price: 149.99,
    image: "/images/leather-shoes.jpg"
  },
  {
    id: 7,
    name: "Cotton T-Shirt",
    price: 29.99,
    image: "/images/cotton-t-shirt.jpg"
  },
  {
    id: 8,
    name: "Casual Sneakers",
    price: 89.99,
    image: "/images/casual-sneakers.jpg"
  }
];

const womenProducts = [
  {
    id: 9,
    name: "Evening Gown",
    price: 199.99,
    image: "/images/evening-gown.jpg"
  },
  {
    id: 10,
    name: "Designer Bag",
    price: 159.99,
    image: "/images/designer-bag.jpg"
  },
  {
    id: 11,
    name: "Summer Hat",
    price: 39.99,
    image: "/images/summer-hat.jpg"
  },
  {
    id: 12,
    name: "High Heels",
    price: 129.99,
    image: "/images/high-heels.jpg"
  }
];

const accessories = [
  {
    id: 13,
    name: "Pearl Necklace",
    price: 299.99,
    image: "/images/pearl-necklace.jpg"
  },
  {
    id: 14,
    name: "Sunglasses",
    price: 79.99,
    image: "/images/sunglasses.jpg"
  },
  {
    id: 15,
    name: "Travel Bag",
    price: 49.99,
    image: "/images/travel-bag.jpg"
  },
  {
    id: 16,
    name: "Diamond Bracelet",
    price: 89.99,
    image: "/images/diamond-bracelet.jpg"
  }
];

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <CategorySection title="New Arrivals" products={newArrivals} />
      <CategorySection title="Men" products={menProducts} />
      <CategorySection title="Women" products={womenProducts} />
      <CategorySection title="Accessories" products={accessories} />
      <Newsletter />
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About Kapde</h3>
              <p className="text-gray-400">Your one-stop destination for fashion and style.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">FAQs</a></li>
                <li><a href="#" className="hover:text-white">Shipping</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <p className="text-gray-400">Email: info@kapde.com</p>
              <p className="text-gray-400">Phone: +91 98000 00000</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2025 Kapde. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;