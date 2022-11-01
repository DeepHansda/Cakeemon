import React, { Fragment,useContext,useEffect,useState } from 'react'
import { getUsers } from '../../../Redux/Actions/UserActions';
import {
    Box,
    Button,
    Container,
    IconButton,
    Modal,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
  } from "@mui/material";
import Loading from '../../../Components/Utils/Loading';
import OrdersModal from '../Orders/OrdersModal';
import Toast from '../../../Components/Utils/Toast';
import { FiEye, FiTrash2 } from 'react-icons/fi';
import { userColumns } from '../../../Components/Utils/Data';
import { useSelector } from 'react-redux';
import { ProjectContext } from '../../../App';
import UsersModal from './UsersModal';






function Customers() {
    const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { dispatch, navigator,setOpenAlert } = useContext(ProjectContext);
  const [openModal, setOpenModal] = useState(false);
  const [userId,setUserId] = useState('')

  const { loading,users } = useSelector((state) => state.allUsers);
  const { isDeleted,message} = useSelector((state) => state.deleteUser);
  console.log(users)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleModal = (id) => {
    setOpenModal(true)
    setUserId(id)
  }

  const handleViewDetails = (id) => {
    navigator(`/admin/orderDetails/${id}`)
  }

  
  useEffect(() => {
    dispatch(getUsers());
  }, []);

  useEffect(() => {
    if(isDeleted && isDeleted.success==1){
      dispatch(getUsers());
      setOpenAlert({open:true,message:message && message,success:true})
    }
  }, [isDeleted]);
  return (
    <Fragment>
    {loading && <Loading />}
    <UsersModal openModal={openModal} setOpenModal={setOpenModal} userId={userId} dispatch={dispatch}/>
    <Toast/>
    <Container maxWidth="lg">
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {userColumns.map((column) => (
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
              {users &&
                users
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={user._d}
                      >
                        

                        <TableCell>{user._id}</TableCell>
                        <TableCell sx={{ textTransform: "capitalize" }}>
                          {user.full_name || "--"}{" "}
                        </TableCell>
                        <TableCell>
                          {user.mobile_number || "--"}{" "}
                        </TableCell>
                        <TableCell>
                          {user.email || "--"}{" "}
                        </TableCell>
                        <TableCell>
                          {user.role || "--"}{" "}
                        </TableCell>
                        <TableCell>
                          {user.createdAt || "--"}{" "}
                        </TableCell>
                        
                        
                        <TableCell>
                          <IconButton
                            aria-label="delete"
                            size="small"
                            color="error"
                            onClick={() => handleModal(user._id)}
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
          count={users && users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Container>
  </Fragment>
  )
}

export default Customers