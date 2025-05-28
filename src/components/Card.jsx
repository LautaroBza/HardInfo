import { useNavigate } from 'react-router-dom';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Stack, Chip } from '@mui/material';
import HardCategories from '../data/hardCategories';

export default function MediaCard() {
  const navigate = useNavigate();

  return (
    <Stack direction="row" spacing={3} sx={{
      justifyContent: 'center',
      alignItems: 'flex-start',
      flexWrap: 'wrap',
      p: 3,
      gap: 3
    }}>
      {HardCategories.map((product) => (
        <Card key={product.id} sx={{ 
          width: 300,
          transition: 'transform 0.3s',
          '&:hover': {
            transform: 'scale(1.03)',
            boxShadow: 6
          }
        }}>
          <CardMedia
            sx={{ height: 180 }}
            image={product.image}
            title={product.name}
          />
          <CardContent>
            <Chip 
              label={product.category} 
              size="small" 
              color="primary"
              sx={{ mb: 1 }}
            />
            <Typography gutterBottom variant="h6" component="div">
              {product.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {product.description}
            </Typography>
            <Typography variant="subtitle1" color="primary">
              ${product.price?.toFixed(2) || '--'}
            </Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
            <Button 
              size="small"
              onClick={() => navigate(`/hardware/${product.id}`)}
              variant="outlined"
            >
              Detalles
            </Button>
            <Button 
              size="small" 
              variant="contained"
              sx={{ ml: 1 }}
            >
              Comprar
            </Button>
          </CardActions>
        </Card>
      ))}
    </Stack>
  );
}
