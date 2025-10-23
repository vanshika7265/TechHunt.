import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCompanies } from "@/redux/companySlice";
import axios from "axios";

const useGetAllCompanies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        // 🔗 Correct full backend API URL (Render deployed)
        const res = await axios.get(
          "https://techhunt-2.onrender.com/api/v1/company/getcompany",
          {
            withCredentials: true, // if backend uses cookies/session
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        // ✅ Dispatch to Redux store
        // Adjust for backend response key
        dispatch(setCompanies(res.data.companies || res.data.data || []));
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    fetchCompanies();
  }, [dispatch]);
};

export default useGetAllCompanies;
