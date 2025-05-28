import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Paper, Button, Chip, Divider, Grid, Rating } from '@mui/material';
import HardCategories from '../data/hardCategories';


const HardwareDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = HardCategories.find(item => item.id === parseInt(id));
  const categoryInfo = HardCategories.find(cat => cat.name === product?.category);

  if (!product) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h4">Producto no encontrado</Typography>
        <Button variant="contained" onClick={() => navigate('/')} sx={{ mt: 2 }}>
          Volver al inicio
        </Button>
      </Box>
    );
  }

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
              src={product.image}
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
              label={product.category} 
              color="primary" 
              sx={{ mb: 2 }} 
            />
            
            <Typography variant="h5" color="primary" sx={{ mb: 2 }}>
              ${product.price?.toFixed(2) || '--'}
            </Typography>
            
            <Rating value={4.5} precision={0.5} readOnly sx={{ mb: 2 }} />
            
            <Typography variant="body1" paragraph>
              {product.longDescription || product.description}
            </Typography>
            
            <Divider sx={{ my: 3 }} />
            
            <Typography variant="h5" gutterBottom>
              Especificaciones técnicas
            </Typography>
            
            <Grid container spacing={2}>
              {product.specs?.map((spec, index) => (
                <Grid item xs={6} key={index}>
                  <Typography variant="subtitle2" color="text.secondary">
                    {spec.name}
                  </Typography>
                  <Typography variant="body1">
                    {spec.value}
                  </Typography>
                </Grid>
              )) || (
                <Typography variant="body2" color="text.secondary">
                  No hay especificaciones disponibles
                </Typography>
              )}
            </Grid>
            
            <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
              <Button variant="contained" size="large">
                Agregar a favoritos
              </Button>
              <Button variant="outlined" size="large">
                Comparar
              </Button>
            </Box>
          </Grid>
        </Grid>
        
        {categoryInfo && (
          <>
            <Divider sx={{ my: 4 }} />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ width: 60, height: 60 }}>
                <img 
                  src={categoryInfo.image} 
                  alt={categoryInfo.name}
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </Box>
              <Box>
                <Typography variant="h6">{categoryInfo.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {categoryInfo.description}
                </Typography>
              </Box>
            </Box>
          </>
        )}
      </Paper>
    </Box>
  );
};

export default HardwareDetail;