// Generated by https://quicktype.io

export interface FetchAllkeysResponse {
    keys: Key[];
}// Generated by https://quicktype.io

export interface FetchPostCreateKey {
    ok:           boolean;
    msg:          string;
    key: Key;
}


export interface Key  extends KeyForm{
    _id:        string;
    createdAt:  string;
    updatedAt:  string;
}

export interface KeyForm {
    name:        string;
    description: string;
    receivedBy:  string;
    image:      File | null;
}


