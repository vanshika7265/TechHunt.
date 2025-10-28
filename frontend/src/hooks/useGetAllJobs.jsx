// frontend/src/hooks/useGetAllJobs.jsx
import { setAllJobs } from "@/redux/jobSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const { searchText } = useSelector((store) => store.job);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.warn("⚠️ No token found, skipping job fetch");
          dispatch(setAllJobs([]));
          return;
        }

        const res = await axios.get(
          "https://techhunt-2.onrender.com/api/v1/job/get",
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );

        if (res.data.success) {
          console.log("✅ All Jobs fetched:", res.data.jobs);
          dispatch(setAllJobs(res.data.jobs));
        } else {
          console.warn("❌ Fetch failed:", res.data.message);
          dispatch(setAllJobs([]));
        }
      } catch (error) {
        console.error("❌ Error fetching jobs:", error.response?.data || error);
        dispatch(setAllJobs([]));
      }
    };

    fetchJobs();
  }, [dispatch, searchText]);
};

export default useGetAllJobs;
