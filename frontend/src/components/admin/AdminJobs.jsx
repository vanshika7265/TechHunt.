import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AdminJobsTable from './AdminJobsTable';
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs';
import { setSearchJobByText } from '@/redux/jobSlice';

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className='max-w-6xl mx-auto my-10 p-5'>
        <div className='flex flex-col md:flex-row items-center justify-between gap-4 my-5'>
          <Input
            className="w-full md:w-1/2"
            placeholder="Filter by name, role"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button 
            onClick={() => navigate("/admin/jobs/create")}
            className="bg-purple-600 hover:bg-purple-700 text-white transition-colors"
          >
            New Jobs
          </Button>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-5">
          <AdminJobsTable />
        </div>
      </div>
    </div>
  );
};

export default AdminJobs;
