import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: "",
    companyId: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { companies } = useSelector((store) => store.company);

  useGetAllCompanies();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    setInput({ ...input, companyId: value });
  };

  const resetForm = () => {
    setInput({
      title: "",
      description: "",
      requirements: "",
      salary: "",
      location: "",
      jobType: "",
      experience: "",
      position: "",
      companyId: "",
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // ✅ Basic validation
    if (!input.title.trim() || !input.description.trim() || !input.companyId) {
      toast.error("Please fill Title, Description, and select a Company");
      return;
    }

    try {
      setLoading(true);

      // ✅ Prepare payload
      const payload = {
        title: input.title.trim(),
        description: input.description.trim(),
        requirements: input.requirements
          ? input.requirements.split(",").map((r) => r.trim())
          : [],
        salary: input.salary ? Number(input.salary) : 0,
        location: input.location.trim() || "",
        jobType: input.jobType.trim() || "",
        experience: input.experience ? Number(input.experience) : 0,
        position: input.position.trim() || "", // string
        companyId: input.companyId,
      };

      const res = await axios.post(
        "https://techhunt-2.onrender.com/api/v1/job/post",
        payload,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true, // ✅ send JWT cookie
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        resetForm(); // ✅ reset form after success
        navigate("/admin/jobs"); // redirect after posting
      }
    } catch (error) {
      console.error("Job post error:", error.response?.data || error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="flex justify-center w-full my-10">
        <form
          onSubmit={submitHandler}
          className="p-8 max-w-4xl bg-white shadow-lg rounded-xl w-full"
        >
          <h1 className="text-2xl font-bold mb-4">Post a New Placement Job</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Job Title</Label>
              <Input
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                placeholder="Software Developer"
                required
              />
            </div>

            <div>
              <Label>Description</Label>
              <Input
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                placeholder="Job description"
                required
              />
            </div>

            <div>
              <Label>Requirements (comma separated)</Label>
              <Input
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
                placeholder="React, Node.js, SQL"
              />
            </div>

            <div>
              <Label>Salary</Label>
              <Input
                type="number"
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
                placeholder="50000"
                min={0}
              />
            </div>

            <div>
              <Label>Location</Label>
              <Input
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                placeholder="New York"
              />
            </div>

            <div>
              <Label>Job Type</Label>
              <Input
                name="jobType"
                value={input.jobType}
                onChange={changeEventHandler}
                placeholder="Full-time"
              />
            </div>

            <div>
              <Label>Experience (years)</Label>
              <Input
                type="number"
                name="experience"
                value={input.experience}
                onChange={changeEventHandler}
                placeholder="2"
                min={0}
              />
            </div>

            <div>
              <Label>Position</Label>
              <Input
                name="position"
                value={input.position}
                onChange={changeEventHandler}
                placeholder="Junior"
              />
            </div>

            <div className="md:col-span-2">
              <Label>Select Company</Label>
              <Select value={input.companyId} onValueChange={selectChangeHandler} required>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a Company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {companies.length > 0 ? (
                      companies.map((c) => (
                        <SelectItem key={c._id} value={c._id}>
                          {c.name}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem disabled value="">
                        No companies available
                      </SelectItem>
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          {loading ? (
            <Button className="w-full mt-6">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white"
            >
              Post New Job
            </Button>
          )}

          {companies.length === 0 && (
            <p className="text-xs text-red-600 font-bold text-center mt-3">
              *Please register a company first before posting a job
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostJob;
