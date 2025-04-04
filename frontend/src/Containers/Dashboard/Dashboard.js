import {
    Box,
    Grid,
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
    TableSortLabel,
  } from "@mui/material";
  import NewspaperIcon from "@mui/icons-material/Newspaper";
  import VisibilityIcon from "@mui/icons-material/Visibility";
  import EditIcon from "@mui/icons-material/Edit";
  import DeleteIcon from "@mui/icons-material/Delete";
  import { useState } from "react";
  
  const columns = [
    { id: "type", label: "Types", minWidth: 100, sortable: true },
    { id: "title", label: "Title", minWidth: 200, sortable: true },
    { id: "status", label: "Status", minWidth: 100, align: "center" },
    { id: "action", label: "Action", minWidth: 150, align: "center" },
  ];
  
  function createData(type, title, status) {
    return { type, title, status };
  }
  
  const initialRows = [
    createData("News", "Ministry of Indian Education", true),
    createData("Events", "Jain Events", true),
    createData("News", "Jain Top News", true),
    createData("Events", "Jain Education Seminar", false),
  ];
  
  const Dashboard = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rows, setRows] = useState(initialRows);
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("");
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
  
    const toggleStatus = (index) => {
      setRows((prevRows) => {
        const updatedRows = [...prevRows];
        updatedRows[index].status = !updatedRows[index].status;
        return updatedRows;
      });
    };
  
    const handleRequestSort = (property) => {
      const isAsc = orderBy === property && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(property);
  
      const sortedRows = [...rows].sort((a, b) => {
        if (a[property] < b[property]) return isAsc ? -1 : 1;
        if (a[property] > b[property]) return isAsc ? 1 : -1;
        return 0;
      });
  
      setRows(sortedRows);
    };
  
    return (
      <Box style={{ padding: "20px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={4} xl={4}>
            <Box
              sx={{
                boxShadow: 3,
                p: 2,
                borderRadius: 2,
                background:
                  "linear-gradient(114deg, rgba(218,226,248,1) 0%, rgba(214,164,164,1) 67%)",
                display: "inline-block",
                width: "100%",
              }}
            >
              <Typography>Total News Uploaded</Typography>
              <Box style={{ display: "flex", justifyContent: "space-between" }}>
                <NewspaperIcon style={{ fontSize: "50px", color: "#fff" }} />
                <Typography
                  style={{
                    fontSize: "28px",
                    fontWeight: "600",
                  }}
                >
                  6965
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={4} xl={4}>
            <Box
              sx={{
                boxShadow: 3,
                p: 2,
                borderRadius: 2,
                background:
                  "linear-gradient(114deg, rgba(131,164,212,1) 0%, rgba(182,251,255,1) 67%)",
                display: "inline-block",
                width: "100%",
              }}
            >
              <Typography>Total Events Uploaded</Typography>
              <Box style={{ display: "flex", justifyContent: "space-between" }}>
                <NewspaperIcon style={{ fontSize: "50px", color: "#fff" }} />
                <Typography
                  style={{
                    fontSize: "28px",
                    fontWeight: "600",
                  }}
                >
                  98787
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={4} xl={4}>
            <Box
              sx={{
                boxShadow: 3,
                p: 2,
                borderRadius: 2,
                background:
                  "linear-gradient(90deg, rgba(107,237,157,1) 0%, rgba(248,255,174,1) 100%)",
                display: "inline-block",
                width: "100%",
              }}
            >
              <Typography>Total Blogs Uploaded</Typography>
              <Box style={{ display: "flex", justifyContent: "space-between" }}>
                <NewspaperIcon style={{ fontSize: "50px", color: "#fff" }} />
                <Typography
                  style={{
                    fontSize: "28px",
                    fontWeight: "600",
                  }}
                >
                  9875
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Box style={{ margin: "20px 0px" }}>
          <Typography style={{ fontWeight: "600" }}>Recently Uploaded</Typography>
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
                      }}
                    >
                      {column.sortable ? (
                        <TableSortLabel
                          active={orderBy === column.id}
                          direction={orderBy === column.id ? order : "asc"}
                          onClick={() => handleRequestSort(column.id)}
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
                          <TableCell key={column.id} align={column.align}>
                            {column.id === "status" ? (
                              <Box
                                sx={{
                                  display: "inline-block",
                                  padding: "0px 5px",
                                  borderRadius: "30px",
                                  backgroundColor: value
                                    ? "#0b970ba8"
                                    : "#e35454",
                                  color: "white",
                                }}
                              >
                                <Switch
                                  size="small"
                                  checked={value}
                                  onChange={() => toggleStatus(index)}
                                />
                                {value ? "Active" : "Inactive"}
                              </Box>
                            ) : column.id === "action" ? (
                              <>
                                <IconButton style={{ color: "black" }}>
                                  <Tooltip title="View" placement="top">
                                    <VisibilityIcon />
                                  </Tooltip>
                                </IconButton>
                                <IconButton style={{ color: "black" }}>
                                  <Tooltip title="Edit" placement="top">
                                    <EditIcon />
                                  </Tooltip>
                                </IconButton>
                                <IconButton style={{ color: "black" }}>
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
  
  export default Dashboard;
  