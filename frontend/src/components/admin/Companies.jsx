import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/redux/companySlice";

const Companies = () => {
  useGetAllCompanies();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input.trim().toLowerCase()));
  }, [input, dispatch]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto my-10 p-5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 my-5">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full md:w-1/2"
            placeholder="Filter by name"
          />
          <Button
            onClick={() => navigate("/admin/companies/create")}
            className="bg-purple-600 hover:bg-purple-700 text-white transition-colors"
          >
            New Company
          </Button>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-5">
          <CompaniesTable />
        </div>
      </div>
    </div>
  );
};

export default Companies;
