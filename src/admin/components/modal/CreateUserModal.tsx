import { FC, useState } from 'react';
import { MainModal } from '@/common/components/modal';
import { useFormik } from 'formik';
import { CreateUserState } from '@/admin/interfaces';
import { InputForm } from '@/common/components/input';
import { Typography } from '@mui/material';
import { ButtonForm } from '@/common/components/button';
import { userFormValid } from '@/admin/helpers';
import { Form } from '@/common/components/form/Form';
import { SelectRoles } from '../select/SelectRoles';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

interface Props {
    isOpen: boolean;
    handleClose: () => void;
}

const initialFormValues: CreateUserState = {
    fullName: '',
    email: '',
    password: '',
    roles: [],
}

export const CreateUserModal:FC<Props> = ({isOpen, handleClose}) => {

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const { 
            values, 
            handleSubmit, 
            errors, 
            getFieldProps, 
            touched,
            setFieldValue, 
        } = useFormik({
            initialValues: initialFormValues,
            onSubmit: async (values) => {


              console.log(values);
            },
            validationSchema: userFormValid,
    })

  return (
    <MainModal
        isOpen={isOpen}
        handleClose={handleClose}
    >
        <Form
            handleSubmit={handleSubmit}
        >
            <Typography variant={'h5'} textAlign={'center'}>
                Crear Usuario
            </Typography>

            <InputForm 
                label={'Nombre Completo'}
                type={'text'}
                isError={Boolean(errors.fullName && touched.fullName)}
                helperText={touched.fullName && errors.fullName}
                {...getFieldProps('fullName')}
            />

            <InputForm 
                label={'Correo Electrónico'}
                type={'email'}
                isError={Boolean(errors.email && touched.email)}
                helperText={touched.email && errors.email}
                {...getFieldProps('email')}
            />

            <InputForm
                label={'Contraseña'}
                type={'password'}
                isError={Boolean(errors.password && touched.password)}
                helperText={touched.password && errors.password}
                {...getFieldProps('password')}
            />

            <SelectRoles 
                roles={values.roles}
                setFieldValue={setFieldValue}
            />

            <ButtonForm
            type='submit'
            title='Crear'
            isLoading={isLoading}
            icon={PersonAddIcon}
            />            
        </Form>
    </MainModal>
  )
}