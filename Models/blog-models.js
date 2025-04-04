import mongoose from "mongoose";

const blogsSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    // status: {
    //   type: Boolean,
    //   default: false,
    //   required: true,
    // },
    description: {
      type: String,
      required: false,
    },
    // data: {
    //   type: mongoose.Schema.Types.Mixed,
    //   required: false,
    // },
    // image: {
    //   type: String,
    //   required: true,
    // },

    status: { type: Boolean, required: true }, // Ensure status is Boolean
    slug: { type: String, unique: true, required: true },
    // slug: {
    //   type: String,
    //   required: true,
    //   unique: true,
    // },
    seoTitle: {
      type: String,
      required: true,
    },

    createdAt:{
        type: Number,
        required: false,
        default: Math.floor(Date.now() / 1000),
    }
  });

const Blogs = mongoose.model("Blogs", blogsSchema, "blogs");

export default Blogs;
