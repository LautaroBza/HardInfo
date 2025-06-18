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

export default function MediaCard({ component, hideCompareButton }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem('favoritos')) || [];
    setIsFavorite(favs.includes(component.id));
  }, [component.id]);

  const handleToggleFavorite = () => {
    const favs = JSON.parse(localStorage.getItem('favoritos')) || [];
    let newFavs;

    if (isFavorite) {
      newFavs = favs.filter(id => id !== component.id);
    } else {
      newFavs = [...favs, component.id];
    }

    localStorage.setItem('favoritos', JSON.stringify(newFavs));
    setIsFavorite(!isFavorite);
  };

  if (!component) return null;
  const isComparePage = location.pathname.includes('comparar');

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
        image={component.image}
        title={component.name}
      />
      <CardContent>
        <Chip 
          label={component.category} 
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
          onClick={() => navigate(`/hardware/${component.id}`)}
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
            onClick={() => navigate(`/comparar?categoria=${encodeURIComponent(component.category)}&id=${component.id}`)}
          >
            Comparar
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
