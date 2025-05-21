import {
  AppBar,
  IconButton,
  InputBase,
  Toolbar,
  Typography,
  Stack,
  Button,
  Box
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import ComputerIcon from '@mui/icons-material/Computer';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';

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

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton size="large" edge="start" color="inherit" aria-label="logo" sx={{ mr: 1 }}>
            <Button color='inherit' component={Link} to='/'><ComputerIcon /></Button>
          </IconButton>
          <Typography variant="h6" component="div">
            HardInfo
          </Typography>
        </Box>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase placeholder="Buscar componentes…" inputProps={{ 'aria-label': 'search' }} />
        </Search>
        <Stack direction="row" spacing={1}>
          <Button color="inherit">Template 1</Button>
          <Button color="inherit">Template 2</Button>
          <Button color="inherit" component={Link} to="/login"> Login </Button>
          <Button color="inherit" component={Link} to="/register"> Crea tu cuenta  </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
