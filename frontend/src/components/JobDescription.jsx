import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import Navbar from './shared/Navbar';

const JobDescription = () => {
  const { singleJob } = useSelector(store => store.job);
  const { user } = useSelector(store => store.auth);
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const isIntiallyApplied = singleJob?.applications?.some(app => app.applicant === user?._id) || false;
  const [isApplied, setIsApplied] = useState(isIntiallyApplied);

  const applyJobHandler = async () => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.get(`https://techhunt-2.onrender.com/api/v1/application/apply/${params.id}`);
      if (res.data.success) {
        setIsApplied(true);
        const updatedJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] };
        dispatch(setSingleJob(updatedJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
         axios.defaults.withCredentials = true;
        const res = await axios.get(`https://techhunt-2.onrender.com/api/v1/job/${params.id}`);
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(res.data.job.applications.some(app => app.applicant === user?._id));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="min-h-screen bg-blue-50">
      <Navbar />
      <div className="max-w-4xl mx-auto my-10 p-6 bg-white rounded-xl shadow-lg">
        {/* Header + Apply Button */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="font-bold text-2xl">{singleJob?.title}</h1>
            <div className="flex flex-wrap items-center gap-3 mt-3">
              <Badge className="text-blue-700 font-bold" variant="ghost">{singleJob?.position} Positions</Badge>
              <Badge className="text-[#F83002] font-bold" variant="ghost">{singleJob?.jobType}</Badge>
              <Badge className="text-[#7209b7] font-bold" variant="ghost">{singleJob?.salary} LPA</Badge>
            </div>
          </div>
          <Button
            onClick={isApplied ? null : applyJobHandler}
            disabled={isApplied}
            className={`rounded-lg px-6 py-2 font-medium ${
              isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad] text-white'
            }`}
          >
            {isApplied ? 'Already Applied' : 'Apply Now'}
          </Button>
        </div>

        {/* Job Details */}
        <div className="mt-6 space-y-3">
          <h2 className="font-semibold text-lg border-b pb-2">Job Description</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div className="space-y-2">
              <p className="font-bold">Role: <span className="font-normal text-gray-800">{singleJob?.title}</span></p>
              <p className="font-bold">Location: <span className="font-normal text-gray-800">{singleJob?.location}</span></p>
              <p className="font-bold">Experience: <span className="font-normal text-gray-800">{singleJob?.experience} yrs</span></p>
              <p className="font-bold">Salary: <span className="font-normal text-gray-800">{singleJob?.salary} LPA</span></p>
            </div>
            <div className="space-y-2">
              <p className="font-bold">Total Applicants: <span className="font-normal text-gray-800">{singleJob?.applications?.length}</span></p>
              <p className="font-bold">Posted Date: <span className="font-normal text-gray-800">{singleJob?.createdAt?.split("T")[0]}</span></p>
              <p className="font-bold">Description: <span className="font-normal text-gray-800">{singleJob?.description}</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
