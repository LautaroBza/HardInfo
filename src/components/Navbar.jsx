import {
  AppBar,
  IconButton,
  InputBase,
  Toolbar,
  Typography,
  Stack,
  Button,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  Popper,
  ClickAwayListener,
  Avatar,
  Menu,
  MenuItem
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { useProducts } from '../hooks/useProducts';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useAuth } from '../contexts/AuthContext';
import { useCompare } from '../contexts/CompareContext';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// Custom styles for the search bar
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
  width: '100%',
  maxWidth: 300,
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

const SearchResultsWrapper = styled(Paper)(({ theme }) => ({
  position: 'absolute',
  zIndex: 1000,
  width: '100%',
  maxHeight: '300px',
  overflow: 'auto',
  marginTop: theme.spacing(1),
}));

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { products, loadAllProducts } = useProducts();
  const { user, isAuthenticated, logout } = useAuth();
  const { clearComparison } = useCompare();

  // Cargar productos al montar el componente
  useEffect(() => {
    loadAllProducts();
  }, [loadAllProducts]);

  // Handle search input changes
  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    // Filter components based on search query
    const filteredResults = products.filter((component) => {
      const queryLower = query.toLowerCase();
      
      // Search in component name
      if (component.name?.toLowerCase().includes(queryLower)) {
        return true;
      }
      
      // Search in component type
      if (component.type?.toLowerCase().includes(queryLower)) {
        return true;
      }

      // Search in component brand
      if (component.brand?.toLowerCase().includes(queryLower)) {
        return true;
      }
      
      return false;
    });
    
    setSearchResults(filteredResults);
    setShowResults(true);
  };

  const handleResultClick = (componentId) => {
    setShowResults(false);
    setSearchQuery('');
    navigate(`/hardware/${componentId}`);
  };

  const handleClickAway = () => {
    setShowResults(false);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate('/');
  };

  const handleCompareClick = () => {
    if (location.pathname === '/comparar') {
      clearComparison();
    } else {
      navigate('/comparar');
    }
  };

  // Función para obtener la primera especificación del producto
  const getFirstSpec = (product) => {
    if (product.propiedad_cpu) {
      return `Núcleos: ${product.propiedad_cpu.cores || 'N/A'}`;
    }
    if (product.propiedad_gpu) {
      return `VRAM: ${product.propiedad_gpu.vram || 'N/A'} GB`;
    }
    if (product.propiedad_ram) {
      return `Capacidad: ${product.propiedad_ram.size || 'N/A'}`;
    }
    if (product.propiedad_motherboard) {
      return `Chipset: ${product.propiedad_motherboard.chipset || 'N/A'}`;
    }
    return 'Sin especificaciones';
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button color='inherit' component={Link} to='/'>
            <img src='../src/assets/logoSinTexto.png' alt="Logo" style={{ width: 40, height: 40 }}/>
          </Button>
          <Typography variant="h6" component="div">
            HardInfo
          </Typography>
        </Box>
        <Box sx={{ position: 'relative' }} ref={searchRef}>
          <ClickAwayListener onClickAway={handleClickAway}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase 
                placeholder="Buscar componentes…" 
                inputProps={{ 'aria-label': 'search' }}
                value={searchQuery}
                onChange={handleSearchChange}
              />
              {showResults && searchResults.length > 0 && (
                <SearchResultsWrapper>
                  <List>
                    {searchResults.map((result) => {
                      const resultId = result.id_producto || result.id;
                      return (
                        <ListItem 
                          button 
                          key={resultId}
                          onClick={() => handleResultClick(resultId)}
                        >
                          <ListItemText 
                            primary={result.name} 
                            secondary={
                              <>
                                <Typography component="span" variant="body2" color="text.primary">
                                  {result.type}
                                </Typography>
                                {` — ${getFirstSpec(result)}`}
                              </>
                            }
                          />
                        </ListItem>
                      );
                    })}
                  </List>
                </SearchResultsWrapper>
              )}
            </Search>
          </ClickAwayListener>
        </Box>
        <Stack direction="row" spacing={1} alignItems="center">
          <Button color="inherit" component={Link} to="/productos-destacados">Productos Destacados</Button>
          <Button color="inherit" component={Link} to="/comparar">Comparar</Button>
          
          {isAuthenticated ? (
            <>
              <Button color="inherit" component={Link} to="/profile">Perfil</Button>
              <IconButton component={Link} to="/favoritos" color="inherit">
                <FavoriteBorderIcon />
              </IconButton>
              <IconButton
                onClick={handleMenuOpen}
                color="inherit"
                sx={{ ml: 1 }}
              >
                <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>
                  {user?.nombre?.charAt(0)?.toUpperCase() || <AccountCircleIcon />}
                </Avatar>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem disabled>
                  <Typography variant="body2">
                    {user?.nombre} {user?.apellido}
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  Cerrar Sesión
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">Login</Button>
              <Button color="inherit" component={Link} to="/register">Crea tu cuenta</Button>
            </>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;