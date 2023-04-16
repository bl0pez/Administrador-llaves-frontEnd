interface Props {
  children: JSX.Element | JSX.Element[];
}

export const TableKeys = ({ children }: Props) => {
  return (
    <div className="w-full overflow-x-auto">
      <table>
        <thead className=''>
          <tr>
            <th>Imagen</th>
            <th>Llave</th>
            <th>Descripción</th>
            <th>Resepcionada por</th>
            <th>Fecha de resepcion</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {children}
        </tbody>
      </table>
    </div>
  )
}
