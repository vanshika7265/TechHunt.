import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../shared/Navbar";
import ApplicantsTable from "./ApplicantsTable";
import { setAllApplicants } from "@/redux/applicationSlice";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

const Applicants = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);

  // ✅ Dummy fallback data
  const dummyApplicants = {
    _id: "job123",
    title: "Frontend Developer",
    company: { name: "TechHunt Pvt Ltd" },
    applications: [
      {
        applicant: "user1",
        name: "Aarav Sharma",
        email: "aarav.sharma@gmail.com",
        appliedAt: "2025-10-20",
        status: "Under Review",
      },
      {
        applicant: "user2",
        name: "Isha Patel",
        email: "isha.patel@gmail.com",
        appliedAt: "2025-10-18",
        status: "Interview Scheduled",
      },
      {
        applicant: "user3",
        name: "Rohan Gupta",
        email: "rohan.gupta@gmail.com",
        appliedAt: "2025-10-15",
        status: "Rejected",
      },
    ],
  };

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(
          `https://techhunt-2.onrender.com/api/v1/application/${id}/applicants`
        );

        if (res.data.success && res.data.job) {
          dispatch(setAllApplicants(res.data.job));
        } else {
          // ✅ If API returns nothing, use dummy data
          dispatch(setAllApplicants(dummyApplicants));
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || "Showing dummy applicants");
        // ✅ Fallback to dummy data on API failure
        dispatch(setAllApplicants(dummyApplicants));
      }
    };
    fetchAllApplicants();
  }, [id, dispatch]);

  return (
    <div className="min-h-screen bg-blue-50">
      <Navbar />

      <motion.div
        className="max-w-7xl mx-auto px-4 md:px-6 py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <motion.h1
          className="font-bold text-2xl text-gray-800 mb-6 flex items-center gap-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          👥 Applicants ({applicants?.applications?.length || 0})
        </motion.h1>

        {/* Table */}
        <motion.div
          className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          whileHover={{
            scale: 1.01,
            boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
          }}
        >
          <ApplicantsTable />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Applicants;
