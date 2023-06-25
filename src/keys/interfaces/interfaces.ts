//Inteface del stado del reducer de llaves
export interface KeyState {
    keys: Key[];
    isLoading: boolean;
    error: string;
    activeKey: null | Key;
}

//Inteface del stado del reducer de llaves prestadas
export interface BorrowrdKeyState {
    borrowedKeys: BorrowedKey[];
    isLoading: boolean;
    error: boolean;
}

// Generated by https://quicktype.io

export interface FetchKey {
    ok:   boolean;
    msg:  string;
    keys: Key[];
}

export interface FetchCreationResult {
    ok:  boolean;
    key: Key;
    msg: string;
}


export interface Key {
    _id:         string;
    name:        string;
    description: string;
    image:       string;
    user?:        User;
    createdAt:   string;
    updatedAt:   string;
    status:      boolean;
}

export interface User {
    _id:  string;
    name: string;
}

export interface KeyHistory {
    msg:   string;
    ok:    boolean;
    keys:  BorrowedKey[];
    count: number;
}


//Intefaces de prestamo de llaves
export interface BorrowedKeys {
    msg:          string;
    borrowedKeys: BorrowedKey[];
}

export interface ResBorrowedKey {
    msg:          string;
    borrowedKey: BorrowedKey;
}

export interface BorrowedKey {
    _id:         string;
    key:         Key;
    operator:    string;
    requestedBy: string;
    service:     string;
    status:      boolean;
    createdAt:   string;
    updatedAt:   string;
}

export interface BorrowedKeyForm {
    key:         string;
    operator:    string;
    requestedBy: string;
    service:     string;
}

export interface Key {
    _id:  string;
    name: string;
}


//Interfaces para los children de los providers
export interface ChildrenProps {
    children: JSX.Element | JSX.Element[];
}
