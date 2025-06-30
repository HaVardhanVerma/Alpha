import {createContext} from 'react';

const initialCtxValue = {
    snackBar: {
        open: false,
        message: '',
        type: 'info',
    },

    showSnackBar: () => {},
    hideSnackBar: () => {},
}

export const SnackbarContext = createContext(initialCtxValue);