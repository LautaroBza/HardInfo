import { useEffect, useState } from 'react';
import MediaCard from '../components/Card.jsx'
import { Grid, Typography, Container, CircularProgress } from '@mui/material';
import { useProducts } from '../hooks/useProducts';

export default function Favoritos() {
  const [favComponents, setFavComponents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getProductById } = useProducts();

  const loadFavorites = async () => {
    setLoading(true);
    try {
      const favs = JSON.parse(localStorage.getItem('favoritos')) || [];
      const favData = [];
      
      for (const favId of favs) {
        if (favId && !isNaN(Number(favId))) {
          const product = await getProductById(favId);
          if (product) {
            favData.push(product);
          }
        } else {
          console.error('ID de favorito inválido:', favId);
        }
      }
      
      setFavComponents(favData);
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFavorites();

    // Listen for custom event when favorites change
    const handleFavoritesChange = () => {
      loadFavorites();
    };

    window.addEventListener('favoritesChanged', handleFavoritesChange);

    // Cleanup event listener
    return () => {
      window.removeEventListener('favoritesChanged', handleFavoritesChange);
    };
  }, [getProductById]);

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

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Mis Favoritos
      </Typography>

      {favComponents.length === 0 ? (
        <Typography variant="body1">No tenés componentes en favoritos.</Typography>
      ) : (
        <Grid container spacing={3}>
          {favComponents.map(comp => (
            <Grid item xs={12} sm={6} md={4} key={comp.id_producto || comp.id}>
              <MediaCard component={comp} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}