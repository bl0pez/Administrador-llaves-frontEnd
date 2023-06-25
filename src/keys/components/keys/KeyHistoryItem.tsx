import { transformDate } from '@/keys/helpers'
import { BorrowedKey, Key } from '@/keys/interfaces'

type Props = {
    _id: string;
    createdAt: string;
    llave: Key;
    operator: string;
    requestedBy: string;
    service: string;
    updatedAt: string;
}

export const KeyHistoryItem = ({createdAt, llave, operator, requestedBy, service, updatedAt }: Props) => {
  return (
    <tr>
        <td>
            {llave.name}
        </td>
        <td>
            {operator}
        </td>
        <td>
            {service}
        </td>
        <td>
            {requestedBy}
        </td>
        <td>
            {transformDate(createdAt)}
        </td>
        <td>
            {transformDate(updatedAt)}
        </td>
    </tr>
  )
}
