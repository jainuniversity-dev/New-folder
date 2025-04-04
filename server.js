import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";

import router from "./routes/auth-route.js";
import blogsRouter from "./routes/blog-route.js";
import {connectDB} from "./Utils/database.js";


const app = express();
const PORT = 3000;


app.use(cors());
app.use(express.json());

// Default route
app.get("/", (req, res) => {
  res.send("Hello, Backend!");
});

// API routes
app.use("/api/auth", router);

app.use("/api", blogsRouter);


// Simulated database
const users = [{ email: "admin@jgi.in", password: "admin1234" }];

// Login route
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    const token = jwt.sign({ email: user.email }, "your_secret_key", {
      expiresIn: "1h",
    });
    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
});

// Connect to database and start server
  app.listen(PORT, async () => {
   await connectDB()
    console.log(`Server running on http://localhost:${PORT}`);
  });

