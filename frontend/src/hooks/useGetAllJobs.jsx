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
        axios.defaults.withCredentials = true;
        const res = await axios.get("https://techhunt-2.onrender.com/jobs"); // ✅ plural form
        console.log("✅ Full backend response:", res.data);

        if (res.data.success) {
          dispatch(setAllJobs(res.data.allJobs)); // ✅ match the real key
        }
      } catch (error) {
        console.log("❌ Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, [dispatch, searchText]);
};

export default useGetAllJobs;
