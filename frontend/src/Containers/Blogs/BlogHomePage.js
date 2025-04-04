import React from 'react';
import { Box, Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Switch } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import { useNavigate } from 'react-router-dom';

const blogs = [
  { id: 1, title: "BSc Hons Physics Syllabus: Year-Wise Breakdown & Subjects Overview", type: "Blogs", status: true },
  { id: 2, title: "BSc Physics Syllabus and Subjects: Complete Semester-Wise Breakdown & Course Details", type: "Blogs", status: true },
  { id: 3, title: "BSc Hons Maths: Syllabus, Subjects, Eligibility & Career Scope", type: "Blogs", status: true },
  { id: 4, title: "BSc Maths Syllabus: Complete Semester-Wise Subjects & Course Details", type: "Blogs", status: true },
  { id: 5, title: "Career Options After BSc Maths: Jobs, Salary & Higher Study Opportunities", type: "Blogs", status: true },
];

const BlogHomePage = () => {
  const navigate = useNavigate();
  const [blogList, setBlogList] = React.useState(blogs);

  const handleView = (title) => {
    const formattedTitle = title.replace(/\s+/g, '-').toLowerCase();
    window.open(`/blog/${formattedTitle}`, '_blank');
  };

  const handleEdit = (id) => {
    navigate(`/edit-blog/${id}`);
  };

  const handleDelete = (id) => {
    const updatedBlogs = blogList.filter(blog => blog.id !== id);
    setBlogList(updatedBlogs);
  };

  return (
    <Box sx={{ padding: 2 }}>
     {/* Add Blog Button */}
     <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 2 }}>
        <Button variant="contained" color="primary" onClick={() => navigate('/add-blog')}>
          + Add New
        </Button>
      </Box>

      {/* Table Section */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sort</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Types</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>View</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blogList.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell>
                  <DragHandleIcon sx={{ cursor: 'grab' }} />
                </TableCell>
                <TableCell>{blog.title}</TableCell>
                <TableCell>{blog.type}</TableCell>
                <TableCell>
                  <Switch defaultChecked={blog.status} color="success" />
                </TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleView(blog.title)}>
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton color="success" onClick={() => handleEdit(blog.id)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton color="error" onClick={() => handleDelete(blog.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default BlogHomePage;