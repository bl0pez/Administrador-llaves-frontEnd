import { useEffect, useRef, useState } from 'react';

interface Props {
    image: string,
    onFileChange: ( e: React.ChangeEvent<HTMLInputElement> ) =>  void;
}

export const Dropzone = ({ image, onFileChange }:Props) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string>('');

    useEffect(() => {

        
        if (!image || typeof(image) != 'object') return;
        
        const render = new FileReader();
        render.onloadend = () => {
            setPreview(render.result as string);
        }

        const blob = new Blob([image], { type: 'text/plain' });

        render.readAsDataURL(blob);

    }, [image]);

    const removeImage = () => {
        setPreview('');
        inputRef.current!.value = '';
    }
    
      return (
        <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'> 
            <input
                type="file"
                name="image"
                id="image"
                className='block'
                ref={inputRef}
                onChange={onFileChange}
            />

            {
                preview && (
                    <div className='relative w-32 h-32 lg:w-64 lg:h-64'>
                    <img
                        className='relative w-full h-full object-cover'
                        src={preview}
                        alt="Imagen de la llave"
                        />
                    <button
                        type='button'
                        onClick={removeImage}
                        title='Eliminar imagen'
                        className='absolute -top-3 text-white -right-4 z-10 bg-red-500 rounded-full w-8 h-8 hover:bg-red-600 transition-all duration-500 ease-in-out'
                    ><i className='fas fa-times'></i></button>
                    </div>
                )
            }
        </div>
      )
}
