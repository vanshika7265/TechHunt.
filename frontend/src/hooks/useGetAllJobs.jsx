import { setAllJobs } from '@/redux/jobSlice'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const { searchedQuery } = useSelector((store) => store.job);

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(
          `https://techhunt-2.onrender.com/api/v1/job/get?keyword=${searchedQuery || ""}`,
          { withCredentials: true } // ✅ important for auth cookie
        );

        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
        } else {
          console.log("Failed to fetch jobs:", res.data.message);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchAllJobs();
  }, [searchedQuery]); // ✅ re-fetch when search changes
};

export default useGetAllJobs;
