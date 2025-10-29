import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { LogOut, User2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

const Navbar = () => {
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
     const res = await axios.get("https://techhunt-2.onrender.com/api/v1/user/logout", { withCredentials: true });

      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Error logging out");
    }
  };

  return (
    <nav className="bg-white shadow">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-6">
        <h1 className="text-2xl font-bold">College<span className="text-[#6A38C2]">Portal</span></h1>

        {/* Nav Links */}
        <ul className="flex font-medium items-center gap-6">
          {user?.role === 'admin' ? (
            <>
              <li><Link to="/admin/companies" className="hover:text-[#6A38C2]">Companies</Link></li>
              <li><Link to="/admin/jobs" className="hover:text-[#6A38C2]">Jobs</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/" className="hover:text-[#6A38C2]">Home</Link></li>
              <li><Link to="/jobs" className="hover:text-[#6A38C2]">Jobs</Link></li>
              <li><Link to="/browse" className="hover:text-[#6A38C2]">Browse</Link></li>
            </>
          )}
        </ul>

        {/* Auth Buttons / Profile */}
        {!user ? (
          <div className="flex items-center gap-2">
            <Link to="/login"><Button variant="outline">Login</Button></Link>
            <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#5b30a6] text-white">Signup</Button></Link>
          </div>
        ) : (
          <Popover>
            <PopoverTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src="https://github.com/shadcn.png" alt={user.fullname} />
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-72">
              <div className="flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                  <Avatar><AvatarImage src="https://github.com/shadcn.png" alt={user.fullname} /></Avatar>
                  <div>
                    <h4 className="font-medium">{user.fullname}</h4>
                    <p className="text-sm text-gray-500">{user?.profile?.bio}</p>
                  </div>
                </div>

                {user.role === 'student' && (
                  <Link to="/profile" className="flex items-center gap-2 text-gray-700 hover:text-[#6A38C2]">
                    <User2 /> View Profile
                  </Link>
                )}
                <button onClick={logoutHandler} className="flex items-center gap-2 text-gray-700 hover:text-red-500">
                  <LogOut /> Logout
                </button>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
