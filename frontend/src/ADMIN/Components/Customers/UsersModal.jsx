import React from 'react'
import {
    Box,
    Button,
    Container,
    IconButton,
    Modal,
    Typography,
  } from "@mui/material";
import { FiEye, FiList, FiTrash2, FiX } from "react-icons/fi";
import { deleteOrder } from '../../../Redux/Actions/OrderActions';
import { deleteUser } from '../../../Redux/Actions/UserActions';




function UsersModal({openModal,setOpenModal,userId,dispatch}) {
    
    const handleDelete = () => {
        dispatch(deleteUser(userId));
        setOpenModal(false)
    }
  return (
    <Modal open={openModal} onClose={() => setOpenModal(false)}  aria-describedby="modal-modal-description">
        <Container sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
             Are You Sure To Delete ?
            </Typography>
        <Box sx={{display: 'flex',justifyContent:'space-between',width:'230px',mt:1}}>
            <Button color="error" variant="outlined" startIcon={<FiTrash2 />} onClick={()=>handleDelete()}>Delete</Button>
            <Button startIcon={<FiX />} color="success" variant="outlined" onClick={()=>setOpenModal(false)}>Cancel</Button>
          </Box>
        </Container>
          
        </Modal>
  )
}

export default UsersModal