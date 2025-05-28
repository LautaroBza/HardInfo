import React from 'react';
import { Box, Typography, Avatar, Paper, Divider } from '@mui/material';
import { Person as PersonIcon } from '@mui/icons-material';

const ProfilePage = () => {
  return (
    <Box sx={{ 
      p: 4, 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      minHeight: '70vh'
    }}>
      <Paper elevation={3} sx={{
        p: 4,
        width: '100%',
        maxWidth: '600px',
        borderRadius: '16px',
        background: 'linear-gradient(145deg, #f5f5f5, #ffffff)',
        textAlign: 'center'
      }}>
        <Avatar sx={{
          width: 120,
          height: 120,
          margin: '0 auto 20px',
          bgcolor: 'primary.main',
          fontSize: '3rem'
        }}>
          <PersonIcon sx={{ fontSize: '60px' }} />
        </Avatar>
        
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
          Perfil de Usuario
        </Typography>
        
        <Divider sx={{ my: 3 }} />
        
        <Box sx={{
          p: 3,
          mb: 3,
          borderRadius: '12px',
          backgroundColor: 'rgba(25, 118, 210, 0.05)'
        }}>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            Bienvenido a tu espacio personal
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Aquí podrás gestionar tu información personal, preferencias y configuración cuando estés listo.
          </Typography>
        </Box>
        
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 2,
          mt: 2
        }}>
          <Paper sx={{ 
            p: 2, 
            width: '120px', 
            textAlign: 'center',
            borderRadius: '12px'
          }}>
            <Typography variant="caption" display="block" color="text.secondary">
              Seguidores
            </Typography>
            <Typography variant="h6">0</Typography>
          </Paper>
          
          <Paper sx={{ 
            p: 2, 
            width: '120px', 
            textAlign: 'center',
            borderRadius: '12px'
          }}>
            <Typography variant="caption" display="block" color="text.secondary">
              Siguiendo
            </Typography>
            <Typography variant="h6">0</Typography>
          </Paper>
        </Box>
      </Paper>
    </Box>
  );
};

export default ProfilePage;