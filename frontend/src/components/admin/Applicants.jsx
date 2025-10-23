import axios from 'axios'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../shared/Navbar';
import ApplicantsTable from './ApplicantsTable';
import { setAllApplicants } from '@/redux/applicationSlice';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';

const Applicants = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector(store => store.application);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(`https://techhunt-2.onrender.com/api/v1/application/${id}/applicants`);

        if (res.data.success) {
          // ✅ Ensure default empty array if job or applications are null
          dispatch(setAllApplicants(res.data.job || { applications: [] }));
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    }
    fetchAllApplicants();
  }, [id, dispatch]);

  return (
    <div>
      <Navbar />
      <div className='max-w-7xl mx-auto'>
        {/* ✅ Optional chaining and default to 0 */}
        <h1 className='font-medium text-xl my-5'>
          Applicants ({applicants?.applications?.length || 0})
        </h1>
        <ApplicantsTable />
      </div>
    </div>
  )
}

export default Applicants;
