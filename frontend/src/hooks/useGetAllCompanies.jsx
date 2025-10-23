import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCompanies } from "@/redux/companySlice";
import axios from "axios";

const useGetAllCompanies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        // ✅ Direct endpoint here
       const res = await axios.get(
  "https://techhunt-2.onrender.com/api/v1/company/getcompany",
  { withCredentials: true }
);
console.log("COMPANIES RESPONSE:", res.data);  // ← add this line


        // ✅ Dispatch to Redux store
        dispatch(setCompanies(res.data.companies || res.data.data || []));
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    fetchCompanies();
  }, [dispatch]);
};

export default useGetAllCompanies;
