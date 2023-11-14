import * as Yup from "yup";
import { User } from "../interfaces";

const yupValidation = {
  fullName: () => {
    return Yup.string()
      .required("El nombre completo es requerido")
      .min(3, "El nombre completo debe tener al menos 3 caracteres")
      .max(40, "El nombre completo debe tener menos de 40 caracteres");
  },
  email: () => {
    return Yup.string()
      .email("El email no es valido")
      .required("Este campo es requerido");
  },
  password: () => {
    return Yup.string()
      .required("Este campo es requerido")
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .max(20, "La contraseña debe tener menos de 20 caracteres")
      .matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        "La contraseña debe contener al menos una letra mayúscula, una minúscula y un número"
      );
  },
  roles: () => {
    return Yup.array()
      .required("Debes seleccionar al menos un rol")
      .min(1, "Debes seleccionar al menos un rol");
  },
};

export const userFormValid = (user: User | undefined) => {
  if (user) {
    return Yup.object({
      fullName: yupValidation.fullName(),
      email: yupValidation.email(),
      roles: yupValidation.roles(),
    });
  }

  return Yup.object({
    fullName: yupValidation.fullName(),
    email: yupValidation.email(),
    password: yupValidation.password(),
    roles: yupValidation.roles(),
  });
};
