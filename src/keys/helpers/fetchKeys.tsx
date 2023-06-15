import { keyApi } from '../../api/keyApi'
import { FetchCreationResult, FetchKey, Key } from '../interfaces/interfaces';


export const fetchGetKey = async():Promise<Key[]> => { 
    const resp = await keyApi.get<FetchKey>('/keys');
    return resp.data.keys;
}

export const fetchCreateKey = async(key: any):Promise<FetchCreationResult> => {

    const formData = new FormData();
    formData.append('name', key.name);
    formData.append('description', key.description);
    formData.append('image', key.image);

    const resp = await keyApi.post<FetchCreationResult>('/keys', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return resp.data;
}

export const fetchUpdateKey = async(_id: string, key: any):Promise<FetchCreationResult> => {    
    const resp = await keyApi.put<FetchCreationResult>(`/keys/${_id}`, key, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });    

    return resp.data;
    
}
