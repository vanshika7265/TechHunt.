import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios';

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);

    const statusHandler = async (status, id) => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`https://techhunt-2.onrender.com/api/v1/application/status/${id}/update`, { status });
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong!");
        }
    }

    const applications = applicants?.applications || []; // ✅ default empty array

    return (
        <div className="max-w-6xl mx-auto my-6 p-4 bg-white rounded-2xl shadow-lg overflow-x-auto">
            <Table className="min-w-full">
                <TableHeader className="bg-gray-100">
                    <TableRow>
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
                            <TableCell colSpan={5} className="text-center py-6 text-gray-500 font-medium">
                                No applicants yet.
                            </TableCell>
                        </TableRow>
                    ) : (
                        applications.map((item) => (
                            <TableRow key={item?._id} className="hover:bg-gray-50 transition-colors rounded-lg">
                                <TableCell>{item?.applicant?.fullname || "-"}</TableCell>
                                <TableCell>{item?.applicant?.email || "-"}</TableCell>
                                <TableCell>{item?.applicant?.phoneNumber || "-"}</TableCell>
                                <TableCell>{item?.applicant?.createdAt?.split("T")[0] || "-"}</TableCell>
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
                                                    <span className={`font-medium ${status === "Accepted" ? "text-green-600" : "text-red-600"}`}>
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
    )
}

export default ApplicantsTable; 