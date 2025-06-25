import { useEffect, useState } from 'react';
import MediaCard from '../components/Card.jsx'
import { Grid, Typography, Container, CircularProgress, Alert } from '@mui/material';
import apiService from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import DebugPanel from '../components/DebugPanel';

export default function Favoritos() {
  const [favComponents, setFavComponents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { isAuthenticated } = useAuth();

  const loadFavorites = async () => {
    if (!isAuthenticated) {
      setError('Debes estar autenticado para ver tus favoritos');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      console.log('🔄 Cargando favoritos...');
      const favorites = await apiService.getFavoritesWithDetails();
      console.log('✅ Favoritos cargados:', favorites);
      setFavComponents(favorites);
    } catch (error) {
      console.error('❌ Error loading favorites:', error);
      setError('Error al cargar los favoritos: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (productId) => {
    try {
      console.log('🗑️ Eliminando favorito:', productId);
      await apiService.removeFromFavorites(String(productId));
      console.log('✅ Favorito eliminado, recargando...');
      // Recargar favoritos después de eliminar
      await loadFavorites();
    } catch (error) {
      console.error('❌ Error removing favorite:', error);
      setError('Error al eliminar de favoritos: ' + error.message);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, [isAuthenticated]);

  if (loading) {
    return (
      <Container sx={{ mt: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Cargando favoritos...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Mis Favoritos ({favComponents.length})
      </Typography>

      {favComponents.length === 0 ? (
        <Typography variant="body1">No tenés componentes en favoritos.</Typography>
      ) : (
        <Grid container spacing={3}>
          {favComponents.map(fav => (
            <Grid item xs={12} sm={6} md={4} key={fav.id}>
              <MediaCard 
                component={{
                  id_producto: fav.product_id,
                  name: fav.name || fav.product_name,
                  type: fav.type,
                  price: fav.price,
                  brand: fav.brand,
                  image: fav.image,
                  // Incluir todas las propiedades del producto
                  ...fav
                }}
                onRemoveFavorite={() => handleRemoveFavorite(fav.product_id)}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}