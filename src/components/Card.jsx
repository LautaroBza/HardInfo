import { Card, CardActions, CardContent, CardMedia, Button, Typography, Stack, Grid } from '@mui/material';
import HardCategories from '../data/hardCategories';

export default function MediaCard() {
  return (
    <Stack direction='row' spacing={3} marginTop={10} sx={{justifyContent: 'center', alignItems: 'center'}}>
      {HardCategories.map((card, index) => (
        <Card key={index} sx={{ maxWidth: 300 }}>
          <CardMedia
            sx={{ height: 200 }}
            image={card.image}
            title={card.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h3" component="div" align='center'>
              {card.name}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {card.description}
            </Typography>
          </CardContent>
          <CardActions sx={{justifyContent: 'center'}}>
            <Button size="small">Ver informacion</Button>
            <Button size="small">Lista componentes</Button>
          </CardActions>
        </Card>
      ))}
    </Stack>
  );
}
