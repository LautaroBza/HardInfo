import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Rating,
  Button,
  TextField,
  Paper,
  Alert,
  CircularProgress,
  Chip,
  Divider
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import apiService from '../services/api';

const RatingComponent = ({ productId, productName }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [userRating, setUserRating] = useState(null);
  const [totalRating, setTotalRating] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [allRatings, setAllRatings] = useState([]);
  const [showAllRatings, setShowAllRatings] = useState(false);
  const { isAuthenticated } = useAuth();

  // Cargar datos de rating al montar el componente
  useEffect(() => {
    if (productId) {
      loadRatingData();
    }
  }, [productId]);

  const loadRatingData = async () => {
    setLoading(true);
    setError('');
    
    try {
      const ratings = await apiService.getAllProductRatings(productId);
      setAllRatings(ratings);
      
      if (ratings.length > 0) {
        const total = ratings.reduce((sum, r) => sum + r.rating, 0);
        setTotalRating(total / ratings.length);
        setRatingCount(ratings.length);
      } else {
        setTotalRating(0);
        setRatingCount(0);
      }
      
      if (isAuthenticated) {
        try {
          const ratingSummary = await apiService.getProductRating(productId);
          if (ratingSummary.user_rating !== null) {
            setUserRating(ratingSummary.user_rating);
            setRating(ratingSummary.user_rating);
          }
        } catch (error) {
          console.log('Usuario no tiene rating para este producto');
        }
      }
    } catch (error) {
      console.error('Error loading rating data:', error);
      setError('Error al cargar los ratings: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitRating = async () => {
    if (!isAuthenticated) {
      setError('Debes estar autenticado para calificar productos');
      return;
    }

    if (rating === 0) {
      setError('Por favor selecciona una calificación');
      return;
    }

    setSubmitting(true);
    setError('');
    setSuccess('');
    
    try {
      await apiService.submitRating(productId, rating, comment || null);
      setSuccess('¡Tu calificación ha sido enviada!');
      setUserRating(rating);
      
      // Recargar datos
      await loadRatingData();
      
      // Limpiar formulario si es un nuevo rating
      if (!userRating) {
        setComment('');
      }
    } catch (error) {
      console.error('Error submitting rating:', error);
      setError('Error al enviar la calificación: ' + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteRating = async () => {
    setSubmitting(true);
    setError('');
    setSuccess('');
    
    try {
      await apiService.deleteRating(productId);
      setSuccess('Tu calificación ha sido eliminada');
      setUserRating(null);
      setRating(0);
      setComment('');
      
      await loadRatingData();
    } catch (error) {
      console.error('Error deleting rating:', error);
      setError('Error al eliminar la calificación: ' + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper sx={{ p: 3, mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        ⭐ Calificaciones y Reseñas
      </Typography>
      
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Rating 
            value={totalRating} 
            precision={0.1} 
            readOnly 
            size="large"
            sx={{ mr: 2 }}
          />
          <Typography variant="h6" component="span">
            {totalRating.toFixed(1)}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {ratingCount} calificación{ratingCount !== 1 ? 'es' : ''}
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

      {isAuthenticated && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            {userRating ? 'Actualizar tu calificación' : 'Calificar este producto'}
          </Typography>
          
          <Box sx={{ mb: 2 }}>
            <Rating
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
              size="large"
              sx={{ mr: 1 }}
            />
            <Typography variant="body2" component="span">
              {rating > 0 ? `${rating} estrella${rating !== 1 ? 's' : ''}` : 'Selecciona una calificación'}
            </Typography>
          </Box>

          <TextField
            fullWidth
            multiline
            rows={3}
            label="Comentario (opcional)"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Comparte tu experiencia con este producto..."
            sx={{ mb: 2 }}
          />

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="contained"
              onClick={handleSubmitRating}
              disabled={submitting || rating === 0}
            >
              {submitting ? 'Enviando...' : (userRating ? 'Actualizar' : 'Enviar')}
            </Button>
            
            {userRating && (
              <Button
                variant="outlined"
                color="error"
                onClick={handleDeleteRating}
                disabled={submitting}
              >
                Eliminar
              </Button>
            )}
          </Box>
        </Box>
      )}

      {!isAuthenticated && (
        <Alert severity="info" sx={{ mb: 2 }}>
          Inicia sesión para calificar este producto
        </Alert>
      )}

      {allRatings.length > 0 && (
        <>
          <Divider sx={{ my: 2 }} />
          
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Reseñas de usuarios ({allRatings.length})
            </Typography>
            
            <Button
              variant="text"
              onClick={() => setShowAllRatings(!showAllRatings)}
              size="small"
            >
              {showAllRatings ? 'Ocultar reseñas' : 'Ver todas las reseñas'}
            </Button>
          </Box>

          {showAllRatings && (
            <Box>
              {allRatings.map((ratingItem, index) => (
                <Paper key={ratingItem.id} sx={{ p: 2, mb: 2, backgroundColor: 'grey.50' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                    <Box>
                      <Typography variant="subtitle2" fontWeight="bold">
                        {ratingItem.user_name}
                      </Typography>
                      <Rating value={ratingItem.rating} readOnly size="small" />
                    </Box>
                    <Chip 
                      label={new Date(ratingItem.created_at).toLocaleDateString()} 
                      size="small" 
                      variant="outlined"
                    />
                  </Box>
                  
                  {ratingItem.comment && (
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      "{ratingItem.comment}"
                    </Typography>
                  )}
                </Paper>
              ))}
            </Box>
          )}
        </>
      )}
    </Paper>
  );
};

export default RatingComponent; 