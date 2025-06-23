import { useState, useEffect, useCallback } from 'react';
import apiService from '../services/api';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar todos los productos
  const loadAllProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.getAllProducts();
      setProducts(data);
    } catch (err) {
      setError(err.message);
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Cargar productos por tipo
  const loadProductsByType = useCallback(async (type) => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.getProductsByType(type);
      setProducts(data);
    } catch (err) {
      setError(err.message);
      console.error(`Error loading ${type} products:`, err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Buscar productos
  const searchProducts = useCallback(async (params) => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.searchProducts(params);
      setProducts(data);
    } catch (err) {
      setError(err.message);
      console.error('Error searching products:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Obtener producto por ID
  const getProductById = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.getProductById(id);
      return data;
    } catch (err) {
      setError(err.message);
      console.error('Error getting product by ID:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Obtener productos por marca
  const getProductsByBrand = useCallback(async (brand) => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.getProductsByBrand(brand);
      setProducts(data);
    } catch (err) {
      setError(err.message);
      console.error('Error getting products by brand:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Búsqueda avanzada
  const advancedSearch = useCallback(async (filters) => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.advancedSearch(filters);
      setProducts(data);
    } catch (err) {
      setError(err.message);
      console.error('Error in advanced search:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Endpoints específicos por tipo
  const getCPUs = useCallback(async (filters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.getCPUs(filters);
      setProducts(data);
    } catch (err) {
      setError(err.message);
      console.error('Error loading CPUs:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const getGPUs = useCallback(async (filters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.getGPUs(filters);
      setProducts(data);
    } catch (err) {
      setError(err.message);
      console.error('Error loading GPUs:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const getRAMs = useCallback(async (filters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.getRAMs(filters);
      setProducts(data);
    } catch (err) {
      setError(err.message);
      console.error('Error loading RAMs:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const getMotherboards = useCallback(async (filters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.getMotherboards(filters);
      setProducts(data);
    } catch (err) {
      setError(err.message);
      console.error('Error loading motherboards:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Filtrar productos localmente (para casos donde ya tenemos los datos)
  const filterProducts = useCallback((filters) => {
    let filtered = [...products];

    if (filters.category) {
      filtered = filtered.filter(product => 
        product.type?.toLowerCase().includes(filters.category.toLowerCase())
      );
    }

    if (filters.brand) {
      filtered = filtered.filter(product => 
        product.brand?.toLowerCase().includes(filters.brand.toLowerCase())
      );
    }

    if (filters.minPrice !== undefined) {
      filtered = filtered.filter(product => product.price >= filters.minPrice);
    }

    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter(product => product.price <= filters.maxPrice);
    }

    if (filters.searchTerm) {
      filtered = filtered.filter(product => 
        product.name?.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        product.brand?.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [products]);

  // Limpiar estado
  const clearProducts = useCallback(() => {
    setProducts([]);
    setError(null);
  }, []);

  return {
    products,
    loading,
    error,
    loadAllProducts,
    loadProductsByType,
    searchProducts,
    getProductById,
    getProductsByBrand,
    advancedSearch,
    getCPUs,
    getGPUs,
    getRAMs,
    getMotherboards,
    filterProducts,
    clearProducts,
  };
}; 