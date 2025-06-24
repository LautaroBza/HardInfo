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
  ClickAwayListener
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import ComputerIcon from '@mui/icons-material/Computer';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { useProducts } from '../hooks/useProducts';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

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
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const { products, loadAllProducts } = useProducts();

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
          <IconButton size="large" edge="start" color="inherit" aria-label="logo" sx={{ mr: 1 }}>
            <img src='../src/assets/logoWhite.png' alt="Logo" style={{ width: 80, height: 80 }} />
          </IconButton>
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
        <Stack direction="row" spacing={1}>
          <Button color="inherit" component={Link} to="/productos-destacados">Productos Destacados</Button>
          <Button color="inherit" component={Link} to="/comparar">Comparar</Button>
          <Button color="inherit" component={Link} to="/profile">Perfil</Button>
          <Button color="inherit" component={Link} to="/login"> Login </Button>
          <Button color="inherit" component={Link} to="/register"> Crea tu cuenta  </Button>
          <IconButton component={Link} to="/favoritos" color="inherit">
            <FavoriteBorderIcon />
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;