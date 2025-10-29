import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { postJob, getAllJobs, getJobById, getAdminJobs } from "../controllers/job.controller.js";

const router = express.Router();

router.post("/post", isAuthenticated, postJob);
router.get("/get",  getAllJobs);
router.get("/getadminjobs", isAuthenticated, getAdminJobs);
router.get("/get/:id",  getJobById);


export default router;
