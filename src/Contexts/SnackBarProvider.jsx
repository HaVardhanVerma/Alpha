import {useRef, useState, useCallback, useMemo} from 'react';
import PropTypes from 'prop-types';

import SnackBar from '../Components/SnackBar';
import { SnackbarContext } from './SnackBarContext';

const SnackBarProvider = ({children}) => {

    const [snackBar, setSnackBar] = useState({
        open: false,
        message: '',
        type: 'info',
    });

    const timeoutRef = useRef();

    // show Snackbar

    const showSnackBar = useCallback(({message, type = 'info', timeOut = 5000}) => {
        // Clear any existing timeout to prevent overlap
        if(timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        setSnackBar({
            open: true,
            message,
            type,
        });

        timeoutRef.current = setTimeout(() => {
            setSnackBar((prev) => {
                return {
                    ...prev, open: false
                }
            });
        }, timeOut);
        
    }, []);

    // Hide Snackbar manually if needed
    const hideSnackBar = useCallback(() => {
        // Clear any existing timeout to prevent overlap

        if(timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        setSnackBar({open: false, message: '', type: 'info'});
    }, []);

    const contextValue = useMemo(() => {
        return {showSnackBar, hideSnackBar}
    }, [showSnackBar, hideSnackBar]);

    return (
        <SnackbarContext.Provider value={contextValue}>
            {children}
            <SnackBar snackBar={snackBar}/>
        </SnackbarContext.Provider>
    )
}

SnackBarProvider.propTypes = {
    children: PropTypes.any,
}

export default SnackBarProvider; 