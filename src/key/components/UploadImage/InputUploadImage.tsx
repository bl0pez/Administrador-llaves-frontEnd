import { FC } from 'react';
import { Button, Box, Typography } from '@mui/material';
import IconTrash from '@mui/icons-material/Delete';

import { ImageUploadButton } from './ImageUploadButton';
import { useImageUpload } from '@/key/hooks/useImageUpload';

const buttonStyle = {
  borderRadius: '100%',
  minWidth: 'unset',
  width: '40px',
  height: '40px',
  position: 'absolute',
  top: -20,
  right: -20,
}

type Props = {
    handleChange: (e: any) => void;
    image: string | null;
    error: boolean;
    helperText: string | undefined;
    handleImageReset: () => void;
}

export const InputUploadImage: FC<Props> = ({ handleChange, image, error, helperText, handleImageReset }) => {

    const { 
      inputRef, 
      onDragOver, 
      onDrop, 
      onHandleChange, 
      previewImage, 
      onRemoveImage 
    } = useImageUpload({
      handleChange,
      handleImageReset,
      image,
      name: 'file'
    });
    
  return (
    <>
        <input 
          type="file"
          style={{ display: 'none' }}
          name='file'
          id='file'
          ref={inputRef}
          onChange={(e) => onHandleChange(e)}
          accept='image/png, image/jpeg, image/jpg, image/webp'
        />

        <Box sx={{ position: 'relative' }}>
          <ImageUploadButton 
              onDragOver={onDragOver}
              onDrop={onDrop}
              previewImage={previewImage as string}
              htmlFor='file'
          />
          {
            previewImage && (
              <Button
              variant='contained'
              onClick={onRemoveImage}
                size='small'
                color='error'
                sx={buttonStyle}
            >
                <IconTrash />
            </Button>
            )
          }
        {
          error && (
            <Box>
              <Typography
                variant='body2'
                color='error'
                sx={{ mt: 1 }}
              >
                * {helperText}
              </Typography>
            </Box>
          )
        }
        </Box>
    </>
  )
}
