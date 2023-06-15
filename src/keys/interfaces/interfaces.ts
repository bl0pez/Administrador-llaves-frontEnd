export interface KeyState {
    keys: Key[];
    isLoading: boolean;
    error: string;
    activeKey: null | Key;
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
}

export interface User {
    _id:  string;
    name: string;
}

// Generated by https://quicktype.io

