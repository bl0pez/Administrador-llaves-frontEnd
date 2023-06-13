import { useMemo, useState } from 'react';

export interface FormValues {
    [key: string]: any;
}

export interface FormValidations {
    [key: string]: [(value: string) => boolean, string];
}

interface Errors {
    [key: string]: string | undefined;
}


export const useForm = (initialForm: FormValues, formValidations: FormValidations) => {

    const [formValues, setFormValues] = useState<FormValues>(initialForm);
    const [errors, setErrors] = useState<Errors>({});

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

    const onBluer = (e: React.FocusEvent<HTMLInputElement>) => {
        
        const { name, value } = e.target;

        const validation = formValidations[name];

        if( validation ) {
            const [validate, message] = validation;
            const isValid = validate(value);
            setErrors({
                ...errors,
                [name]: !isValid ? message : undefined
            })
        }
    }


    return {
        //states
        ...formValues,
        formValues,

        //functions
        onFileChange,
        onInputChange,
        resetForm,
        onBluer,
        errors,
    }



}

