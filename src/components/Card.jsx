import { useNavigate, useLocation } from 'react-router-dom';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Stack,
  Chip,
  IconButton
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useEffect, useState } from 'react';
import apiService from '../services/api';
import { useAuth } from '../contexts/AuthContext';

export default function MediaCard({ component, hideCompareButton, onRemoveFavorite }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  const productId = component.id_producto || component.id;

  // Verificar si el producto está en favoritos al cargar
  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (!isAuthenticated) {
        setIsFavorite(false);
        return;
      }

      try {
        const favorites = await apiService.getFavorites();
        // Convertir ambos a string para comparación consistente
        const isInFavorites = favorites.some(fav => 
          String(fav.product_id) === String(productId)
        );
        setIsFavorite(isInFavorites);
      } catch (error) {
        console.error('Error checking favorite status:', error);
        setIsFavorite(false);
      }
    };

    checkFavoriteStatus();
  }, [productId, isAuthenticated]);

  const handleToggleFavorite = async () => {
    if (!isAuthenticated) {
      // Redirigir a login si no está autenticado
      navigate('/login');
      return;
    }

    setLoading(true);
    
    try {
      if (isFavorite) {
        await apiService.removeFromFavorites(String(productId));
        setIsFavorite(false);
        if (onRemoveFavorite) {
          onRemoveFavorite(productId);
        }
      } else {
        await apiService.addToFavorites(String(productId), component.name);
        setIsFavorite(true);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!component) return null;
  const isComparePage = location.pathname.includes('comparar');

  const getDefaultImage = (type) => {
    const typeLower = type?.toLowerCase();
    if (typeLower?.includes('cpu')) {
      return 'https://via.placeholder.com/300x200/2196F3/FFFFFF?text=CPU';
    } else if (typeLower?.includes('gpu')) {
      return 'https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=GPU';
    } else if (typeLower?.includes('ram')) {
      return 'https://via.placeholder.com/300x200/FF9800/FFFFFF?text=RAM';
    } else if (typeLower?.includes('motherboard')) {
      return 'https://via.placeholder.com/300x200/9C27B0/FFFFFF?text=Motherboard';
    } else {
      return 'https://via.placeholder.com/300x200/607D8B/FFFFFF?text=Component';
    }
  };

  const imageUrl = component.image || getDefaultImage(component.type);

  return (
    <Card
      sx={{
        width: '100%',
        position: 'relative',
        transition: 'transform 0.3s',
        '&:hover': {
          transform: 'scale(1.03)',
          boxShadow: 6
        }
      }}
    >
      <IconButton
        onClick={handleToggleFavorite}
        disabled={loading}
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          backgroundColor: 'white',
          '&:hover': {
            backgroundColor: 'rgba(255,255,255,0.8)'
          }
        }}
      >
        {isFavorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon color="error" />}
      </IconButton>

      <CardMedia
        sx={{ height: 180 }}
        image={imageUrl}
        title={component.name}
      />
      <CardContent>
        <Chip 
          label={component.type || component.category} 
          size="small" 
          color="primary"
          sx={{ mb: 1 }}
        />
        <Typography gutterBottom variant="h6" component="div">
          {component.name}
        </Typography>
        {component.price && (
          <Typography variant="subtitle1" color="primary">
            ${component.price?.toFixed(2)}
          </Typography>
        )}
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
        <Button 
          size="small"
          onClick={() => {
            if (productId && !isNaN(Number(productId))) {
              navigate(`/hardware/${productId}`);
            } else {
              console.error('ID de producto inválido:', productId);
            }
          }}
          variant="outlined"
        >
          Detalles
        </Button>
        {!(isComparePage || hideCompareButton) && (
          <Button
            size="small"
            color="secondary"
            variant="contained"
            sx={{ ml: 1 }}
            onClick={() => {
              if (productId && !isNaN(Number(productId))) {
                navigate(`/comparar?categoria=${encodeURIComponent(component.type || component.category)}&id=${productId}`);
              } else {
                console.error('ID de producto inválido:', productId);
              }
            }}
          >
            Comparar
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
