import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCompanies } from "@/redux/companySlice";
import axios from "axios";

const useGetAllCompanies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axios.get(
          "https://techhunt-2.onrender.com/api/v1/company/get", // ✅ Correct endpoint
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        );

        console.log("COMPANIES RESPONSE:", res.data); // Debug log
        dispatch(setCompanies(res.data.companies || res.data.data || []));
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    fetchCompanies();
  }, [dispatch]);
};

export default useGetAllCompanies;
