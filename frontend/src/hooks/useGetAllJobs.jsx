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
                // Only Active jobs
                const activeJobs = res.data.jobs.filter(job => job.status === "Active");
                dispatch(setAllJobs(activeJobs));
            } catch (err) {
                console.error("Error fetching jobs:", err);
            }
        };

        fetchJobs();
    }, [dispatch]);
};

export default useGetAllJobs;
