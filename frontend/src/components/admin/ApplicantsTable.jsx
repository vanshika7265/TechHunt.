import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios';

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `https://techhunt-2.onrender.com/api/v1/application/status/${id}/update`,
        { status }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  // ✅ Dummy fallback applicants
  const dummyApplications = [
    {
      _id: "1",
      applicant: {
        fullname: "Aarav Sharma",
        email: "aarav.sharma1@gmail.com",
        phoneNumber: "9876543210",
        createdAt: "2025-10-20T10:30:00Z",
      },
    },
    {
      _id: "2",
      applicant: {
        fullname: "Isha Patel",
        email: "isha.patel@gmail.com",
        phoneNumber: "9876543220",
        createdAt: "2025-10-19T11:45:00Z",
      },
    },
    {
      _id: "3",
      applicant: {
        fullname: "Rohan Gupta",
        email: "rohan.gupta@gmail.com",
        phoneNumber: "9876543230",
        createdAt: "2025-10-18T09:15:00Z",
      },
    },
  ];

  const applications =
    applicants?.applications?.length > 0
      ? applicants.applications
      : dummyApplications;

  return (
    <div className="max-w-6xl mx-auto my-6 p-4 bg-white rounded-2xl shadow-lg overflow-x-auto">
      <Table className="min-w-full">
        <TableHeader className="bg-gray-100">
          <TableRow className="h-14">
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {applications.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center py-6 text-gray-500 font-medium"
              >
                No applicants yet.
              </TableCell>
            </TableRow>
          ) : (
            applications.map((item) => (
              <TableRow
                key={item?._id}
                className="hover:bg-gray-50 transition-all duration-200 rounded-lg cursor-pointer"
              >
                <TableCell className="font-medium text-gray-800">
                  {item?.applicant?.fullname || "-"}
                </TableCell>
                <TableCell className="text-gray-700">
                  {item?.applicant?.email || "-"}
                </TableCell>
                <TableCell className="text-gray-700">
                  {item?.applicant?.phoneNumber || "-"}
                </TableCell>
                <TableCell className="text-gray-700">
                  {item?.applicant?.createdAt
                    ? item.applicant.createdAt.split("T")[0]
                    : "-"}
                </TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal className="hover:text-purple-600 transition-colors" />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      {shortlistingStatus.map((status, index) => (
                        <div
                          key={index}
                          onClick={() => statusHandler(status, item?._id)}
                          className="flex w-full items-center px-2 py-1 my-1 rounded-md cursor-pointer hover:bg-gray-100"
                        >
                          <span
                            className={`font-medium ${
                              status === "Accepted"
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {status}
                          </span>
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
