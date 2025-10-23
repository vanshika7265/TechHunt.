import { Job } from "../models/job.model.js";

export const postJob = async (req, res) => {
  try {
    const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
    const userId = req.id;

    if (!userId) return res.status(401).json({ message: "Unauthorized", success: false });

    if (!title || !description || !requirements || salary === undefined || !location || !jobType || experience === undefined || !position || !companyId) {
      return res.status(400).json({ message: "Missing required fields", success: false });
    }

    const salaryNumber = Number(salary);
    const experienceNumber = Number(experience);
    if (isNaN(salaryNumber) || isNaN(experienceNumber)) {
      return res.status(400).json({ message: "Salary or Experience must be numbers", success: false });
    }

    const requirementsArray = typeof requirements === "string" ? requirements.split(",").map(r => r.trim()) : Array.isArray(requirements) ? requirements : [];

    const job = await Job.create({
      title,
      description,
      requirements: requirementsArray,
      salary: salaryNumber,
      location,
      jobType,
      experienceLevel: experienceNumber,
      position,
      company: companyId,
      created_by: userId
    });

    return res.status(201).json({ message: "Job created successfully", job, success: true });
  } catch (error) {
    console.error("Job posting error:", error);
    return res.status(500).json({ message: "Internal Server Error", success: false, error: error.message });
  }
};


// STUDENT: Get all jobs with optional search keyword
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };
        const jobs = await Job.find(query)
            .populate("company")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            jobs,
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};

// STUDENT: Get job by ID
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate("company");

        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false
            });
        }

        return res.status(200).json({ job, success: true });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};

// ADMIN: Get jobs created by admin
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId })
            .populate("company")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            jobs,
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};
