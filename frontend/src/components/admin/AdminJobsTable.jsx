import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Badge } from '../ui/badge';
import { Edit2, Eye, MoreHorizontal } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { useGetAllAdminJobs } from '@/hooks/useGetAllAdminJobs';
import { setAllAdminJobs } from '@/redux/jobSlice';

const AdminJobsTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allAdminJobs, searchJobByText } = useSelector(store => store.job);
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);

  // Fetch admin jobs
  useGetAllAdminJobs();

  useEffect(() => {
    const filteredJobs = allAdminJobs.filter(job => {
      if (!searchJobByText) return true;
      return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
             job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());
    });
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  // Determine badge color
  const getBadgeVariant = (type) => {
    switch (type) {
      case 'Full-Time': return 'purple';
      case 'Part-Time': return 'blue';
      case 'Internship': return 'green';
      default: return 'gray';
    }
  }

  // Toggle Active/Inactive status
  const handleToggleStatus = async (jobId, currentStatus) => {
    try {
      const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
      const res = await axios.patch(
        `https://techhunt-2.onrender.com/api/v1/job/updateStatus/${jobId}`,
        { status: newStatus },
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        // Update local state
        const updatedJobs = allAdminJobs.map(job =>
          job._id === jobId ? { ...job, status: newStatus } : job
        );
        dispatch(setAllAdminJobs(updatedJobs));
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-full bg-white rounded-xl shadow-sm">
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Job Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs?.map(job => (
            <TableRow key={job._id} className="hover:bg-gray-50 transition-colors cursor-pointer rounded-lg">
              <TableCell className="font-medium">{job?.company?.name}</TableCell>
              <TableCell>{job?.title}</TableCell>
              <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
              <TableCell>
                <Badge variant={getBadgeVariant(job?.jobType || 'Full-Time')}>
                  {job?.jobType || 'Full-Time'}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant={job.status === "Active" ? "green" : "red"}>
                  {job.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right flex justify-end gap-2">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal className="hover:text-purple-600 transition-colors" />
                  </PopoverTrigger>
                  <PopoverContent className="w-32">
                    <div
                      onClick={() => navigate(`/admin/companies/${job._id}`)}
                      className='flex items-center gap-2 w-fit cursor-pointer p-1 hover:bg-gray-100 rounded-md'
                    >
                      <Edit2 className='w-4' />
                      <span>Edit</span>
                    </div>
                    <div
                      onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                      className='flex items-center gap-2 w-fit cursor-pointer p-1 mt-2 hover:bg-gray-100 rounded-md'
                    >
                      <Eye className='w-4' />
                      <span>Applicants</span>
                    </div>
                  </PopoverContent>
                </Popover>
                <button
                  onClick={() => handleToggleStatus(job._id, job.status)}
                  className={`px-2 py-1 rounded ${
                    job.status === "Active" ? "bg-red-500 text-white" : "bg-green-500 text-white"
                  }`}
                >
                  {job.status === "Active" ? "Deactivate" : "Activate"}
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
