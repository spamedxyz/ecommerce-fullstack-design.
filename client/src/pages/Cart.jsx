import { Link } from 'react-router-dom';
import { formatPrice } from '../api/client';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <div className="mx-auto max-w-md">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-surface-100">
            <svg className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h1 className="mt-6 font-display text-2xl font-bold">Your cart is empty</h1>
          <p className="mt-2 text-gray-500">Looks like you haven&apos;t added anything yet.</p>
          <Link to="/products" className="btn-primary mt-8">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="section-title">Shopping Cart</h1>
          <p className="mt-1 text-gray-500">{cartCount} item{cartCount !== 1 ? 's' : ''}</p>
        </div>
        <button onClick={clearCart} className="text-sm font-medium text-red-600 hover:text-red-700">
          Clear Cart
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {items.map((item) => (
            <div key={item.id} className="card flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
              <Link to={`/products/${item.id}`} className="shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-24 w-24 rounded-lg object-cover sm:h-28 sm:w-28"
                />
              </Link>

              <div className="flex flex-1 flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <Link to={`/products/${item.id}`} className="font-semibold text-surface-900 hover:text-brand-600">
                    {item.name}
                  </Link>
                  <p className="text-sm text-gray-500">{item.category}</p>
                  <p className="mt-1 font-bold">{formatPrice(item.price)}</p>
                </div>

                <div className="mt-4 flex items-center gap-4 sm:mt-0">
                  <div className="flex items-center rounded-lg border border-surface-800/10">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-1.5 hover:bg-surface-50"
                      aria-label="Decrease"
                    >
                      −
                    </button>
                    <span className="min-w-[2.5rem] px-3 py-1.5 text-center text-sm font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1.5 hover:bg-surface-50"
                      aria-label="Increase"
                    >
                      +
                    </button>
                  </div>

                  <p className="min-w-[5rem] text-right font-bold">
                    {formatPrice(item.price * item.quantity)}
                  </p>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="rounded-lg p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-600"
                    aria-label="Remove item"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="card h-fit p-6 lg:sticky lg:top-24">
          <h2 className="text-lg font-bold">Order Summary</h2>
          <div className="mt-4 space-y-3 border-b border-surface-800/5 pb-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Subtotal</span>
              <span className="font-medium">{formatPrice(cartTotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Shipping</span>
              <span className="font-medium text-green-600">
                {cartTotal >= 100 ? 'Free' : formatPrice(9.99)}
              </span>
            </div>
          </div>
          <div className="mt-4 flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>{formatPrice(cartTotal >= 100 ? cartTotal : cartTotal + 9.99)}</span>
          </div>
          {cartTotal < 100 && (
            <p className="mt-2 text-xs text-gray-500">
              Add {formatPrice(100 - cartTotal)} more for free shipping
            </p>
          )}
          <button className="btn-primary mt-6 w-full" onClick={() => alert('Checkout demo — order placed!')}>
            Proceed to Checkout
          </button>
          <Link to="/products" className="btn-secondary mt-3 w-full">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
