import { useEffect, useState } from 'react';
import { api, formatPrice } from '../api/client';
import LoadingSpinner from '../components/LoadingSpinner';

const emptyForm = {
  name: '',
  price: '',
  image: '',
  description: '',
  category: '',
  stock: '',
  featured: false,
};

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchProducts = () => {
    setLoading(true);
    api
      .getProducts()
      .then(setProducts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const showMessage = (msg) => {
    setSuccess(msg);
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
      category: product.category,
      stock: product.stock,
      featured: product.featured || false,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    const payload = {
      name: form.name,
      price: parseFloat(form.price),
      image: form.image,
      description: form.description,
      category: form.category,
      stock: parseInt(form.stock, 10),
      featured: form.featured,
    };

    try {
      if (editingId) {
        await api.updateProduct(editingId, payload);
        showMessage('Product updated successfully');
      } else {
        await api.createProduct(payload);
        showMessage('Product created successfully');
      }
      handleCancel();
      fetchProducts();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return;
    try {
      await api.deleteProduct(id);
      showMessage('Product deleted');
      fetchProducts();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="section-title">Admin Panel</h1>
        <p className="mt-2 text-gray-500">Manage your product catalog</p>
      </div>

      {success && (
        <div className="mb-4 rounded-lg bg-green-50 p-3 text-sm text-green-700">{success}</div>
      )}
      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>
      )}

      {/* Product Form */}
      <form onSubmit={handleSubmit} className="card mb-10 p-6">
        <h2 className="text-lg font-bold">
          {editingId ? 'Edit Product' : 'Add New Product'}
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium">Name</label>
            <input name="name" value={form.name} onChange={handleChange} required className="input-field" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Price ($)</label>
            <input name="price" type="number" step="0.01" min="0" value={form.price} onChange={handleChange} required className="input-field" />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium">Image URL</label>
            <input name="image" type="url" value={form.image} onChange={handleChange} required className="input-field" placeholder="https://..." />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Category</label>
            <input name="category" value={form.category} onChange={handleChange} required className="input-field" placeholder="e.g. Clothing" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Stock</label>
            <input name="stock" type="number" min="0" value={form.stock} onChange={handleChange} required className="input-field" />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} required rows={3} className="input-field" />
          </div>
          <div className="flex items-center gap-2">
            <input name="featured" type="checkbox" checked={form.featured} onChange={handleChange} id="featured" className="h-4 w-4 rounded border-gray-300 text-brand-600" />
            <label htmlFor="featured" className="text-sm font-medium">Featured product</label>
          </div>
        </div>
        <div className="mt-6 flex gap-3">
          <button type="submit" disabled={submitting} className="btn-primary">
            {submitting ? 'Saving...' : editingId ? 'Update Product' : 'Add Product'}
          </button>
          {editingId && (
            <button type="button" onClick={handleCancel} className="btn-secondary">
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Products Table */}
      {loading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-surface-800/5 bg-surface-50">
                <tr>
                  <th className="px-4 py-3 font-semibold">Product</th>
                  <th className="px-4 py-3 font-semibold">Category</th>
                  <th className="px-4 py-3 font-semibold">Price</th>
                  <th className="px-4 py-3 font-semibold">Stock</th>
                  <th className="px-4 py-3 font-semibold">Featured</th>
                  <th className="px-4 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-800/5">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-surface-50/50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img src={product.image} alt="" className="h-10 w-10 rounded-lg object-cover" />
                        <span className="font-medium">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-500">{product.category}</td>
                    <td className="px-4 py-3 font-medium">{formatPrice(product.price)}</td>
                    <td className="px-4 py-3">{product.stock}</td>
                    <td className="px-4 py-3">
                      {product.featured ? (
                        <span className="rounded-full bg-brand-100 px-2 py-0.5 text-xs font-medium text-brand-700">Yes</span>
                      ) : (
                        <span className="text-gray-400">No</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button onClick={() => handleEdit(product)} className="text-sm font-medium text-brand-600 hover:text-brand-700">
                          Edit
                        </button>
                        <button onClick={() => handleDelete(product.id, product.name)} className="text-sm font-medium text-red-600 hover:text-red-700">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
