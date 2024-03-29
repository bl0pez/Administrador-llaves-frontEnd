import { FC, useEffect, useState } from 'react';
import { MainModal } from '@/common/components/modal';
import { useFormik } from 'formik';
import { InputForm } from '@/common/components/input';
import { Typography } from '@mui/material';
import { ButtonForm } from '@/common/components/button';
import { userFormValid } from '@/admin/helpers';
import { Form } from '@/common/components/form/Form';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { UpdateUser, User } from '@/admin/interfaces';
import { userServiceApi } from '@/admin/service/userService';
import { useUserContext } from '@/admin/hooks';
import { SelectRole } from '../select/SelectRole';
import { ErrorAlert } from '@/common/components/alert';

interface Props {
    isOpen: boolean;
    handleClose: () => void;
    user: User;
}

const initialFormValues: UpdateUser = {
    fullName: '',
    email: '',
    role: ''
}

export const UpdateUserModal:FC<Props> = ({isOpen, handleClose, user}) => {

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const { updateUser } = useUserContext();

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
                setIsLoading(true);
                try {
                    const data = await userServiceApi.update(user.id, values);
                    updateUser(data);
                    handleClose();
                } catch (error: any) {
                    setErrorMessage(error.message);
                } finally {
                    setIsLoading(false);
                }

              
            },
            validationSchema: userFormValid(user),
    })

    useEffect(() => {
        setFieldValue('fullName', user.fullName);
        setFieldValue('email', user.email);
        setFieldValue('role', user.role);
    }, [])

  return (
    <MainModal
        isOpen={isOpen}
        handleClose={handleClose}
    >
        <Form
            handleSubmit={handleSubmit}
        >
            <ErrorAlert
                isError={Boolean(errorMessage)}
                setIsError={() => setErrorMessage('')}
                message={errorMessage}
            />
            <Typography variant={'h5'} textAlign={'center'}>
                Editar Usuario
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

            <SelectRole 
                role={values.role}
                setFieldValue={setFieldValue}
            />

            <ButtonForm
                type='submit'
                title='Editar'
                isLoading={isLoading}
                icon={PersonAddIcon}
            />            
        </Form>
    </MainModal>
  )
}