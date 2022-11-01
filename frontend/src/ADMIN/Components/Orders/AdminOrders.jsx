import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import {
  Box,
  Button,
  Container,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import { ProjectContext } from "../../../App";
import { getOrders } from "../../../Redux/Actions/OrderActions";
import { useSelector } from "react-redux";
import { useContext } from "react";
import { useEffect } from "react";
import { columns } from "../../../Components/Utils/Data";
import { FiEye, FiList, FiTrash2, FiX } from "react-icons/fi";
import { Fragment } from "react";
import { useState } from "react";
import OrdersModal from "./OrdersModal";
import Toast from "../../../Components/Utils/Toast";
import Loading from "../../../Components/Utils/Loading";


export const AdminOrders = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { dispatch, navigator,setOpenAlert } = useContext(ProjectContext);
  const [openModal, setOpenModal] = useState(false);
  const [orderId,setOrderId] = useState('')

  const { orders, loading } = useSelector((state) => state.allOrders);
  const { isDeleted } = useSelector((state) => state.deleteOrder);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleModal = (id) => {
    setOpenModal(true)
    setOrderId(id)
  }

  const handleViewDetails = (id) => {
    navigator(`/admin/orderDetails/${id}`)
  }

  
  useEffect(() => {
    dispatch(getOrders());
  }, []);

  useEffect(() => {
    if(isDeleted && isDeleted.success==1){
      dispatch(getOrders());
      setOpenAlert({open:true,message:isDeleted && isDeleted.message,success:true})
    }
  }, [isDeleted]);
  return (
    <Fragment>
      {loading && <Loading />}
      <OrdersModal openModal={openModal} setOpenModal={setOpenModal} orderId={orderId} dispatch={dispatch}/>
      <Toast/>
      <Container maxWidth="lg">
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {orders &&
                  orders
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((order) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={order._d}
                        >
                          <TableCell>
                            <Button startIcon={<FiEye />} size="small"
                            onClick={()=>handleViewDetails(order._id)}
                            >
                              View More
                            </Button>
                          </TableCell>

                          <TableCell>{order._id}</TableCell>
                          <TableCell sx={{ textTransform: "capitalize" }}>
                            {order.createdBy.full_name || "--"}{" "}
                          </TableCell>
                          <TableCell>
                            {order.createdBy.mobile_number || "--"}{" "}
                          </TableCell>
                          <TableCell>
                            {order.createdBy.email || "--"}{" "}
                          </TableCell>
                          <TableCell>
                            {order.paymentInfo.receipt || "--"}{" "}
                          </TableCell>
                          <TableCell>
                            {order.paymentInfo.status || "--"}{" "}
                          </TableCell>
                          <TableCell>
                            {order.shippingCharges || "--"}{" "}
                          </TableCell>
                          <TableCell>{order.totalPrice || "--"} </TableCell>
                          <TableCell>{order.orderStatus || "--"} </TableCell>
                          <TableCell>{order.deliveryDate || "--"} </TableCell>
                          <TableCell>{order.deliveredAt || "--"} </TableCell>
                          <TableCell>
                            <IconButton
                              aria-label="delete"
                              size="small"
                              color="error"
                              onClick={() => handleModal(order._id)}
                            >
                              <FiTrash2 />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={orders && orders.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Container>
    </Fragment>
  );
};
