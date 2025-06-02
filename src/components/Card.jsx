import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Stack, Chip } from '@mui/material';

export default function MediaCard({ component, hideCompareButton }) {
  const navigate = useNavigate();
  const location = useLocation();

  console.log('Card component data:', component);

  if (!component) return null;

  // Detectar si estamos en la página de comparar
  const isComparePage = location.pathname.includes('comparar');

  return (
    <Card sx={{ 
      width: '100%',
      transition: 'transform 0.3s',
      '&:hover': {
        transform: 'scale(1.03)',
        boxShadow: 6
      }
    }}>
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
        {/* Solo mostrar el botón Comparar si no estamos en la página de comparar y no se pasa la prop hideCompareButton */}
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
