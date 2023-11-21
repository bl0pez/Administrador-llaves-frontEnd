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
  let hora = date.getHours();
  const minutos = ("0" + date.getMinutes()).slice(-2);

  const ampm = hora >= 12 ? "PM" : "AM";
  hora = hora % 12;
  hora = hora ? hora : 12; // the hour '0' should be '12'
  const horaFormateada = ("0" + hora).slice(-2);

  const dateTransformed = `${dia}-${mes}-${año}`;
  const timeTransformed = `${horaFormateada}:${minutos} ${ampm}`;

  return { dateTransformed, timeTransformed };
};
