import { Box, Container, Divider, Paper, Typography } from "@mui/material";
import React, { useContext } from "react";
import { ProjectContext } from "../../App";
import Loading from "../../Components/Utils/Loading";
import { useGetMyOrdersQuery } from "../../Redux/slices/ordersApiSlices";

function MyOrders() {
  const { dispatch, navigator, setOpenAlert } = useContext(ProjectContext);

  const { myOrders, isLoading: isOrdersLoading } = useGetMyOrdersQuery(
    {undefined},
    {
      selectFromResult: ({ data, isLoading }) => ({
        myOrders: data?.order ?? [],
        isLoading,
      }),
    }
  );
  return (
    <div>
      <Container maxWidth="lg">
        <Paper variant="outlined" sx={{ padding: "10px" }}>
          <Box sx={{ margin: "10px" }}>
            <Typography variant="h4" component="h1">
              My Orders
            </Typography>
          </Box>
          <Divider />

          {isOrdersLoading ? (
            <Loading />
          ) : (
            myOrders.map((order, index) => {
              return (
                <Paper variant="outlined" key={index}>
                  <Container>
                    <img src={order.img} alt="" />
                  </Container>
                  <Container>
                    {order?.orderedItems.map((item,index)=>(
                      <div>
                        <img src={item.img} alt="" />
                      </div>
                    ))}
                  </Container>
                </Paper>
              );
            })
          )}
        </Paper>
      </Container>
    </div>
  );
}

export default MyOrders;
