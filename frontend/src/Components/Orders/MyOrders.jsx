import { Box, Container, Divider, Paper, Typography } from '@mui/material';
import React, { useContext, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { ProjectContext } from '../../App';
import { getMyOrders } from '../../Redux/Actions/OrderActions';

function MyOrders() {
  const {dispatch, navigator ,setOpenAlert} = useContext(ProjectContext);

    useEffect(() => {
        dispatch(getMyOrders())
    },[])
  const {myOrders} = useSelector((state) => state.myOrders)
  return (
    <div>
       <Container maxWidth="lg">
        <Paper variant="outlined" sx={{ padding: "10px" }}>
            <Box sx={{ margin:'10px'}}>
              <Typography variant="h4" component="h1">
                My Orders
              </Typography>
            </Box>
            <Divider/>
{ myOrders.map((order, index)=>{
  return (
    <Paper variant="outlined" key={index}>
    <Container>
      <img src={order.img} alt="" />
    </Container>
  </Paper>
  )
})}
           
        </Paper>
       </Container>
    </div>
  )
}

export default MyOrders