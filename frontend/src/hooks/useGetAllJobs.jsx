// frontend/src/hooks/useGetAllJobs.jsx
import { setAllJobs } from "@/redux/jobSlice";
import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const { searchText } = useSelector(store => store.job);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                axios.defaults.withCredentials = true;
                // <-- corrected endpoint: add /get
                const res = await axios.get(`https://techhunt-2.onrender.com/api/v1/job/get`);

                console.log("✅ All Jobs fetched:", res.data.jobs);
                              
                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs));
                }
            } catch (error) {
                console.log("Error fetching jobs:", error.response?.data || error);
            }
        }
        fetchJobs();
    }, []) // you can add searchText here if you want live search
}
export default useGetAllJobs;
