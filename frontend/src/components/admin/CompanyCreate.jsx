import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '@/redux/companySlice';

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState("");
    const dispatch = useDispatch();

    const registerNewCompany = async () => {
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    }

    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar />
            <div className="max-w-4xl mx-auto my-12 p-8 bg-white shadow-xl rounded-2xl border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
                
                {/* Heading */}
                <div className="mb-6">
                    <h1 className="font-extrabold text-3xl mb-2 text-gray-800">
                        Register a Placement Company
                    </h1>
                    <p className="text-gray-500 text-lg">
                        Add the company visiting your campus for placements. You can update the name later if needed.
                    </p>
                </div>

                {/* Company Input */}
                <Label className="mt-4 text-gray-700 font-medium">Company Name</Label>
                <Input
                    type="text"
                    className="my-3 border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="Microsoft, Infosys, TCS etc."
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                />

                {/* Buttons */}
                <div className="flex flex-col md:flex-row items-center gap-4 mt-8">
                    <Button
                        variant="outline"
                        className="w-full md:w-auto hover:bg-gray-100 transition-colors"
                        onClick={() => navigate("/admin/companies")}
                    >
                        Cancel
                    </Button>
                    <Button
                        className="w-full md:w-auto bg-purple-600 hover:bg-purple-700 text-white transition-all shadow-lg hover:shadow-2xl"
                        onClick={registerNewCompany}
                    >
                        Continue
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default CompanyCreate;
