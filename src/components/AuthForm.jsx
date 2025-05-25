import React, { useState } from 'react'
import {
  TextField,
  Button,
  Box
} from '@mui/material'

const AuthForm = ({ mode }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (mode === 'register') {
      console.log('Registro:', { username, email, password })
    } else {
      console.log('Login:', { email, password })
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: '300px' }}>
      {mode === 'register' && (
        <TextField
          fullWidth
          label="Usuario"
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      )}

      <TextField
        fullWidth
        label="Email"
        type="email"
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <TextField
        fullWidth
        label="Contraseña"
        type="password"
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button
        fullWidth
        variant="contained"
        color="primary"
        type="submit"
        sx={{ mt: 2 }}
      >
        {mode === 'login' ? 'Entrar' : 'Registrarme'}
      </Button>
    </Box>
  )
}

export default AuthForm




