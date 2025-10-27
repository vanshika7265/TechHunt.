import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";

const Browse = () => {
  useGetAllJobs();
  const { allJobs = [] } = useSelector((store) => store.job || {});
  const dispatch = useDispatch();

  // ✅ Dummy jobs (fallback)
  const dummyJobs = [
    {
      _id: "1",
      title: "Frontend Developer",
      company: { name: "Google", location: "Hyderabad" },
      salary: "₹10–14 LPA",
      location: "Hyderabad",
      description:
        "Work with React.js, Tailwind CSS, and modern frontend tooling to create scalable, accessible user experiences.",
      experience: "1–3 years",
      skills: ["React.js", "Tailwind CSS", "JavaScript"],
    },
    {
      _id: "2",
      title: "Data Analyst",
      company: { name: "ZS Associates", location: "Pune" },
      salary: "₹8–12 LPA",
      location: "Pune",
      description:
        "Analyze healthcare and sales data using SQL, Excel, and visualization tools. Collaborate with cross-functional teams.",
      experience: "0–2 years",
      skills: ["SQL", "Excel", "Power BI"],
    },
    {
      _id: "3",
      title: "Backend Engineer",
      company: { name: "Amazon", location: "Bangalore" },
      salary: "₹15–20 LPA",
      location: "Bangalore",
      description:
        "Design and build scalable backend APIs using Node.js and Express with AWS cloud deployment.",
      experience: "2–4 years",
      skills: ["Node.js", "Express", "AWS"],
    },
    {
      _id: "4",
      title: "UI/UX Designer",
      company: { name: "Flipkart", location: "Gurugram" },
      salary: "₹9–11 LPA",
      location: "Gurugram",
      description:
        "Create user-centered designs for mobile and web. Collaborate with developers and product teams.",
      experience: "1–3 years",
      skills: ["Figma", "Adobe XD", "Wireframing"],
    },
    {
      _id: "5",
      title: "Data Engineer",
      company: { name: "TCS Digital", location: "Mumbai" },
      salary: "₹7–10 LPA",
      location: "Mumbai",
      description:
        "Build ETL pipelines, manage data warehouses, and optimize data workflows for analytics and reporting.",
      experience: "1–3 years",
      skills: ["Python", "SQL", "Airflow"],
    },
  ];

  // ✅ Decide which jobs to show (real or dummy)
  const jobsToDisplay =
    allJobs && allJobs.length > 0 ? allJobs : dummyJobs;

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col">
      <Navbar />

      <div className="max-w-7xl mx-auto my-10 px-4 md:px-6">
        <h1 className="font-bold text-2xl mb-6">
          {jobsToDisplay.length > 0
            ? `Search Results (${jobsToDisplay.length})`
            : "No Jobs Found"}
        </h1>

        {jobsToDisplay.length === 0 ? (
          <div className="h-[50vh] flex items-center justify-center text-gray-500 text-lg">
            No jobs available
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobsToDisplay.map((job) => (
              <Job key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
