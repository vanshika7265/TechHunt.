import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { postJob, getAllJobs, getJobById, getAdminJobs } from "../controllers/job.controller.js";

const router = express.Router();

router.post("/post", isAuthenticated, postJob);
router.get("/get", isAuthenticated, getAllJobs);
router.get("/getadminjobs", isAuthenticated, getAdminJobs);
router.get("/get/:id", isAuthenticated, getJobById);

// 👇 Add this new line (public route for students)
router.get("/all", getAllJobs);


export default router;
