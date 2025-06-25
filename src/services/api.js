const API_BASE_URL = 'http://localhost:8000';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  getAuthHeaders() {
    const token = localStorage.getItem('token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeaders(),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async login(email, password) {
    const formData = new FormData();
    formData.append('username', email);
    formData.append('password', password);

    const url = `${this.baseURL}/auth/token`;
    const config = {
      method: 'POST',
      body: formData,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || 'Credenciales incorrectas');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }

  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async verifyToken(token) {
    return this.request('/auth/me', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  async getAllProducts() {
    return this.request('/products/all-products');
  }

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

  async getProductById(id) {
    return this.request(`/products/${id}`);
  }

  async searchProducts(params = {}) {
    const queryParams = new URLSearchParams();
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null) {
        queryParams.append(key, params[key]);
      }
    });
    
    return this.request(`/products/search?${queryParams.toString()}`);
  }

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
  async getFavorites() {
    console.log('🔍 Obteniendo favoritos básicos...');
    const result = await this.request('/products/favorites/');
    console.log('✅ Favoritos básicos obtenidos:', result);
    return result;
  }

  async getFavoritesWithDetails() {
    console.log('🔍 Obteniendo favoritos con detalles...');
    const favorites = await this.request('/products/favorites/');
    console.log('📋 Favoritos básicos:', favorites);
    
    const favoritesWithDetails = [];
    
    for (const fav of favorites) {
      try {
        console.log(`🔍 Obteniendo detalles para producto ${fav.product_id}...`);
        const productDetails = await this.getProductById(fav.product_id);
        console.log(`✅ Detalles obtenidos para ${fav.product_id}:`, productDetails);
        favoritesWithDetails.push({
          ...fav,
          ...productDetails
        });
      } catch (error) {
        console.error(`❌ Error getting details for product ${fav.product_id}:`, error);
        // Si no se puede obtener los detalles, usar solo la información básica
        favoritesWithDetails.push(fav);
      }
    }
    
    console.log('✅ Favoritos con detalles completados:', favoritesWithDetails);
    return favoritesWithDetails;
  }

  async addToFavorites(productId, productName) {
    console.log(`❤️ Agregando a favoritos: ${productId} - ${productName}`);
    const result = await this.request('/products/favorites/', {
      method: 'POST',
      body: JSON.stringify({
        product_id: productId,
        product_name: productName,
      }),
    });
    console.log('✅ Producto agregado a favoritos:', result);
    return result;
  }

  async removeFromFavorites(productId) {
    console.log(`🗑️ Eliminando de favoritos: ${productId}`);
    const result = await this.request(`/products/favorites/${productId}`, {
      method: 'DELETE',
    });
    console.log('✅ Producto eliminado de favoritos:', result);
    return result;
  }
}

// Crear una instancia singleton
const apiService = new ApiService();

if (typeof window !== 'undefined') {
  window.apiService = apiService;
}

export default apiService; 