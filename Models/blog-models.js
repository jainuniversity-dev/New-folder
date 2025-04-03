import mongoose from "mongoose";

const blogsSchema = new mongoose.Schema(
  {
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
    createdAt: { type: Date, default: Date.now },
    slug: { type: String, unique: true, required: true },
    // slug: {
    //   type: String,
    //   required: true,
    //   unique: true,
    // },
    seotitle: {
      type: String,
      required: true,
    },
    // meta_keywords: {
    //   type: [String],
    //   required: true,
    // },
  },
  {
    timestamps: true,
  }
);

const Blogs = mongoose.model("Blogs", blogsSchema, "blogs");

export default Blogs;
