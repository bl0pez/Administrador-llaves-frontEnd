import { HeaderTableContent, StickyTableContainer, TableBody, TableHeaderRow, TablePagination } from "@/common/components/table"
import { useEffect, useState } from "react";
import { KeyHistoryTableRowItem } from "../components/keyHistoryTableRowItem";
import { BorrowedKey, GetBorrowedKey } from '@/borrowedKey/interfaces'
import { keyHistoryService } from "../services/keyHistory.service";

const columns = [
  'Llave',
  'Operador que Entrega',
  'Solicitado Por',
  'Servicio/Empresa Asociada',
  'Fecha de Préstamo',
  'Operador que Recibe',
  'Fecha de Devolución',
]

const KeyHistoryPage = () => {

  const [limit, setLimit] = useState(5);
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<GetBorrowedKey>({
    borrowedKeys: [],
    count: 0,
  });

  const handleChangeLimit = (limit: number) => {
    setLimit(limit);
    setOffset(0);
  }

  const handleChangePage = (page: number) => {
    setOffset(page * limit);
  }

  const handleSearch = (search: string) => {
    setSearch(search);
    setOffset(0);
  }
  
  const getBorrowedKeysHistory = async () => {
      try {
        setIsLoading(true);
        const keyHistory = await keyHistoryService({limit, offset, search});
        setData(keyHistory);
      } catch (error) {
        console.log(error);
      }finally {
        setIsLoading(false);
      }
  }

  useEffect(() => {
    getBorrowedKeysHistory();
  }, [limit, offset, search])
  

  return (
    <>
      {/* Buscador y boton crear llave */}
        <HeaderTableContent
          label={'Buscar llave prestada'}
          handleSearch={handleSearch}
        />

        <StickyTableContainer>
            <TableHeaderRow 
                columns={columns}
            />
                
            <TableBody
                isLoading={isLoading}
                text="No se encontraron registros"
                colSpan={columns.length}
                itemCount={data?.count || 0}
            >
                  {
                    data?.borrowedKeys.map((item: BorrowedKey) => (
                      <KeyHistoryTableRowItem
                        key={item.borrowedKeyId}
                        item={item}
                      />
                    ))
                  }
            </TableBody>   

        </StickyTableContainer>

        {/* Paginación */}
        <TablePagination
          itemCount={data?.count || 0}
          handleChangeLimit={handleChangeLimit}
          limit={limit}
          page={offset / limit}
          handleChangePage={handleChangePage}
        />
    
    </>
  )
}

export default KeyHistoryPage