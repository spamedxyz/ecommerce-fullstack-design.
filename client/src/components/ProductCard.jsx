import { Link } from 'react-router-dom';
import { formatPrice } from '../api/client';

export default function ProductCard({ product }) {
  return (
    <Link
      to={`/products/${product.id}`}
      className="group card overflow-hidden transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-square overflow-hidden bg-surface-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {product.stock <= 5 && product.stock > 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-amber-500 px-2.5 py-0.5 text-xs font-semibold text-white">
            Low Stock
          </span>
        )}
        {product.stock === 0 && (
          <span className="absolute inset-0 flex items-center justify-center bg-black/40 text-sm font-semibold text-white">
            Out of Stock
          </span>
        )}
      </div>
      <div className="p-4">
        <p className="text-xs font-medium uppercase tracking-wider text-brand-600">
          {product.category}
        </p>
        <h3 className="mt-1 line-clamp-2 font-semibold text-surface-900 group-hover:text-brand-600">
          {product.name}
        </h3>
        <p className="mt-2 text-lg font-bold text-surface-900">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}
