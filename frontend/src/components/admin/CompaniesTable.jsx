import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector((store) => store.company);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const navigate = useNavigate();

  // Filter companies based on search text
  useEffect(() => {
    if (!Array.isArray(companies)) {
      setFilteredCompanies([]);
      return;
    }
    const filtered = companies.filter((company) =>
      company?.name?.toLowerCase().includes(searchCompanyByText || "")
    );
    setFilteredCompanies(filtered);
  }, [companies, searchCompanyByText]);

  const getBadgeColor = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "closed":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="overflow-x-auto rounded-xl shadow-sm bg-white p-4">
      <Table className="min-w-full text-sm">
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Date Registered</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredCompanies?.length > 0 ? (
            filteredCompanies.map((company) => (
              <TableRow
                key={company._id}
                className="hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <TableCell className="font-medium">{company.name}</TableCell>
                <TableCell>{company.createdAt?.split("T")[0] || "-"}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getBadgeColor(
                      company.status || "Active"
                    )}`}
                  >
                    {company.status || "Active"}
                  </span>
                </TableCell>

                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal className="hover:text-purple-600 transition-colors" />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div
                        onClick={() =>
                          navigate(`/admin/companies/${company._id}`)
                        }
                        className="flex items-center gap-2 cursor-pointer p-1 hover:bg-gray-100 rounded-md"
                      >
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan="4" className="text-center py-6 text-gray-500">
                No companies found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
