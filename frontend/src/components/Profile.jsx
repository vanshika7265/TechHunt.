import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

const Profile = () => {
    useGetAppliedJobs(); // Fetch applied jobs
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);

    return (
        <div className="min-h-screen flex flex-col bg-blue-50">
            <Navbar />

            <div className='max-w-4xl mx-auto my-10 p-8 bg-white rounded-2xl shadow-md border border-gray-200'>
                {/* User Info */}
                <div className='flex justify-between items-start'>
                    <div className='flex items-center gap-4'>
                        <Avatar className="h-24 w-24">
                            <AvatarImage 
                                src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg" 
                                alt="profile" 
                            />
                        </Avatar>
                        <div>
                            <h1 className='font-bold text-2xl'>{user?.fullname}</h1>
                            <p className='text-gray-600'>{user?.profile?.bio || "No bio available"}</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} variant="outline"><Pen /></Button>
                </div>

                {/* Contact Info */}
                <div className='my-5 space-y-2'>
                    <div className='flex items-center gap-3'>
                        <Mail />
                        <span>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-3'>
                        <Contact />
                        <span>{user?.phoneNumber}</span>
                    </div>
                </div>

                {/* Skills */}
                <div className='my-5'>
                    <h2 className='font-bold text-lg mb-2'>Skills</h2>
                    <div className='flex flex-wrap gap-2'>
                        {user?.profile?.skills?.length 
                            ? user.profile.skills.map((skill, idx) => <Badge key={idx}>{skill}</Badge>) 
                            : <span>NA</span>}
                    </div>
                </div>
            </div>

            {/* Applied Jobs */}
            <div className='max-w-4xl mx-auto my-8 p-6 bg-white rounded-2xl shadow-md border border-gray-200'>
                <h2 className='font-bold text-xl mb-4'>Applied Jobs</h2>
                <AppliedJobTable />
            </div>

            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile
