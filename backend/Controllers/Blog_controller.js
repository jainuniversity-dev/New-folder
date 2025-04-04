import Blogs from "../Models/Blog-Models.js";

// Get all blogs
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blogs.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get blogs by ID
const getBlogsById = async (req, res) => {
  try {
    const blogs = await Blogs.findById(req.params.id);
    if (!blogs) return res.status(404).json({ message: "Blogs not found" });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new blogs
const createBlogs = async (req, res) => {
  try {
    const newBlogs = new Blogs(req.body);
    await newBlogs.save();
    res.status(201).json(newBlogs);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update blogs by ID
const updateBlogs = async (req, res) => {
  try {
    const updatedBlogs = await Blogs.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedBlogs)
      return res.status(404).json({ message: "Blogs not found" });
    res.status(200).json(updatedBlogs);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete blogs by ID
const deleteBlogs = async (req, res) => {
  try {
    const deletedBlogs = await Blogs.findByIdAndDelete(req.params.id);
    if (!deletedBlogs)
      return res.status(404).json({ message: "Blogs not found" });
    res.status(200).json({ message: "Blogs deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getAllBlogs, getBlogsById, createBlogs, updateBlogs, deleteBlogs };