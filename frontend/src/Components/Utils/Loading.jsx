
import { Backdrop, Box, CircularProgress } from '@mui/material'
import React from 'react'

function Loading() {
  return (
    <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, 'background':'rgba(0, 0, 0, 0.2)',
        backdropFilter:'blur(10px)',}}
        open={true}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
  )
}

export default Loading