import { useNavigate } from "react-router-dom";
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
import { Editor } from "@tinymce/tinymce-react";
import { useRef, useState, useEffect } from "react";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AddBlogsModal = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get blogs ID from the URL
  const editorRef = useRef(null);
  const [publishDate, setPublishDate] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState("");

  const [user, setUser] = useState({
    name: "",
    status: false, // Default to Boolean false
    createdAt: "",
    slug: "",
    seotitle: "",
    description: "",
  });
  const handleDescriptionChange = (content) => {
    setUser((prevUser) => ({ ...prevUser, description: content }));
  };
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/api/blogs/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setUser({
            name: data.name,
            status: Boolean(data.status),
            createdAt: data.createdAt,
            slug: data.slug,
            seotitle: data.seotitle,
            description: data.description || "", // Ensure description is set
          });
          setPublishDate(dayjs(data.createdAt));
        })
        .catch((error) => console.error("Error fetching blogs:", error));
    }
  }, [id]);

  // Handle text field changes
  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
      slug:
        name === "name"
          ? slugify(value, { lower: true, strict: true })
          : prevUser.slug,
    }));
  };

  // Handle status change
  const handleStatusChange = (event) => {
    setUser({
      ...user,
      status: event.target.value === "true", // Convert string to Boolean
    });
  };

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const img = new Image();
      img.src = URL.createObjectURL(file);

      img.onload = () => {
        if (img.width === 1200 && img.height === 630) {
          setSelectedImage(URL.createObjectURL(file));
          setError("");
        } else {
          setError("Image must be exactly 1200x630 pixels.");
          setSelectedImage(null);
        }
      };
    }
  };

  // // Handle form submission
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!user.name) {
  //     alert("Name is required");
  //     return;
  //   }

  //   const updatedUser = {
  //     ...user,
  //     slug: user.slug.trim()
  //       ? user.slug
  //       : slugify(user.name, { lower: true, strict: true }), // Generate slug if empty
  //     createdAt: publishDate ? publishDate.toISOString() : "",
  //   };

  //   try {
  //     const response = await fetch("http://localhost:5000/api/blogs", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(updatedUser),
  //     });

  //     if (response.ok) {
  //       alert("Blogs added successfully");
  //       navigate(-1); // Go back after successful submission
  //     } else {
  //       const res_data = await response.json();
  //       alert(res_data.extraDetails || res_data.message);
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user.name) {
      alert("Name is required");
      return;
    }

    const updatedUser = {
      ...user,
      slug: user.slug.trim()
        ? user.slug
        : slugify(user.name, { lower: true, strict: true }),
      createdAt: publishDate ? publishDate.toISOString() : "", // Ensure ISO format
    };

    try {
      const response = await fetch(
        `http://localhost:5000/api/blogs/${id ? id : ""}`,
        {
          method: id ? "PUT" : "POST", // Use PUT for update, POST for create
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        }
      );

      if (response.ok) {
        alert(`Blogs ${id ? "updated" : "added"} successfully`);
        navigate(-1);
      } else {
        const res_data = await response.json();
        alert(res_data.extraDetails || res_data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Box style={{ padding: "20px" }}>
      <Box
        style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}
      >
        <Tooltip title="Back" placement="top">
          <KeyboardBackspaceIcon
            onClick={() => navigate(-1)}
            style={{ fontSize: "30px", cursor: "pointer" }}
          />
        </Tooltip>
        <Typography
          style={{ marginLeft: "10px" }}
          variant="h6"
          fontWeight={600}
        >
          {id ? "Edit Blogs" : "Add Blogs"}
        </Typography>
      </Box>

      <Box component="form" noValidate autoComplete="off">
        <Grid container spacing={2}>
          {/* Name Field */}
          <Grid item xs={12} md={6} lg={8}>
            <Typography style={{ marginLeft: "8px" }}>Name</Typography>
            <TextField
              required
              name="name"
              size="small"
              fullWidth
              value={user.name}
              onChange={handleInput}
            />
          </Grid>

          {/* Status Dropdown */}
          <Grid item xs={12} md={6} lg={4}>
            <Typography style={{ marginLeft: "8px" }}>Status</Typography>
            <Select
              fullWidth
              size="small"
              id="demo-simple-select"
              value={user.status.toString()} // Convert Boolean to string for UI
              onChange={handleStatusChange}
            >
              <MenuItem value="true">Enable</MenuItem>
              <MenuItem value="false">Disable</MenuItem>
            </Select>
          </Grid>

          {/* Rich Text Editor */}
          <Grid item xs={12} md={6} lg={8}>
            <Typography style={{ marginLeft: "8px", marginBottom: "5px" }}>
              Description
            </Typography>
            {/* <Editor
              apiKey="f2bkn5vty8t3wupos69jcuu2qlulad5cbg7jdmnun17slksq"
              onInit={(evt, editor) => (editorRef.current = editor)}
              value={user.description} // Use state value
              onEditorChange={(content) =>
                setUser((prevUser) => ({
                  ...prevUser,
                  description: content, // No need to remove HTML tags
                }))
              }
              init={{
                height: 400,
                menubar: true,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | " +
                  "bold italic backcolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
              }}
            /> */}
            <ReactQuill
              value={user.description}
              onChange={handleDescriptionChange}
              theme="snow"
              style={{ height: "345px" }}
            />
            <style>
              {`
    .ql-container {
      min-height: 150px;
      max-height: 400px;
      overflow-y: auto;
    }
  `}
            </style>
          </Grid>

          {/* Publish Date */}
          <Grid item xs={12} md={6} lg={4}>
            <Typography>Publish Date</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={publishDate}
                onChange={(newValue) => {
                  console.log("New Date Selected:", newValue); // Debugging log
                  setPublishDate(newValue); // Ensure state updates properly
                }}
                renderInput={(params) => (
                  <TextField {...params} fullWidth size="small" />
                )}
              />
            </LocalizationProvider>

            <Typography style={{ paddingTop: "20px" }}>
              Upload Image (1200x630px)
            </Typography>
            <TextField
              style={{ padding: "10px 0px" }}
              type="file"
              fullWidth
              inputProps={{ accept: "image/*" }}
              onChange={handleImageUpload}
            />
            {error && <Typography color="error">{error}</Typography>}
            {selectedImage && (
              <Box
                component="img"
                src={selectedImage}
                alt="Uploaded Preview"
                sx={{
                  width: 320,
                  height: 200,
                  objectFit: "cover",
                  marginTop: 2,
                }}
              />
            )}
          </Grid>

          {/* Image Upload */}
          {/* <Grid item xs={12} md={6} lg={4}>
            <Typography>Upload Image (1200x630px)</Typography>
            <TextField
              type="file"
              fullWidth
              inputProps={{ accept: "image/*" }}
              onChange={handleImageUpload}
            />
            {error && <Typography color="error">{error}</Typography>}
            {selectedImage && (
              <Box
                component="img"
                src={selectedImage}
                alt="Uploaded Preview"
                sx={{
                  width: 1200,
                  height: 630,
                  objectFit: "cover",
                  marginTop: 2,
                }}
              />
            )}
          </Grid> */}

          {/* Slug & SEO Title */}
          <Grid item xs={12} md={6} lg={6} style={{ paddingTop: "55px" }}>
            <Typography>Slug</Typography>
            <TextField
              required
              name="slug"
              size="small"
              fullWidth
              value={user.slug}
              onChange={handleInput}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6} style={{ paddingTop: "55px" }}>
            <Typography>SEO Title</Typography>
            <TextField
              required
              name="seotitle"
              size="small"
              fullWidth
              value={user.seotitle}
              onChange={handleInput}
            />
          </Grid>
        </Grid>
      </Box>

      {/* Submit Button */}
      <Box
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <Button
            style={{ width: "200px", background: "orange" }}
            onClick={handleSubmit}
          >
            {id ? "Update" : "Save"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AddBlogsModal;
