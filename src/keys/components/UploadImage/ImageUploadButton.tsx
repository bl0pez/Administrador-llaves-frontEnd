import { FC } from 'react';
import { Button, Typography } from '@mui/material'
import ImageIcon from '@mui/icons-material/Image';
import { ImagePreviewCard } from './ImagePreviewCard';


const buttonStyle = {
    border: '2px dashed #666CFF',
    height: '200px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 1,
    position: 'relative',
}

interface Props {
    onDragOver: (e: React.DragEvent<HTMLLabelElement>) => void;
    onDrop: (e: React.DragEvent<HTMLLabelElement>) => void;
    previewImage: string | null;
    onRemoveImage: () => void;
}

export const ImageUploadButton: FC<Props> = ({ onDragOver, onDrop, previewImage, onRemoveImage}) => {
  return (
    <Button
    component='label'
    htmlFor='image'
    sx={buttonStyle}
    onDragOver={onDragOver}
    onDrop={onDrop}
    >
      {
        previewImage
          ? (
            <ImagePreviewCard
                previewImage={previewImage}
            />
          )
          : (
              <>
                  <ImageIcon />
                  <Typography
                      align='center' 
                      variant='body2'>Arrastra una imagen o haz click para seleccionar</Typography>
              </>
          )
      }
  </Button>
  )
}
