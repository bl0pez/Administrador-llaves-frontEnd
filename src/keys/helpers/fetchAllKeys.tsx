import { keyApi } from "../../api/keyApi"
import { FetchAllkeysResponse, Key } from "../interfaces/fetchAllKeys";


export const fetchAllKeys = async():Promise<Key[]> => { 
    const resp = await keyApi.get<FetchAllkeysResponse>('/keys');
    return resp.data.keys;
}
