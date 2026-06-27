import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const navLinkClass = ({ isActive }) =>
  `text-sm font-medium transition hover:text-brand-600 ${isActive ? 'text-brand-600' : 'text-surface-800/70'}`;

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout, isAdmin } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-surface-800/5 bg-white/95 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link to="/" className="flex shrink-0 items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-sm font-bold text-white">
              SV
            </span>
            <span className="font-display text-xl font-bold text-surface-900">ShopVerse</span>
          </Link>

          <form onSubmit={handleSearch} className="hidden flex-1 max-w-md md:flex">
            <div className="relative w-full">
              <input
                type="search"
                placeholder="Search products or categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-10"
              />
              <svg
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </form>

          <nav className="hidden items-center gap-6 lg:flex">
            <NavLink to="/" className={navLinkClass} end>
              Home
            </NavLink>
            <NavLink to="/products" className={navLinkClass}>
              Shop
            </NavLink>
            {isAdmin && (
              <NavLink to="/admin" className={navLinkClass}>
                Admin
              </NavLink>
            )}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/cart"
              className="relative rounded-lg p-2 text-surface-800 transition hover:bg-surface-100"
              aria-label="Shopping cart"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="hidden items-center gap-3 sm:flex">
                <span className="text-sm text-surface-800/70">Hi, {user.name.split(' ')[0]}</span>
                <button onClick={logout} className="btn-secondary !px-3 !py-1.5 text-xs">
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="btn-primary hidden !px-4 !py-2 text-xs sm:inline-flex">
                Sign In
              </Link>
            )}

            <button
              className="rounded-lg p-2 lg:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="border-t border-surface-800/5 py-4 lg:hidden">
            <form onSubmit={handleSearch} className="mb-4 md:hidden">
              <input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field"
              />
            </form>
            <nav className="flex flex-col gap-3">
              <NavLink to="/" className={navLinkClass} onClick={() => setMenuOpen(false)} end>
                Home
              </NavLink>
              <NavLink to="/products" className={navLinkClass} onClick={() => setMenuOpen(false)}>
                Shop
              </NavLink>
              <NavLink to="/cart" className={navLinkClass} onClick={() => setMenuOpen(false)}>
                Cart ({cartCount})
              </NavLink>
              {isAdmin && (
                <NavLink to="/admin" className={navLinkClass} onClick={() => setMenuOpen(false)}>
                  Admin Panel
                </NavLink>
              )}
              {user ? (
                <button onClick={() => { logout(); setMenuOpen(false); }} className="text-left text-sm font-medium text-red-600">
                  Logout
                </button>
              ) : (
                <NavLink to="/login" className={navLinkClass} onClick={() => setMenuOpen(false)}>
                  Sign In
                </NavLink>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
