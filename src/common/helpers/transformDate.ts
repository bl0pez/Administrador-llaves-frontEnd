/**
 * Transforma una fecha en el formato "dd-mm-año hh:mm".
 * @param {string} fecha - La fecha en formato ISO 8601.
 * @returns {string} La fecha transformada.
 */
export const transformDate = (
  fecha: Date
): { dateTransformed: string; timeTransformed: string } => {
  const date = new Date(fecha);
  const dia = ("0" + date.getDate()).slice(-2);
  const mes = ("0" + (date.getMonth() + 1)).slice(-2);
  const año = date.getFullYear();
  const hora = ("0" + date.getHours()).slice(-2);
  const minutos = ("0" + date.getMinutes()).slice(-2);

  const dateTransformed = `${dia}-${mes}-${año}`;
  const timeTransformed = `${hora}:${minutos}`;

  return { dateTransformed, timeTransformed };
};
