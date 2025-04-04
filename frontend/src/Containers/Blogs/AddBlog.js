import { useNavigate, useParams } from "react-router-dom";
import slugify from "slugify";
import {
  Box,
  Button,
  Typography,
  TextField,
  Grid,
  Select,
  MenuItem,
  Tooltip,
} from "@mui/material";

import { useState, useEffect } from "react";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import dayjs from "dayjs";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function AddBlog() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [publishDate, setPublishDate] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState("");

  const [blog, setBlog] = useState({
    name: "",
    status: false,
    createdAt: "",
    slug: "",
    seotitle: "",
    description: "",
    metaKeywords: "",
    schema: "",
  });

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/api/blogs/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setBlog({
            name: data.name,
            status: Boolean(data.status),
            createdAt: data.createdAt,
            slug: data.slug,
            seotitle: data.seotitle,
            description: data.description || "",
            metaKeywords: data.metaKeywords || "",
            schema: data.schema || "",
          });
          setPublishDate(dayjs(data.createdAt));
        })
        .catch((error) => console.error("Error fetching blog:", error));
    }
  }, [id]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setBlog((prevBlog) => ({
      ...prevBlog,
      [name]: value,
      slug: name === "name" ? slugify(value, { lower: true, strict: true }) : prevBlog.slug,
    }));
  };

  const handleStatusChange = (event) => {
    setBlog({
      ...blog,
      status: event.target.value === "true",
    });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const img = new Image();
      img.src = URL.createObjectURL(file);

      img.onload = () => {
        if (img.width === 1200 && img.height === 630) {
          setSelectedImage(file);
          setError("");
        } else {
          setError("Image must be exactly 1200x630 pixels.");
          setSelectedImage(null);
        }
      };
    }
  };

  const handleDescriptionChange = (content) => {
    setBlog((prevBlog) => ({ ...prevBlog, description: content }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", blog.name);
    formData.append("slug", blog.slug || slugify(blog.name, { lower: true }));
    formData.append("seotitle", blog.seotitle);
    formData.append("description", blog.description);
    formData.append("date", publishDate ? publishDate.toISOString() : new Date().toISOString());
    formData.append("schema", blog.schema || "");
    formData.append("status", blog.status);
    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    try {
      const response = await fetch(`http://localhost:5000/api/blogs${id ? `/${id}` : ""}`, {
        method: id ? "PUT" : "POST",
        body: formData,
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Invalid JSON response from server.");
      }

      const res_data = await response.json();
      if (response.ok) {
        alert(`Blog ${id ? "updated" : "added"} successfully`);
        navigate(-1);
      } else {
        alert(res_data.message || "Error submitting blog.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Check the console for details.");
    }
  };

  return (
    <Box style={{ padding: "20px" }}>
      <Box style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
        <Tooltip title="Back" placement="top">
          <KeyboardBackspaceIcon onClick={() => navigate(-1)} style={{ fontSize: "30px", cursor: "pointer" }} />
        </Tooltip>
        <Typography style={{ marginLeft: "10px" }} variant="h6" fontWeight={600}>
          {id ? "Edit Blog" : "Add Blog"}
        </Typography>
      </Box>

      <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={8}>
            <Typography>Name</Typography>
            <TextField required name="name" size="small" fullWidth value={blog.name} onChange={handleInput} />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <Typography>Status</Typography>
            <Select fullWidth size="small" value={blog.status.toString()} onChange={handleStatusChange}>
              <MenuItem value="true">Enable</MenuItem>
              <MenuItem value="false">Disable</MenuItem>
            </Select>
          </Grid>

          <Grid item xs={12}>
            <Typography>Description</Typography>
            <ReactQuill value={blog.description} onChange={handleDescriptionChange} theme="snow" style={{ height: "200px" }} />
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography>Publish Date</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker value={publishDate} onChange={setPublishDate} />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography>Upload Image (1200x630px)</Typography>
            <TextField type="file" fullWidth inputProps={{ accept: "image/*" }} onChange={handleImageUpload} />
            {error && <Typography color="error">{error}</Typography>}
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography>Slug</Typography>
            <TextField required name="slug" size="small" fullWidth value={blog.slug} onChange={handleInput} />
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography>SEO Title</Typography>
            <TextField required name="seotitle" size="small" fullWidth value={blog.seotitle} onChange={handleInput} />
          </Grid>

          <Grid item xs={12}>
            <Typography>Meta Keywords</Typography>
            <TextField name="metaKeywords" size="small" fullWidth value={blog.metaKeywords} onChange={handleInput} />
          </Grid>

          <Grid item xs={12}>
            <Typography>Schema</Typography>
            <TextField name="schema" size="small" fullWidth value={blog.schema} onChange={handleInput} />
          </Grid>
        </Grid>
      </Box>

      <Box style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
      <Button
  style={{ width: "200px", background: "green", color: "#fff" }}
  onClick={handleSubmit}
>
  {id ? "Update" : "Save"}
</Button>
      </Box>
    </Box>
  );
}

export default AddBlog;
