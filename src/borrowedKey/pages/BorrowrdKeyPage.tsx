import { BorrowedKeyProvider } from '../context/BorrowedKeyContext';
import { BorrowedKeyTable } from '../components/table/BorrowedKeyTable';

const BorrowedKeyPage = () => {


  return (
    <BorrowedKeyProvider>
        <BorrowedKeyTable />
    </BorrowedKeyProvider>
  )
}

export default BorrowedKeyPage;