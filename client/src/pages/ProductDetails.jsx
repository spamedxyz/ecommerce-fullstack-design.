import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api, formatPrice } from '../api/client';
import { useCart } from '../context/CartContext';
import LoadingSpinner from '../components/LoadingSpinner';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    setLoading(true);
    api
      .getProduct(id)
      .then(setProduct)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    if (!product || product.stock === 0) return;
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center">
        <p className="text-lg text-red-600">{error || 'Product not found'}</p>
        <Link to="/products" className="btn-primary mt-6">
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <nav className="mb-6 text-sm text-gray-500">
        <Link to="/" className="hover:text-brand-600">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/products" className="hover:text-brand-600">Shop</Link>
        <span className="mx-2">/</span>
        <span className="text-surface-900">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="card overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="aspect-square w-full object-cover"
          />
        </div>

        <div className="flex flex-col">
          <span className="text-sm font-semibold uppercase tracking-wider text-brand-600">
            {product.category}
          </span>
          <h1 className="mt-2 font-display text-3xl font-bold text-surface-900 sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-4 text-3xl font-bold text-surface-900">{formatPrice(product.price)}</p>

          <p className="mt-6 leading-relaxed text-gray-600">{product.description}</p>

          <div className="mt-6 flex items-center gap-4">
            <span
              className={`rounded-full px-3 py-1 text-sm font-medium ${
                product.stock > 10
                  ? 'bg-green-100 text-green-700'
                  : product.stock > 0
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-red-100 text-red-700'
              }`}
            >
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </span>
          </div>

          {product.stock > 0 && (
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div className="flex items-center rounded-lg border border-surface-800/10">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-4 py-2 text-lg font-medium hover:bg-surface-50"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="min-w-[3rem] px-4 py-2 text-center font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  className="px-4 py-2 text-lg font-medium hover:bg-surface-50"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button onClick={handleAddToCart} className="btn-primary flex-1 sm:flex-none">
                {added ? '✓ Added to Cart' : 'Add to Cart'}
              </button>
            </div>
          )}

          <Link to="/cart" className="btn-secondary mt-4 w-full sm:w-auto">
            View Cart
          </Link>
        </div>
      </div>
    </div>
  );
}
