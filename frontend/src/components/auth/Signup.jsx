import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: ""
  });

  const { loading, user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, input, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      dispatch(setLoading(false));
    }
  }

  useEffect(() => {
    if (user) navigate("/");
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex items-center justify-center py-20 px-4">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6"
        >
          <h1 className="text-3xl font-bold text-center text-purple-700">Signup</h1>

          <div className="space-y-1">
            <Label>Full Name</Label>
            <Input
              type="text"
              name="fullname"
              value={input.fullname}
              onChange={changeEventHandler}
              placeholder="Enter your full name"
              className="focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          <div className="space-y-1">
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="Enter your email"
              className="focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          <div className="space-y-1">
            <Label>Phone Number</Label>
            <Input
              type="text"
              name="phoneNumber"
              value={input.phoneNumber}
              onChange={changeEventHandler}
              placeholder="Enter your phone number"
              className="focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          <div className="space-y-1">
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              placeholder="Enter your password"
              className="focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          <div>
            <Label className="mb-2">Register as</Label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === 'student'}
                  onChange={changeEventHandler}
                  className="cursor-pointer accent-purple-600"
                />
                <span>Student</span>
              </label>
              <label className="flex items-center gap-2">
                <Input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={input.role === 'admin'}
                  onChange={changeEventHandler}
                  className="cursor-pointer accent-purple-600"
                />
                <span>Admin</span>
              </label>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full py-3 text-white bg-purple-600 hover:bg-purple-700 transition-colors flex justify-center items-center gap-2"
            disabled={loading}
          >
            {loading && <Loader2 className="animate-spin h-5 w-5" />}
            {loading ? "Please wait..." : "Signup"}
          </Button>

          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-purple-600 font-medium hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Signup;
