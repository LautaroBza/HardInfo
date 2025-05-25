import React, { useState, useEffect } from 'react'
import AuthForm from '../components/AuthForm.jsx'
import { Button, Box, Typography } from '@mui/material'
import { useLocation } from 'react-router-dom'

const LoginRegisterPage = () => {
  const location = useLocation()
  const isRegister = location.pathname.includes('register')
  const [mode, setMode] = useState(isRegister ? 'register' : 'login')

  // Si cambia la URL, actualiza el modo
  useEffect(() => {
    setMode(isRegister ? 'register' : 'login')
  }, [location.pathname])

  const toggleMode = () => {
    setMode(prev => (prev === 'login' ? 'register' : 'login'))
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Typography variant="h4" gutterBottom>
        {mode === 'login' ? 'Iniciar Sesión' : 'Registrarse'}
      </Typography>

      <AuthForm mode={mode} />

      <Button onClick={toggleMode} sx={{ mt: 2 }}>
        {mode === 'login'
          ? '¿No tenés cuenta? Registrate'
          : '¿Ya tenés cuenta? Iniciá sesión'}
      </Button>
    </Box>
  )
}

export default LoginRegisterPage