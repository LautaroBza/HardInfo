const API_BASE_URL = 'http://localhost:8000';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Obtener todos los productos
  async getAllProducts() {
    return this.request('/products/all-products');
  }

  // Obtener productos por tipo
  async getProductsByType(type) {
    switch (type.toLowerCase()) {
      case 'cpu':
        return this.request('/products/all-cpus');
      case 'gpu':
        return this.request('/products/all-gpus');
      case 'ram':
        return this.request('/products/all-rams');
      case 'motherboard':
        return this.request('/products/all-motherboards');
      default:
        return this.request('/products/all-products');
    }
  }

  // Obtener producto por ID
  async getProductById(id) {
    return this.request(`/products/${id}`);
  }

  // Buscar productos
  async searchProducts(params = {}) {
    const queryParams = new URLSearchParams();
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null) {
        queryParams.append(key, params[key]);
      }
    });
    
    return this.request(`/products/search?${queryParams.toString()}`);
  }

  // Obtener productos por marca
  async getProductsByBrand(brand) {
    return this.request(`/products/brand/${encodeURIComponent(brand)}`);
  }

  // Endpoints específicos por tipo con filtros
  async getCPUs(filters = {}) {
    const queryParams = new URLSearchParams();
    Object.keys(filters).forEach(key => {
      if (filters[key] !== undefined && filters[key] !== null) {
        queryParams.append(key, filters[key]);
      }
    });
    
    return this.request(`/products/cpus?${queryParams.toString()}`);
  }

  async getGPUs(filters = {}) {
    const queryParams = new URLSearchParams();
    Object.keys(filters).forEach(key => {
      if (filters[key] !== undefined && filters[key] !== null) {
        queryParams.append(key, filters[key]);
      }
    });
    
    return this.request(`/products/gpus?${queryParams.toString()}`);
  }

  async getRAMs(filters = {}) {
    const queryParams = new URLSearchParams();
    Object.keys(filters).forEach(key => {
      if (filters[key] !== undefined && filters[key] !== null) {
        queryParams.append(key, filters[key]);
      }
    });
    
    return this.request(`/products/rams?${queryParams.toString()}`);
  }

  async getMotherboards(filters = {}) {
    const queryParams = new URLSearchParams();
    Object.keys(filters).forEach(key => {
      if (filters[key] !== undefined && filters[key] !== null) {
        queryParams.append(key, filters[key]);
      }
    });
    
    return this.request(`/products/motherboards?${queryParams.toString()}`);
  }

  // Búsqueda avanzada
  async advancedSearch(filters = {}) {
    const queryParams = new URLSearchParams();
    Object.keys(filters).forEach(key => {
      if (filters[key] !== undefined && filters[key] !== null) {
        queryParams.append(key, filters[key]);
      }
    });
    
    return this.request(`/products/advanced-search?${queryParams.toString()}`);
  }

  // Favoritos (requiere autenticación)
  async getFavorites(token) {
    return this.request('/products/favorites/', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  async addToFavorites(productId, productName, token) {
    return this.request('/products/favorites/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        product_id: productId,
        product_name: productName,
      }),
    });
  }

  async removeFromFavorites(productId, token) {
    return this.request(`/products/favorites/${productId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }
}

// Crear una instancia singleton
const apiService = new ApiService();

export default apiService; 