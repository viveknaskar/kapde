const Footer = () => {
  return (
    <footer className="bg-gray-900 dark:bg-black text-white py-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Kapde</h3>
            <p className="text-gray-400">Your one-stop destination for fashion and style.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#new-arrivals" className="hover:text-white transition-colors">New Arrivals</a></li>
              <li><a href="#men" className="hover:text-white transition-colors">Men</a></li>
              <li><a href="#women" className="hover:text-white transition-colors">Women</a></li>
              <li><a href="#accessories" className="hover:text-white transition-colors">Accessories</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-gray-400">Email: info@kapde.com</p>
            <p className="text-gray-400">Phone: +91 98000 00000</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 dark:border-gray-700 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Kapde. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
