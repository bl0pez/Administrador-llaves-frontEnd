import { FC } from 'react';
import { Card, CardMedia } from '@mui/material';

const cardStyle = {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
}

const cardMediaStyle = {
    objectFit: 'contain',
    width: '100%',
    height: '100%',
}

interface Props {
    previewImage: string;
}

export const ImagePreviewCard:FC<Props> = ({ previewImage }) => {
  return (
      <Card 
        sx={cardStyle}
      >
        <CardMedia
          component="img"
          image={previewImage}
          alt="Preview image"
          sx={cardMediaStyle}
        />
      </Card>
  )
}