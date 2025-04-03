import express from "express";
const router = express.Router();
import { home, register } from "../Controllers/auth-controllers"; // Correct import

router.route("/").get(home);
router.route("/register").get(register);

export default router;
