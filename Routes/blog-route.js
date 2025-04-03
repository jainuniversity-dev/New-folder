import express from "express";
const router = express.Router();
import {
  getAllBlogs,
  getBlogsById,
  createBlogs,
  updateBlogs,
  deleteBlogs,
} from "../Controllers/blog-controllers"; // Correct import

// Define routes
router.get("/blogs", getAllBlogs); // Get all blogs--
router.get("/blogs/:id", getBlogsById); // Get blogs by ID
router.post("/blogs", createBlogs); // Create new blogs --
router.put("/blogs/:id", updateBlogs); // Update blogs by ID -- 
router.delete("/blogs/:id", deleteBlogs); // Delete blogs by ID --

export default router;
