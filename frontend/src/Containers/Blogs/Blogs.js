import {
    Box,
    Typography,
    IconButton,
    Tooltip,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Button,
    TableSortLabel,
  } from "@mui/material";
  
  import VisibilityIcon from "@mui/icons-material/Visibility";
  import EditIcon from "@mui/icons-material/Edit";
  import DeleteIcon from "@mui/icons-material/Delete";
  import { useEffect, useState } from "react";
  import { useNavigate } from "react-router-dom";
  import CheckCircleIcon from "@mui/icons-material/CheckCircle";
  import CancelIcon from "@mui/icons-material/Cancel";
  
  const columns = [
    { id: "title", label: "Title", minWidth: 200, sortable: true },
    {
      id: "status",
      label: "Status",
      minWidth: 100,
      align: "center",
      sortable: false,
    },
    {
      id: "action",
      label: "Action",
      minWidth: 150,
      align: "center",
      sortable: false,
    },
  ];
  
  const Blogs = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rows, setRows] = useState([]);
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("");
  
    useEffect(() => {
      getBlogsData();
    }, []);
  
    const getBlogsData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/blogs");
        const data = await response.json();
  
        const formattedData = data.map((item) => ({
          _id: item._id,
          title: item.name,
          status: Boolean(item.status),
          slug: item.slug,
        }));
  
        setRows(formattedData.reverse());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
  
    const toggleStatus = async (index, id, currentStatus) => {
      try {
        const updatedStatus = !currentStatus;
  
        const response = await fetch(`http://localhost:5000/api/blogs/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: updatedStatus }),
        });
  
        if (response.ok) {
          setRows((prevRows) => {
            const updatedRows = [...prevRows];
            updatedRows[index].status = updatedStatus;
            return updatedRows;
          });
        } else {
          console.error("Failed to update status");
        }
      } catch (error) {
        console.error("Error updating status:", error);
      }
    };
  
    const handleDelete = async (id) => {
      if (!id) {
        console.error("ID is undefined");
        return;
      }
  
      if (!window.confirm("Are you sure you want to delete this blogs item?")) {
        return;
      }
  
      try {
        const response = await fetch(`http://localhost:5000/api/blogs/${id}`, {
          method: "DELETE",
        });
  
        if (response.ok) {
          setRows((prevRows) => prevRows.filter((row) => row._id !== id));
        } else {
          console.error("Failed to delete the blogs item");
        }
      } catch (error) {
        console.error("Error deleting blogs item:", error);
      }
    };
  
    const handleView = (slug) => {
      if (!slug) {
        console.error("Slug is undefined");
        return;
      }
      window.open(`/blogs/${slug}`, "_blank");
    };
  
    return (
      <Box style={{ padding: "20px" }}>
        <Typography style={{ fontSize: "20px", fontWeight: "600" }}>
          Blogs
        </Typography>
        <Box style={{ margin: "20px 0px" }}>
          <Box
            display="flex"
            justifyContent="flex-end"
            style={{ margin: "10px 0px" }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/blogsmodal")}
            >
              Add Blogs
            </Button>
          </Box>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{
                        minWidth: column.minWidth,
                        background: "#e3dcdc",
                        fontWeight: "bold",
                        padding: "10px",
                      }}
                    >
                      {column.sortable ? (
                        <TableSortLabel
                          active={orderBy === column.id}
                          direction={orderBy === column.id ? order : "asc"}
                          onClick={() => {}}
                        >
                          {column.label}
                        </TableSortLabel>
                      ) : (
                        column.label
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ padding: "10px 5px" }}
                          >
                            {column.id === "status" ? (
                              <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                sx={{
                                  backgroundColor: value
                                    ? "#0b970ba8"
                                    : "#e35454",
                                  color: "white",
                                  borderRadius: "30px",
                                  padding: "4px",
                                  minWidth: "100px",
                                }}
                              >
                                <Typography variant="body2" fontWeight="bold">
                                  {value ? "Active" : "Inactive"}
                                </Typography>
                                <Switch
                                  size="small"
                                  checked={value}
                                  onChange={() =>
                                    toggleStatus(index, row._id, row.status)
                                  }
                                  sx={{
                                    "& .MuiSwitch-switchBase.Mui-checked": {
                                      color: "white",
                                    },
                                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                                      {
                                        backgroundColor: "white",
                                      },
                                  }}
                                />
                              </Box>
                            ) : column.id === "action" ? (
                              <>
                                <IconButton
                                  onClick={() => handleView(row.slug)}
                                  style={{ color: "black" }}
                                >
                                  <Tooltip title="View" placement="top">
                                    <VisibilityIcon />
                                  </Tooltip>
                                </IconButton>
                                <IconButton
                                  onClick={() =>
                                    navigate(`/blogsmodal/${row._id}`)
                                  }
                                  style={{ color: "black" }}
                                >
                                  <Tooltip title="Edit" placement="top">
                                    <EditIcon />
                                  </Tooltip>
                                </IconButton>
                                <IconButton
                                  onClick={() => handleDelete(row._id)}
                                  style={{ color: "black" }}
                                >
                                  <Tooltip title="Delete" placement="top">
                                    <DeleteIcon />
                                  </Tooltip>
                                </IconButton>
                              </>
                            ) : (
                              value
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </Box>
    );
  };
  
  export default Blogs;
  