import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAllJobs } from "@/redux/jobSlice";

const useGetAllJobs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await axios.get("https://techhunt-2.onrender.com/api/job/get", {
                    withCredentials: true
                });

                // ✅ Safe check
                const jobsData = res?.data?.jobs || [];

                // ✅ Only Active jobs (status field may be missing)
                const activeJobs = jobsData.filter(job => 
                    (job.status || "").toLowerCase() === "active"
                );

                dispatch(setAllJobs(activeJobs));
            } catch (err) {
                console.error("Error fetching jobs:", err);
                dispatch(setAllJobs([])); // fallback
            }
        };

        fetchJobs();
    }, [dispatch]);
};

export default useGetAllJobs;
