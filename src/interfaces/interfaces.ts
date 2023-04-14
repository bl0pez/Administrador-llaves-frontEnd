export interface Key {
    _id:         string;
    createdAt:   string;
    description: string;
    name:        string;
    receivedBy:  string;
    updatedAt:   string;
}

export interface KeyState{
    keys: Key[];
    keysFiltered: Key[];
    isLoading: boolean;
    error: string;
}

export interface ModalState{
    showModal: boolean;
}