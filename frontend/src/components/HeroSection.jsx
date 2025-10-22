import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='text-center'>
            <div className='flex flex-col gap-5 my-10'>
                {/* Tagline */}
                <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>
                    Institute of Engineering and Technology, DAVV
                </span>

                {/* Heading */}
                <h1 className='text-5xl font-bold'>
                    Explore Opportunities <br /> Through <span className='text-[#6A38C2]'>Campus Placements</span>
                </h1>

                {/* Subtext */}
                <p>
                    Access top recruiters, internships, and placement drives organized for students of IET DAVV.
                </p>

                {/* Search Bar */}
                <div className='flex w-full max-w-lg md:w-[50%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
                    <input
                        type="text"
                        placeholder='Search for companies, roles or internships'
                        onChange={(e) => setQuery(e.target.value)}
                        className='outline-none border-none w-full'
                    />
                    <Button onClick={searchJobHandler} className="rounded-r-full bg-[#6A38C2] hover:bg-[#7C4DD0] transition-colors duration-300">
                        <Search className='h-5 w-5 text-white' />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default HeroSection
