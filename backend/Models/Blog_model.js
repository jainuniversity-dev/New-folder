import mongoose from "mongoose";

const blogsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
      default: false, // false = Disabled, true = Enabled
    },
    image: {
      type: String,
      required: false,
    },
    date: {
      type: Date,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      required: true,
    },
    seotitle: {
      type: String,
      required: true,
    },
    schema: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Convert Boolean status to human-readable values in API responses
blogsSchema.methods.getStatusText = function () {
  return this.status ? "Enabled" : "Disabled";
};

const Blogs = mongoose.model("Blogs", blogsSchema);

export default Blogs;