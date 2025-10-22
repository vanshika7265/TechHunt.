import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useSelector } from 'react-redux';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import axios from 'axios';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: ""
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { companies } = useSelector(store => store.company);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(c => c.name.toLowerCase() === value);
    setInput({ ...input, companyId: selectedCompany?._id || "" });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // ✅ Company must be selected
    if (!input.companyId) {
      toast.error("Please select a company before posting the job");
      return;
    }

    // ✅ Prepare payload: remove empty strings
    const payload = { ...input };
    Object.keys(payload).forEach(key => {
      if (payload[key] === "" || payload[key] === null) delete payload[key];
    });

    try {
      setLoading(true);
      const res = await axios.post(
        `https://techhunt-2.onrender.com/api/v1/job/post`,
        payload,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
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
          <p className="text-gray-500 mb-6">
            Add a new placement opportunity for students. Fill all the details carefully.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Job Title</Label>
              <Input name="title" value={input.title} onChange={changeEventHandler} placeholder="Software Developer, Data Analyst etc." />
            </div>

            <div>
              <Label>Description</Label>
              <Input name="description" value={input.description} onChange={changeEventHandler} placeholder="Brief about the job" />
            </div>

            <div>
              <Label>Requirements</Label>
              <Input name="requirements" value={input.requirements} onChange={changeEventHandler} placeholder="Skills, qualifications etc." />
            </div>

            <div>
              <Label>Salary</Label>
              <Input name="salary" value={input.salary} onChange={changeEventHandler} placeholder="₹3,00,000 - ₹6,00,000 per annum" />
            </div>

            <div>
              <Label>Location</Label>
              <Input name="location" value={input.location} onChange={changeEventHandler} placeholder="City, State" />
            </div>

            <div>
              <Label>Job Type</Label>
              <Input name="jobType" value={input.jobType} onChange={changeEventHandler} placeholder="Full-time, Internship etc." />
            </div>

            <div>
              <Label>Experience Level</Label>
              <Input name="experience" value={input.experience} onChange={changeEventHandler} placeholder="Fresher, 1-2 years etc." />
            </div>

            <div>
              <Label>No. of Positions</Label>
              <Input type="number" name="position" value={input.position} onChange={changeEventHandler} />
            </div>

            <div>
              {companies.length > 0 && (
                <>
                  <Label>Select Company</Label>
                  <Select onValueChange={selectChangeHandler}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a Company" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {companies.map(company => (
                          <SelectItem key={company._id} value={company.name.toLowerCase()}>
                            {company.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </>
              )}
            </div>
          </div>

          {loading ? (
            <Button className="w-full mt-6">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white">
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
