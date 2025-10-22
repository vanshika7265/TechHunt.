import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const { loading, user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
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
            <div className='flex items-center justify-center py-20 px-4'>
                <form 
                    onSubmit={submitHandler} 
                    className='w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6'
                >
                    <h1 className='text-3xl font-bold text-center text-purple-700'>Login</h1>

                    <div className='space-y-1'>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="Enter your email"
                            className="focus:ring-purple-500 focus:border-purple-500"
                        />
                    </div>

                    <div className='space-y-1'>
                        <Label>Password</Label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="Enter your password"
                            className="focus:ring-purple-500 focus:border-purple-500"
                        />
                    </div>

                    <div className="mt-4">
                        <Label className="mb-2">Login as</Label>
                        <RadioGroup className="flex gap-6">
                            <div className="flex items-center gap-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer accent-purple-600"
                                />
                                <Label>Student</Label>
                            </div>
                            <div className="flex items-center gap-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="admin"
                                    checked={input.role === 'admin'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer accent-purple-600"
                                />
                                <Label>Admin</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    <Button 
                        type="submit" 
                        className="w-full py-3 text-white bg-purple-600 hover:bg-purple-700 transition-colors flex justify-center items-center gap-2"
                        disabled={loading}
                    >
                        {loading && <Loader2 className='animate-spin h-5 w-5' />}
                        {loading ? "Please wait..." : "Login"}
                    </Button>

                    <p className="text-center text-sm text-gray-500">
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-purple-600 font-medium hover:underline">
                            Signup
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login
