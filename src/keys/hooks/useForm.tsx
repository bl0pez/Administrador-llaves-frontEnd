import { useState } from 'react';


export const useForm = ({...initialForm}) => {

    const [formValues, setFormValues] = useState(initialForm);

    /**
     * Encargado de capturar los valores de los inputs file
     * @param e evento del input file
     */
    const onFileChange = (e: any) => {
        
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.files
        })
    }

    /**
     * Encargado de capturar los valores de los inputs
     * @param e evento del input
     */
    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({
          ...formValues,
          [e.target.name]: e.target.value
        })
      }

    const resetForm = () => {
        setFormValues(initialForm);
    }


    return {
        //states
        ...formValues,
        formValues,

        //functions
        onFileChange,
        onInputChange,
        resetForm,
    }



}
