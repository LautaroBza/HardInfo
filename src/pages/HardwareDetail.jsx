import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Paper, Button, Chip, Divider, Grid, Rating, CircularProgress, Alert } from '@mui/material';
import { useProducts } from '../hooks/useProducts';
import apiService from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import RatingComponent from '../components/RatingComponent';

const HardwareDetail = () => {
  console.log('HardwareDetail component loaded!');
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById, loading, error } = useProducts();
  const [product, setProduct] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const [favoriteError, setFavoriteError] = useState('');
  const { isAuthenticated } = useAuth();

  console.log('HardwareDetail render with id:', id);

  // Verificar si el producto está en favoritos
  const checkFavoriteStatus = async () => {
    if (!isAuthenticated) {
      setIsFavorite(false);
      return;
    }

    try {
      const favorites = await apiService.getFavorites();
      const isInFavorites = favorites.some(fav => 
        String(fav.product_id) === String(id)
      );
      setIsFavorite(isInFavorites);
    } catch (error) {
      console.error('Error checking favorite status:', error);
      setIsFavorite(false);
    }
  };

  useEffect(() => {
    console.log('HardwareDetail useEffect triggered with id:', id);
    const loadProduct = async () => {
      if (id && !isNaN(Number(id))) {
        console.log('Loading product with id:', id);
        const productData = await getProductById(parseInt(id));
        console.log('Product loaded:', productData);
        setProduct(productData);
        
        await checkFavoriteStatus();
      } else {
        console.error('ID de producto inválido:', id);
      }
    };
    loadProduct();
  }, [id, getProductById, isAuthenticated]);

  const handleToggleFavorite = async () => {
    if (!isAuthenticated) {
      // Redirigir a login si no está autenticado
      navigate('/login');
      return;
    }

    setFavoriteLoading(true);
    setFavoriteError('');
    
    try {
      if (isFavorite) {
        console.log('🗑️ Eliminando de favoritos:', id);
        await apiService.removeFromFavorites(String(id));
        setIsFavorite(false);
      } else {
        console.log('❤️ Agregando a favoritos:', id, product.name);
        await apiService.addToFavorites(String(id), product.name);
        setIsFavorite(true);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      setFavoriteError('Error al actualizar favoritos: ' + error.message);
    } finally {
      setFavoriteLoading(false);
    }
  };

  const handleCompare = () => {
    console.log('handleCompare clicked!', { product, id });
    if (product) {
      const compareUrl = `/comparar?categoria=${encodeURIComponent(product.type)}&id=${id}`;
      console.log('Navigating to:', compareUrl);
      navigate(compareUrl);
    }
  };

  if (loading) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Cargando producto...
        </Typography>
      </Box>
    );
  }

  if (error || !product) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h4">Producto no encontrado</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
          {error || 'El producto solicitado no existe'}
        </Typography>
        <Button variant="contained" onClick={() => navigate('/')} sx={{ mt: 2 }}>
          Volver al inicio
        </Button>
      </Box>
    );
  }

  // Función para obtener especificaciones del producto según su tipo
  const getProductSpecs = (product) => {
    const specs = [];
    
    if (product.propiedad_cpu) {
      const cpu = product.propiedad_cpu;
      specs.push(
        { name: "Núcleos", value: cpu.cores || 'N/A' },
        { name: "Hilos", value: cpu.threads || 'N/A' },
        { name: "Frecuencia Base", value: cpu.frequency || 'N/A' },
        { name: "Frecuencia Boost", value: cpu.boost || 'N/A' },
        { name: "Socket", value: cpu.socket || 'N/A' },
        { name: "Cache L1", value: `${cpu.cache_l1 || 'N/A'} KB` },
        { name: "Cache L2", value: `${cpu.cache_l2 || 'N/A'} KB` },
        { name: "Cache L3", value: `${cpu.cache_l3 || 'N/A'} KB` }
      );
    }
    
    if (product.propiedad_gpu) {
      const gpu = product.propiedad_gpu;
      specs.push(
        { name: "VRAM", value: `${gpu.vram || 'N/A'} GB` },
        { name: "Tipo VRAM", value: gpu.type_vram || 'N/A' },
        { name: "Núcleos", value: gpu.cores || 'N/A' },
        { name: "TMUs", value: gpu.tmus || 'N/A' },
        { name: "ROPs", value: gpu.rops || 'N/A' },
        { name: "Ancho de bus", value: `${gpu.bus_width || 'N/A'} bits` },
        { name: "TDP", value: gpu.tdp || 'N/A' },
        { name: "Longitud", value: `${gpu.length || 'N/A'} mm` },
        { name: "Ancho", value: `${gpu.width || 'N/A'} mm` },
        { name: "Alto", value: `${gpu.height || 'N/A'} mm` },
        { name: "PSU Sugerida", value: `${gpu.suggested_psu || 'N/A'} W` }
      );
    }
    
    if (product.propiedad_ram) {
      const ram = product.propiedad_ram;
      specs.push(
        { name: "Tipo", value: ram.type || 'N/A' },
        { name: "Capacidad", value: ram.size || 'N/A' },
        { name: "Velocidad", value: ram.speed || 'N/A' },
        { name: "Latencia", value: ram.latency || 'N/A' },
        { name: "Formato", value: ram.format || 'N/A' }
      );
    }
    
    if (product.propiedad_motherboard) {
      const mb = product.propiedad_motherboard;
      specs.push(
        { name: "Chipset", value: mb.chipset || 'N/A' },
        { name: "Socket", value: mb.socket || 'N/A' },
        { name: "Formato", value: mb.size_format || 'N/A' },
        { name: "RAM Máxima", value: `${mb.max_ram || 'N/A'} GB` },
        { name: "Slots RAM", value: mb.slots_ram || 'N/A' },
        { name: "Tipo RAM", value: mb.type_ram || 'N/A' },
        { name: "Slots PCIe x16", value: mb.slots_pcie_x16 || 'N/A' },
        { name: "Slots PCIe x1", value: mb.slots_pcie_x1 || 'N/A' },
        { name: "Slots M.2", value: mb.m2_slots || 'N/A' },
        { name: "Puertos SATA", value: mb.sata_ports || 'N/A' },
        { name: "WiFi", value: mb.wifi ? 'Sí' : 'No' },
        { name: "Ethernet", value: mb.ethernet_speed || 'N/A' },
        { name: "Puertos USB", value: mb.usb_ports || 'N/A' }
      );
    }
    
    return specs;
  };

  // Función para obtener una imagen por defecto según el tipo de producto
  const getDefaultImage = (type) => {
    const typeLower = type?.toLowerCase();
    if (typeLower?.includes('cpu')) {
      return 'https://via.placeholder.com/400x300/2196F3/FFFFFF?text=CPU';
    } else if (typeLower?.includes('gpu')) {
      return 'https://via.placeholder.com/400x300/4CAF50/FFFFFF?text=GPU';
    } else if (typeLower?.includes('ram')) {
      return 'https://via.placeholder.com/400x300/FF9800/FFFFFF?text=RAM';
    } else if (typeLower?.includes('motherboard')) {
      return 'https://via.placeholder.com/400x300/9C27B0/FFFFFF?text=Motherboard';
    } else {
      return 'https://via.placeholder.com/400x300/607D8B/FFFFFF?text=Component';
    }
  };

  const productSpecs = getProductSpecs(product);
  const imageUrl = product.image || getDefaultImage(product.type);

  return (
    <Box sx={{ p: 4, maxWidth: 1200, margin: '0 auto' }}>
      <Button 
        variant="outlined" 
        onClick={() => navigate(-1)}
        sx={{ mb: 3 }}
      >
        ← Volver atrás
      </Button>

      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={imageUrl}
              alt={product.name}
              sx={{ 
                width: '100%', 
                borderRadius: 2,
                objectFit: 'contain',
                maxHeight: 400
              }}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Typography variant="h3" component="h1" gutterBottom>
              {product.name}
            </Typography>
            
            <Chip 
              label={product.type} 
              color="primary" 
              sx={{ mb: 2 }} 
            />
            
            <Typography variant="h5" color="primary" sx={{ mb: 2 }}>
              ${product.price?.toFixed(2) || '--'}
            </Typography>
            
            <Typography variant="body1" paragraph>
              {product.desc || product.description || 'Descripción no disponible'}
            </Typography>
            
            <Divider sx={{ my: 3 }} />
            
            <Typography variant="h5" gutterBottom>
              Especificaciones técnicas
            </Typography>
            
            <Grid container spacing={2}>
              {productSpecs.length > 0 ? (
                productSpecs.map((spec, index) => (
                  <Grid item xs={6} key={index}>
                    <Typography variant="subtitle2" color="text.secondary">
                      {spec.name}
                    </Typography>
                    <Typography variant="body1">
                      {spec.value}
                    </Typography>
                  </Grid>
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No hay especificaciones disponibles
                </Typography>
              )}
            </Grid>
            
            {favoriteError && (
              <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
                {favoriteError}
              </Alert>
            )}
            
            <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
              <Button 
                variant="contained" 
                size="large" 
                onClick={handleToggleFavorite}
                disabled={favoriteLoading}
              >
                {favoriteLoading ? 'Cargando...' : (isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos')}
              </Button>
              <Button variant="outlined" size="large" onClick={handleCompare}>
                Comparar
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
      <RatingComponent productId={id} productName={product.name} />
    </Box>
  );
};

export default HardwareDetail;