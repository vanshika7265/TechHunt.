import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useSelector } from "react-redux";

const AppliedJobTable = () => {
  // Dummy applied jobs (fallback for now)
  const dummyAppliedJobs = [
    {
      _id: "1",
      createdAt: "2025-10-20T09:15:00Z",
      job: {
        title: "Frontend Developer",
        company: { name: "Google" },
      },
      status: "accepted",
    },
    {
      _id: "2",
      createdAt: "2025-10-22T14:45:00Z",
      job: {
        title: "Data Analyst",
        company: { name: "ZS Associates" },
      },
      status: "pending",
    },
    {
      _id: "3",
      createdAt: "2025-10-25T11:30:00Z",
      job: {
        title: "Backend Engineer",
        company: { name: "Amazon" },
      },
      status: "rejected",
    },
  ];

  // Pull from Redux if available, else use dummy
  const { allAppliedJobs = [] } = useSelector((store) => store.job);
  const jobsToDisplay =
    allAppliedJobs && allAppliedJobs.length > 0
      ? allAppliedJobs
      : dummyAppliedJobs;

  // Badge color based on status
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
          {jobsToDisplay.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center py-8 text-gray-500 font-medium"
              >
                You haven't applied to any job yet.
              </TableCell>
            </TableRow>
          ) : (
            jobsToDisplay.map((appliedJob) => (
              <TableRow
                key={appliedJob._id}
                className="hover:bg-gray-50 transition-colors cursor-pointer rounded-lg"
              >
                <TableCell className="font-medium px-6 py-4">
                  {appliedJob?.createdAt?.split("T")[0]}
                </TableCell>
                <TableCell className="px-6 py-4">
                  {appliedJob.job?.title}
                </TableCell>
                <TableCell className="px-6 py-4">
                  {appliedJob.job?.company?.name}
                </TableCell>
                <TableCell className="text-right px-6 py-4">
                  <span
                    className={`inline-block px-4 py-1 rounded-full font-semibold text-sm ${getBadgeVariant(
                      appliedJob.status
                    )}`}
                  >
                    {appliedJob.status.charAt(0).toUpperCase() +
                      appliedJob.status.slice(1)}
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
