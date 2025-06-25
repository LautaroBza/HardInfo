# Integración de Autenticación - HardInfo

## Descripción
Se ha implementado un sistema completo de autenticación que integra el backend FastAPI con el frontend React.

## Características Implementadas

### Backend (FastAPI)
- ✅ Endpoint de registro (`POST /auth/register`)
- ✅ Endpoint de login (`POST /auth/token`)
- ✅ Endpoint para obtener información del usuario (`GET /auth/me`)
- ✅ Autenticación JWT con tokens
- ✅ Validación de credenciales
- ✅ CORS configurado para permitir peticiones del frontend
- ✅ **Favoritos únicos por usuario** (corregido)

### Frontend (React)
- ✅ Contexto de autenticación global (`AuthContext`)
- ✅ Formularios de login y registro integrados
- ✅ Manejo de tokens en localStorage
- ✅ Navbar actualizado con información del usuario
- ✅ Rutas protegidas para páginas que requieren autenticación
- ✅ Servicio API actualizado con autenticación automática
- ✅ **Favoritos integrados con el backend** (corregido)
- ✅ **Página de detalle con favoritos funcionales** (corregido)

## Problemas Resueltos

### ❌ **Problema 1: Favoritos Compartidos**
Los favoritos se compartían entre todos los usuarios porque el frontend estaba usando `localStorage` en lugar del backend.

### ✅ **Solución 1 Implementada**
1. **Backend**: Los favoritos ya estaban correctamente filtrados por `owner_id`
2. **Frontend**: Migrado completamente del `localStorage` al backend
3. **Componentes actualizados**:
   - `FavoritosPage.jsx` - Ahora usa `apiService.getFavoritesWithDetails()`
   - `Card.jsx` - Ahora usa `apiService.addToFavorites()` y `apiService.removeFromFavorites()`
   - `api.js` - Agregada función `getFavoritesWithDetails()` para obtener información completa

### ❌ **Problema 2: Botón de Favoritos en Página de Detalle**
El botón para agregar/quitar favoritos en la página de detalle del hardware no funcionaba porque usaba `localStorage`.

### ✅ **Solución 2 Implementada**
1. **HardwareDetail.jsx**: Completamente migrado del `localStorage` al backend
2. **Funcionalidades agregadas**:
   - Verificación de estado de favoritos al cargar
   - Manejo de estados de carga y error
   - Redirección a login si no está autenticado
   - Actualización en tiempo real del estado del botón

### 🔧 **Cambios Técnicos**
- Eliminado uso de `localStorage` para favoritos en todos los componentes
- Agregada autenticación automática en todas las peticiones de favoritos
- Verificación de estado de favoritos en tiempo real
- Manejo de errores mejorado
- Estados de carga para mejor UX

## Cómo Probar

### 1. Iniciar el Backend
```bash
cd HardInfoBack
python -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate
pip install -r requirements.txt
python main.py
```

### 2. Iniciar el Frontend
```bash
cd HardInfo
npm install
npm run dev
```

### 3. Probar la Autenticación

#### Registro de Usuario
1. Ve a `http://localhost:5173/register`
2. Completa el formulario con:
   - Nombre
   - Apellido
   - Usuario
   - Email
   - Contraseña
3. Haz clic en "Registrarme"
4. Deberías ser redirigido a la página principal y ver tu avatar en el navbar

#### Login de Usuario
1. Ve a `http://localhost:5173/login`
2. Ingresa tu email y contraseña
3. Haz clic en "Entrar"
4. Deberías ser redirigido a la página principal

#### Probar Favoritos Únicos por Usuario
1. **Crear dos usuarios diferentes**:
   - Usuario 1: `usuario1@test.com` / `password123`
   - Usuario 2: `usuario2@test.com` / `password123`

2. **Agregar favoritos con cada usuario**:
   - Login con Usuario 1 → Agregar algunos productos a favoritos
   - Logout → Login con Usuario 2 → Agregar productos diferentes a favoritos
   - Verificar que cada usuario ve solo sus propios favoritos

3. **Verificar en la página de favoritos**:
   - Cada usuario debe ver solo sus productos favoritos
   - Los favoritos no deben compartirse entre usuarios

#### Probar Favoritos en Página de Detalle
1. **Hacer login** con cualquier usuario
2. **Ir a una página de detalle** de producto (ej: `/hardware/1`)
3. **Hacer clic en "Agregar a favoritos"**:
   - El botón debe cambiar a "Quitar de favoritos"
   - El producto debe aparecer en la página de favoritos
4. **Hacer clic en "Quitar de favoritos"**:
   - El botón debe cambiar de vuelta a "Agregar a favoritos"
   - El producto debe desaparecer de la página de favoritos

#### Funcionalidades Protegidas
- **Perfil**: Solo accesible si estás autenticado
- **Favoritos**: Solo accesible si estás autenticado
- **Logout**: Disponible en el menú del avatar

## Estructura de Archivos

### Nuevos Archivos Creados
- `src/contexts/AuthContext.jsx` - Contexto de autenticación
- `src/components/ProtectedRoute.jsx` - Componente para rutas protegidas
- `README_AUTH.md` - Este archivo
- `test_favorites.js` - Script de prueba para favoritos
- `test_detail_favorites.js` - Script de prueba para favoritos en detalle

### Archivos Modificados
- `src/services/api.js` - Agregadas funciones de autenticación y `getFavoritesWithDetails()`
- `src/components/AuthForm.jsx` - Integrado con el contexto
- `src/components/Navbar.jsx` - Agregado menú de usuario
- `src/App.jsx` - Agregado AuthProvider y rutas protegidas
- `src/pages/FavoritosPage.jsx` - **Migrado del localStorage al backend**
- `src/components/Card.jsx` - **Migrado del localStorage al backend**
- `src/pages/HardwareDetail.jsx` - **Migrado del localStorage al backend**
- `HardInfoBack/routers/auth.py` - Agregado endpoint `/me`

## Flujo de Autenticación

1. **Registro**: Usuario se registra → Se crea cuenta → Se genera token → Se guarda en localStorage
2. **Login**: Usuario ingresa credenciales → Se valida → Se genera token → Se guarda en localStorage
3. **Verificación**: Al cargar la app → Se verifica token → Se obtiene información del usuario
4. **Peticiones**: Todas las peticiones incluyen automáticamente el token de autorización
5. **Logout**: Se elimina el token → Se limpia el estado → Se redirige a home

## Flujo de Favoritos (Corregido)

1. **Agregar favorito**: Usuario autenticado → API call con token → Se guarda en BD con `owner_id`
2. **Ver favoritos**: Usuario autenticado → API call con token → Se filtran por `owner_id`
3. **Eliminar favorito**: Usuario autenticado → API call con token → Se elimina de BD
4. **Verificación**: Cada usuario ve solo sus propios favoritos

## Flujo de Favoritos en Página de Detalle (Corregido)

1. **Cargar página**: Se verifica si el producto está en favoritos del usuario
2. **Agregar favorito**: Clic en botón → API call → Actualizar estado del botón
3. **Quitar favorito**: Clic en botón → API call → Actualizar estado del botón
4. **Estados**: Loading, error, y éxito manejados correctamente

## Seguridad

- Tokens JWT con expiración de 30 minutos
- Contraseñas hasheadas con bcrypt
- Validación de credenciales en el backend
- Rutas protegidas en el frontend
- Manejo de errores de autenticación
- **Favoritos aislados por usuario** (corregido)

## Próximos Pasos

- [ ] Implementar refresh tokens
- [ ] Agregar validación de formularios más robusta
- [ ] Implementar recuperación de contraseña
- [ ] Agregar roles de usuario
- [ ] Implementar autenticación social (Google, Facebook, etc.)
- [ ] Agregar notificaciones de éxito/error para favoritos
- [ ] Implementar sincronización de favoritos entre pestañas 