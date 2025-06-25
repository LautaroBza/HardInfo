import React, { useState } from 'react'
import {
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress
} from '@mui/material'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

const AuthForm = ({ mode }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    usuario: '',
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login, register } = useAuth()
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      let result
      
      if (mode === 'register') {
        result = await register(formData)
      } else {
        result = await login(formData.email, formData.password)
      }

      if (result.success) {
        navigate('/')
      } else {
        setError(result.error)
      }
    } catch (err) {
      setError(err.message || 'Ocurrió un error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: '300px' }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {mode === 'register' && (
        <>
          <TextField
            fullWidth
            label="Nombre"
            name="nombre"
            margin="normal"
            value={formData.nombre}
            onChange={handleInputChange}
            required
          />
          <TextField
            fullWidth
            label="Apellido"
            name="apellido"
            margin="normal"
            value={formData.apellido}
            onChange={handleInputChange}
            required
          />
          <TextField
            fullWidth
            label="Usuario"
            name="usuario"
            margin="normal"
            value={formData.usuario}
            onChange={handleInputChange}
            required
          />
        </>
      )}

      <TextField
        fullWidth
        label="Email"
        name="email"
        type="email"
        margin="normal"
        value={formData.email}
        onChange={handleInputChange}
        required
      />

      <TextField
        fullWidth
        label="Contraseña"
        name="password"
        type="password"
        margin="normal"
        value={formData.password}
        onChange={handleInputChange}
        required
      />

      <Button
        fullWidth
        variant="contained"
        color="primary"
        type="submit"
        disabled={loading}
        sx={{ mt: 2 }}
      >
        {loading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          mode === 'login' ? 'Entrar' : 'Registrarme'
        )}
      </Button>
    </Box>
  )
}

export default AuthForm




