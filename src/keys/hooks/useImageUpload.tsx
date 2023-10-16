import { useEffect, useRef, useState } from 'react';

export const useImageUpload = (handleChange: (e: any) => void, image: string | null) => {
 
    const [previewImage, setPreviewImage] = useState<string | ArrayBuffer | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const onDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
    }

    const onDrop = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
        const file = e.dataTransfer.files?.[0];

        if (file && !file.type.startsWith('image/')) {
          return;
        }

        if (file) {
          const syntheticEvent = {
            target: {
              name: 'image',
              value: file,
            },
          };

          handleChange(syntheticEvent);
    }
    }

    const onHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {        
        const syntheticEvent = {
          target: {
            name: 'image',
            value: e.target.files![0],
          },
        };

        handleChange(syntheticEvent);

    }

    const onRemoveImage = () => {
        setPreviewImage(null);
        inputRef.current!.value = '';
    }

    useEffect(() => {

        if (!image || typeof(image) != 'object') {
          setPreviewImage(null);
          inputRef.current!.value = '';
          return;
        };
  
        const file = new FileReader;
  
        file.onload = function() {
            setPreviewImage(file.result)
        }
  
        file.readAsDataURL(image as Blob)
  
    }, [image])

    return {
        previewImage,
        inputRef,
        onDragOver,
        onDrop,
        onHandleChange,
        onRemoveImage
    }

}
