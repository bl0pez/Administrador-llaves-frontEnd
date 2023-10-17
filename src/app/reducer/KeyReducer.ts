import {
  EReducerTypes,
  IGetAllKeys,
  IKey,
  IKeyStateReducer,
} from "../interfaces";

type KeyAction =
  | { type: EReducerTypes.LOAD_KEYS; payload: IGetAllKeys }
  | { type: "onSetActiveKey"; payload: IKey }
  | { type: "onSetInactiveKey" }
  | { type: EReducerTypes.ADD_KEY; payload: IKey }
  | { type: "updateKey"; payload: IKey }
  | { type: "deleteKey"; payload: { id: string } }
  | { type: "setError"; payload: string }
  | { type: "changeStatus"; payload: string };

// En los reducer siempre se debe de retornar un nuevo estado
// y no una mutación del estado anterior
export const keyReducer = (
  stateKeys: IKeyStateReducer,
  action: KeyAction
): IKeyStateReducer => {
  switch (action.type) {
    case EReducerTypes.LOAD_KEYS: {
      return {
        keys: action.payload.keys,
        count: action.payload.count,
        isLoading: true,
      };
    }
    case EReducerTypes.ADD_KEY: {
      return {
        keys: [action.payload, ...stateKeys.keys],
        count: stateKeys.count + 1,
        isLoading: true,
      };
    }
    // case "onSetActiveKey": {
    //     return {
    //         ...stateKeys,
    //         activeKey: action.payload,
    //     }
    // }
    // case "onSetInactiveKey": {
    //     return {
    //         ...stateKeys,
    //         activeKey: null,
    //     }
    // }
    // case "updateKey": {
    //     return {
    //         ...stateKeys,
    //         keys: stateKeys.keys.map(key => key._id === action.payload._id ? action.payload : key),
    //         isLoading: true,
    //         error: ""
    //     }
    // }
    // case "deleteKey": {
    //     return {
    //         ...stateKeys,
    //         keys: stateKeys.keys.filter(key => key._id !== action.payload.id),
    //     }
    // }
    // case "changeStatus": {
    //     return {
    //         ...stateKeys,
    //         keys: stateKeys.keys.map(key => key._id === action.payload ? { ...key, status: !key.status } : key),
    //         isLoading: true,
    //     }
    // }
    // case "setError": {
    //     return {
    //         ...stateKeys,
    //         error: action.payload,
    //         isLoading: true
    //     }
    // }
    default:
      return stateKeys;
  }
};
