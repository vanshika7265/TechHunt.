import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { useSelector } from "react-redux";

// ✅ Demo applied jobs data
const demoAppliedJobs = [
  {
    _id: "1",
    createdAt: "2025-10-23T12:00:00Z",
    status: "accepted",
    job: {
      title: "Frontend Developer",
      company: { name: "Google" },
    },
  },
  {
    _id: "2",
    createdAt: "2025-10-20T09:30:00Z",
    status: "pending",
    job: {
      title: "Backend Engineer",
      company: { name: "Amazon" },
    },
  },
  {
    _id: "3",
    createdAt: "2025-10-18T15:45:00Z",
    status: "rejected",
    job: {
      title: "Data Analyst",
      company: { name: "Forma.AI" },
    },
  },
];

const AppliedJobTable = () => {
  const { allAppliedJobs = [] } = useSelector((store) => store.job);

  // Decide which data to render: real applied jobs or demo data
  const jobsToRender = allAppliedJobs.length > 0 ? allAppliedJobs : demoAppliedJobs;

  // Function to get badge variant based on status
  const getBadgeVariant = (status) => {
    switch (status) {
      case "accepted":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="overflow-x-auto max-w-6xl mx-auto my-6 p-6 bg-white rounded-2xl shadow-lg">
      <Table className="min-w-full">
        <TableHeader className="bg-gray-100">
          <TableRow className="h-14">
            <TableHead className="px-6 py-3">Date</TableHead>
            <TableHead className="px-6 py-3">Job Role</TableHead>
            <TableHead className="px-6 py-3">Company</TableHead>
            <TableHead className="px-6 py-3 text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobsToRender.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-8 text-gray-500 font-medium">
                You haven't applied to any job yet.
              </TableCell>
            </TableRow>
          ) : (
            jobsToRender.map((appliedJob) => (
              <TableRow
                key={appliedJob._id}
                className="hover:bg-gray-50 transition-colors cursor-pointer rounded-lg"
              >
                <TableCell className="font-medium px-6 py-4">
                  {appliedJob?.createdAt?.split("T")[0]}
                </TableCell>
                <TableCell className="px-6 py-4">{appliedJob.job?.title}</TableCell>
                <TableCell className="px-6 py-4">{appliedJob.job?.company?.name}</TableCell>
                <TableCell className="text-right px-6 py-4">
                  <span
                    className={`inline-block px-4 py-1 rounded-full font-semibold text-sm ${getBadgeVariant(
                      appliedJob.status
                    )}`}
                  >
                    {appliedJob.status.charAt(0).toUpperCase() + appliedJob.status.slice(1)}
                  </span>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
