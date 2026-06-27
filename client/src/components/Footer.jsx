import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-surface-800/5 bg-surface-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-sm font-bold">
                SV
              </span>
              <span className="font-display text-xl font-bold">ShopVerse</span>
            </div>
            <p className="mt-4 text-sm text-gray-400">
              Your destination for quality products. Shop with confidence and style.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">Shop</h4>
            <ul className="mt-4 space-y-2 text-sm text-gray-400">
              <li><Link to="/products" className="hover:text-white">All Products</Link></li>
              <li><Link to="/products?category=Clothing" className="hover:text-white">Clothing</Link></li>
              <li><Link to="/products?category=Electronics" className="hover:text-white">Electronics</Link></li>
              <li><Link to="/products?category=Footwear" className="hover:text-white">Footwear</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold">Account</h4>
            <ul className="mt-4 space-y-2 text-sm text-gray-400">
              <li><Link to="/login" className="hover:text-white">Sign In</Link></li>
              <li><Link to="/register" className="hover:text-white">Create Account</Link></li>
              <li><Link to="/cart" className="hover:text-white">Shopping Cart</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold">Contact</h4>
            <ul className="mt-4 space-y-2 text-sm text-gray-400">
              <li>support@shopverse.com</li>
              <li>+1 (555) 123-4567</li>
              <li>Mon–Fri, 9am–6pm EST</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} ShopVerse. Full-Stack eCommerce Internship Project.
        </div>
      </div>
    </footer>
  );
}
