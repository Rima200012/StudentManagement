import { Snackbar } from '@mui/material';
import { Alert } from '@mui/lab';
import React from 'react';





export default function Notification(props) {
    const {notify, setNotify} = props;
    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setNotify({
            ...notify,
            isOpen: false
        });
    };

    

  return (
    
        <Snackbar
         open = {notify.isOpen}
         autoHideDuration={3000}
         anchorOrigin={{vertical: 'top', horizontal: 'right'}}
         onClose={handleClose}
         >
            <Alert severity={notify.type}
                   onClose={handleClose}>

                {String(notify.message)}

            </Alert>
        </Snackbar>

      
    
  )
};
