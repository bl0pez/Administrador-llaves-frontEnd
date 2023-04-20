import { useRef, useState } from 'react';

interface Props {
    image: File | null;
    setImage: (value: File | null) => void;
}

export const Dropzone = ({ image, setImage }:Props) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string>('');
    const imgRef = useRef<HTMLImageElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

            if (!e.target.files) return;

            //Cargamos la imagen en el state
            const selectedFile = e.target.files[0];
            setImage(selectedFile);

            //Renderizamos la imagen cargada con el useref
            if(selectedFile){
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreview(reader.result as string);
                }

                reader.readAsDataURL(selectedFile);

            }else {
                setPreview('');
            }
            

            // const file:File = e.target.files[0];
            // setImage(file);
            // const url:string = URL.createObjectURL(file);
            // imgRef.current!.src = url;

            // return () => URL.revokeObjectURL(url);

    }

    const removeImage = () => {
        setImage(null);
        setPreview('');
        inputRef.current!.value = '';
    }

      return (
        <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'> 
            <input
                type="file"
                name="image"
                id="image"
                ref={inputRef}
                className='block'
                onChange={handleChange}
            />

            {
                image && (
                    <div className='relative w-32 h-32 lg:w-64 lg:h-64'>
                    <img
                        className='relative w-full h-full'
                        src={preview}
                        alt="Imagen de la llave"
                        />
                    <button
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
