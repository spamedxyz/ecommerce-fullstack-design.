const API_BASE = import.meta.env.VITE_API_URL || '/api';

const getHeaders = (includeAuth = false) => {
  const headers = { 'Content-Type': 'application/json' };
  if (includeAuth) {
    const token = localStorage.getItem('token');
    if (token) headers.Authorization = `Bearer ${token}`;
  }
  return headers;
};

const handleResponse = async (response) => {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }
  return data;
};

export const api = {
  getProducts: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetch(`${API_BASE}/products${query ? `?${query}` : ''}`).then(handleResponse);
  },

  getProduct: (id) => fetch(`${API_BASE}/products/${id}`).then(handleResponse),

  getCategories: () => fetch(`${API_BASE}/products/categories/list`).then(handleResponse),

  createProduct: (product) =>
    fetch(`${API_BASE}/products`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(product),
    }).then(handleResponse),

  updateProduct: (id, product) =>
    fetch(`${API_BASE}/products/${id}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(product),
    }).then(handleResponse),

  deleteProduct: (id) =>
    fetch(`${API_BASE}/products/${id}`, {
      method: 'DELETE',
      headers: getHeaders(true),
    }).then(handleResponse),

  register: (data) =>
    fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    }).then(handleResponse),

  login: (data) =>
    fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    }).then(handleResponse),

  getMe: () =>
    fetch(`${API_BASE}/auth/me`, {
      headers: getHeaders(true),
    }).then(handleResponse),
};

export const formatPrice = (price) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
