import { useEffect, useState } from 'react';
import MediaCard from '../components/Card.jsx'
import { Grid, Typography, Container } from '@mui/material';

import hardCategories from '../data/hardCategories';
// Mock de componentes de ejemplo 
const allComponents = [
  { id: 1, name: "RTX 3060", category: "GPU", price: 450, image: "/imgs/rtx3060.jpg" },
  { id: 2, name: "Ryzen 5 5600X", category: "CPU", price: 220, image: "/imgs/ryzen5.jpg" },
  { id: 3, name: "MSI B550", category: "Motherboard", price: 150, image: "/imgs/msib550.jpg" },
  
];

export default function Favoritos() {
  const [favComponents, setFavComponents] = useState([]);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem('favoritos')) || [];
    const favData = hardCategories.filter(comp => favs.includes(comp.id));
    setFavComponents(favData);
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Mis Favoritos
      </Typography>

      {favComponents.length === 0 ? (
        <Typography variant="body1">No tenés componentes en favoritos.</Typography>
      ) : (
        <Grid container spacing={3}>
          {favComponents.map(comp => (
            <Grid item xs={12} sm={6} md={4} key={comp.id}>
              <MediaCard component={comp} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}