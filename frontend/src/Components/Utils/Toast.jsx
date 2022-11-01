import { Alert, Snackbar } from "@mui/material";
import { useContext } from "react";
import { ProjectContext } from "../../App";


export default function Toast() {

    const { openAlert ,setOpenAlert } = useContext(ProjectContext)
    const {open,message,success} = openAlert
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpenAlert({open:false});
    };
  
    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}  anchorOrigin={{ vertical: 'top',
          horizontal: 'center'}} >
          <Alert onClose={handleClose} severity={success ? "success" : "error"} variant="filled">
            {message}
          </Alert>
        </Snackbar>
    );
  }