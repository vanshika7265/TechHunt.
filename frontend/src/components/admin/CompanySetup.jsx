import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Button } from '../ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import useGetCompanyById from '@/hooks/useGetCompanyById';

const CompanySetup = () => {
  const params = useParams();
  useGetCompanyById(params.id);

  const { singleCompany } = useSelector(store => store.company);

  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: ""
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeEventHandler = e => setInput({ ...input, [e.target.name]: e.target.value });

  const submitHandler = async e => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${params.id}`,
        input,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (singleCompany) {
      setInput({
        name: singleCompany.name || "",
        description: singleCompany.description || "",
        website: singleCompany.website || "",
        location: singleCompany.location || ""
      });
    }
  }, [singleCompany]);

  if (!singleCompany) {
    return (
      <div>
        <Navbar />
        <div className="flex justify-center items-center min-h-[70vh]">
          <Loader2 className="animate-spin h-8 w-8 text-purple-600" />
          <span className="ml-2 text-purple-700 font-medium">Loading company data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-xl mx-auto my-10 p-6 bg-white shadow-lg rounded-xl">
        {/* Header */}
        <div className="flex items-center gap-5 mb-6">
          <Button
            onClick={() => navigate("/admin/companies")}
            variant="outline"
            className="flex items-center gap-2 text-gray-500 font-semibold"
          >
            <ArrowLeft />
            Back
          </Button>
          <h1 className="font-bold text-2xl">Update Company Details</h1>
        </div>

        <p className="text-gray-500 mb-6">
          Update the company information to keep it accurate for students checking placement opportunities.
        </p>

        {/* Form */}
        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <Label>Company Name</Label>
            <Input
              type="text"
              name="name"
              placeholder="Microsoft, Google, Infosys etc."
              value={input.name}
              onChange={changeEventHandler}
            />
          </div>

          <div>
            <Label>Description</Label>
            <Input
              type="text"
              name="description"
              placeholder="Brief description about the company"
              value={input.description}
              onChange={changeEventHandler}
            />
          </div>

          <div>
            <Label>Website</Label>
            <Input
              type="text"
              name="website"
              placeholder="https://www.company.com"
              value={input.website}
              onChange={changeEventHandler}
            />
          </div>

          <div>
            <Label>Location</Label>
            <Input
              type="text"
              name="location"
              placeholder="City, State"
              value={input.location}
              onChange={changeEventHandler}
            />
          </div>

          <Button type="submit" className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white transition-colors">
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin inline-block" /> : "Update Company"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;
