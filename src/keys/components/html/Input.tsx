type Props = {
    value: string;
    name: string;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    texto: string;
}


export const Input = ({ value, name, onInputChange, placeholder, texto }: Props) => {
  return (
    <div>
    <label htmlFor={name} className='text-2xl'>{ texto }</label>
    <input 
      type='text' 
      className='block w-full mt-2' 
      placeholder={placeholder} 
      name={name}
      value={value}
      onChange={onInputChange}
      autoComplete='off'
    />
  </div>
  )
}



