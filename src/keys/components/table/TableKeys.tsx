import { IsAdmin } from "../isAdmin/IsAdmin";

interface Props {
  children: JSX.Element | JSX.Element[];
  words: string[];
  wordsAdmin?: string[];
}

/**
 * Componente para renderizar la tabla de llaves
 * @param words - array de palabras para los encabezados de la tabla 
 * @returns - JSX.Element
 */
export const TableKeys = ({ children, words, wordsAdmin }: Props) => {
  return (
    <div className="w-full overflow-x-auto">
      <table>
        <thead className=''>
          <tr>
            {
              words.map((word: string) => (
                <th key={word}>{word}</th>
              ))
            }
            <IsAdmin>
              <>
                {
                  wordsAdmin?.map((word: string) => (
                    <th key={word}>{word}</th>
                  ))
                }
              </>
            </IsAdmin>
          </tr>
        </thead>
        <tbody>
          {children}
        </tbody>
      </table>     
    </div>
  )
}
