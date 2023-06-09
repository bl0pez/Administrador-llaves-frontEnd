import { keyApi } from "../../api/keyApi"
import { FetchAllkeysResponse, FetchPostCreateKey, Key, KeyForm } from "../interfaces/fetchAllKeys";


export const getKeys = async():Promise<Key[]> => { 
    const resp = await keyApi.get<FetchAllkeysResponse>('/keys');
    return resp.data.keys;
}

export const fetchCreateKey = async(key: any):Promise<FetchPostCreateKey> => {

    const formData = new FormData();
    formData.append('name', key.name);
    formData.append('description', key.description);
    formData.append('receivedBy', key.receivedBy);
    formData.append('image', key.image);

    const resp = await keyApi.post<FetchPostCreateKey>('/keys', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return resp.data;
}

export const fetchUpdateKey = async(_id: any, key: any) => {    
    const resp = await keyApi.put<FetchPostCreateKey>(`/keys/${_id}`, key, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

    return resp.data;
    
}
