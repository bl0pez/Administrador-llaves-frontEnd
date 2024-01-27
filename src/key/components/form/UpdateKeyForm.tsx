import { FC, useEffect, useState } from "react";
import { useFormik } from "formik";

import { Box, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import { InputUploadImage } from "../UploadImage";
import { UpdateKey } from "@/key/interfaces";
import { useKeyContext } from "@/key/context/KeyContext";
import { InputForm } from "@/common/components/input";
import { ButtonForm } from "@/common/components/button";
import { ErrorAlert } from "@/common/components/alert";
import { UpdateKeyService } from "@/key/services/key.service";
import { keyValidationSchema } from "@/key/helpers/keyValidationSchema";

interface Props {
  handleClose: () => void;
}

const initialFormValues: UpdateKey = {
  keyName: "",
  keyDescription: "",
  deliveredBy: "",
  image: "",
  file: null,
};

export const UpdateKeyForm = ({ handleClose }: Props) => {
  const { selectedKey } = useKeyContext();
  const { updateKey } = useKeyContext();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const {
    values,
    handleSubmit,
    errors,
    getFieldProps,
    touched,
    handleChange,
    setValues,
  } = useFormik<UpdateKey>({
    initialValues: initialFormValues,
    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true);

      try {
        const newKey = await UpdateKeyService({
          keyId: selectedKey!.keyId,
          updateKey: {
            image: selectedKey!.image,
            keyName: values.keyName,
            keyDescription: values.keyDescription,
            deliveredBy: values.deliveredBy,
            file: values.file,
          },
        });
        updateKey(newKey);
        handleClose();
      } catch (error: any) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    },
    validationSchema: keyValidationSchema,
  });

  const handleImageReset = () => {
    setValues({ ...values, file: null });
  };

  useEffect(() => {
    if (!selectedKey) return;

    setValues({
      ...values,
      keyName: selectedKey.keyName,
      keyDescription: selectedKey.keyDescription,
      deliveredBy: selectedKey.deliveredBy,
      image: selectedKey.image,
    });
  }, []);

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        boxShadow={4}
        p={2}
        display={"flex"}
        flexDirection={"column"}
        gap={2}
        borderRadius={2}
      >
        <Typography variant={"h5"} textAlign={"center"}>
          Editar llave
        </Typography>

        <Box display={"flex"} flexWrap={"wrap"} gap={2}>
          <InputForm
            label="Nombre de la llave"
            type="text"
            isError={Boolean(touched.keyName) && Boolean(errors.keyName)}
            sx={{
              flexGrow: 1,
            }}
            helperText={touched.keyName && errors.keyName}
            {...getFieldProps("keyName")}
          />

          <InputForm
            label="Entrega por"
            type="text"
            isError={
              Boolean(touched.deliveredBy) && Boolean(errors.deliveredBy)
            }
            sx={{
              flexGrow: 1,
            }}
            helperText={touched.deliveredBy && errors.deliveredBy}
            {...getFieldProps("deliveredBy")}
          />
        </Box>

        <InputForm
          label="Descripción"
          type="text"
          multiline
          isError={
            Boolean(touched.keyDescription) && Boolean(errors.keyDescription)
          }
          helperText={touched.keyDescription && errors.keyDescription}
          {...getFieldProps("keyDescription")}
        />

        <InputUploadImage
          handleChange={handleChange}
          image={values.file ? values.file : selectedKey!.image}
          error={Boolean(touched.file) && Boolean(errors.file)}
          helperText={errors.file}
          handleImageReset={handleImageReset}
        />

        <ButtonForm
          type="submit"
          title="Editar"
          isLoading={isLoading}
          icon={EditIcon}
        />
      </Box>
      <ErrorAlert
        isError={Boolean(errorMessage)}
        message={errorMessage}
        setIsError={() => true}
      />
    </>
  );
};
