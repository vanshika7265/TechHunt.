import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  postJob,
  getAllJobs,
  getJobById,
  getAdminJobs,
  applyToJob, // ✅ make sure this exists in controller
} from "../controllers/job.controller.js";

const router = express.Router();

// 🧩 Admin-only
router.post("/post", isAuthenticated, postJob);
router.get("/getadminjobs", isAuthenticated, getAdminJobs);

// 🌍 Public routes
router.get("/get", getAllJobs);           // ✅ Anyone can view jobs
router.get("/get/:id", getJobById);       // ✅ Anyone can view job details

// 🎯 Student-only
router.post("/apply/:id", isAuthenticated, applyToJob);  // ✅ Only logged-in users can apply

export default router;
