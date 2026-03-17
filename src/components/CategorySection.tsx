interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface CategorySectionProps {
  title: string;
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const CategorySection = ({ title, products, onAddToCart }: CategorySectionProps) => {
  const sectionId = title.toLowerCase().replace(/\s+/g, '-');

  return (
    <section className="py-16" id={sectionId}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8">{title}</h2>
        {products.length === 0 ? (
          <p className="text-gray-500">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div key={product.id} className="group">
                <div className="relative overflow-hidden">
                  <img
                    src={`${import.meta.env.BASE_URL}${product.image.replace(/^\//, '')}`}
                    alt={product.name}
                    className="w-full h-80 object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <button
                    onClick={() => onAddToCart(product)}
                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-black px-6 py-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap"
                  >
                    Add to Cart
                  </button>
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-medium">{product.name}</h3>
                  <p className="text-gray-600">${product.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CategorySection;
