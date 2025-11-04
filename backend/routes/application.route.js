import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  applyJob,
  getApplicants,
  getAppliedJobs,
  updateStatus,
} from "../controllers/application.controller.js";

const router = express.Router();

// 🟢 Student applies for a job
router.route("/apply/:id").post(isAuthenticated, applyJob);

// 🟢 Student views all applied jobs
router.route("/get").get(isAuthenticated, getAppliedJobs);

// 🟣 Admin views applicants for a specific job
router.route("/:id/applicants").get(isAuthenticated, getApplicants);

// 🟣 Admin updates application status (Accepted / Rejected)
router.route("/status/:id/update").post(isAuthenticated, updateStatus);

export default router;
