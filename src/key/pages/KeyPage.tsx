import { KeyProvider } from '../context/KeyContext';
import { KeyTable } from '../components/table/KeyTable';

const KeyPage = () => {

  return (
    <KeyProvider>
        <KeyTable />
    </KeyProvider>
  )
}

export default KeyPage;