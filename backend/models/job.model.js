import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  requirements: [{ type: String }],
  salary: { type: Number, required: true },
  experienceLevel: { type: Number, required: true },
  location: { type: String, required: true },
  jobType: { type: String, required: true },
  position: { type: String, required: true }, // ✅ changed from Number to String
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  applications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Application' }],
  status: {
  type: String,
  enum: ["Active", "Inactive"],
  default: "Active"   // ✅ Default status added
}

}, { timestamps: true });

export const Job = mongoose.model("Job", jobSchema);
