import * as Yup from "yup";

export const keyValidationSchema = Yup.object({
  keyName: Yup.string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(50, "El nombre debe tener menos de 20 caracteres")
    .required("Este campo es requerido"),
  keyDescription: Yup.string()
    .min(3, "La descripción debe tener al menos 3 caracteres")
    .max(100, "La descripción debe tener menos de 100 caracteres")
    .required("Este campo es requerido"),
  deliveredBy: Yup.string()
    .min(3, "La entrega debe tener al menos 3 caracteres")
    .max(50, "La entrega debe tener menos de 20 caracteres")
    .required("Este campo es requerido"),
});

export const createKeyValidationSchema = Yup.object({
  keyName: Yup.string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(50, "El nombre debe tener menos de 20 caracteres")
    .required("Este campo es requerido"),
  keyDescription: Yup.string()
    .min(3, "La descripción debe tener al menos 3 caracteres")
    .max(100, "La descripción debe tener menos de 100 caracteres")
    .required("Este campo es requerido"),
  deliveredBy: Yup.string()
    .min(3, "La entrega debe tener al menos 3 caracteres")
    .max(50, "La entrega debe tener menos de 20 caracteres")
    .required("Este campo es requerido"),
  file: Yup.mixed().required("Agrega una imagen"),
});
