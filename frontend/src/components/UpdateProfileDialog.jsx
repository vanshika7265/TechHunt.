import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const UpdateProfileDialog = ({ open, setOpen }) => {
    const { user } = useSelector(store => store.auth)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.join(", ") || "",
        file: null
    })

    const changeHandler = (e) => setInput({ ...input, [e.target.name]: e.target.value })
    const fileChangeHandler = (e) => setInput({ ...input, file: e.target.files?.[0] })

    const submitHandler = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("fullname", input.fullname)
        formData.append("email", input.email)
        formData.append("phoneNumber", input.phoneNumber)
        formData.append("bio", input.bio)
        formData.append("skills", input.skills)
        if (input.file) formData.append("file", input.file)

        try {
            setLoading(true)
            const res = await axios.post(`https://techhunt-2.onrender.com/api/v1/user/profile/update`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true
            })
            if (res.data.success) {
                dispatch(setUser(res.data.user))
                toast.success(res.data.message)
                setOpen(false)
            }
        } catch (error) {
            console.error(error)
            toast.error(error?.response?.data?.message || "Something went wrong!")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onInteractOutside={() => setOpen(false)}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Update Profile</DialogTitle>
                </DialogHeader>
                <form onSubmit={submitHandler} className="grid gap-4 py-4">
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor="fullname" className="text-right">Name</Label>
                        <Input id="fullname" name="fullname" value={input.fullname} onChange={changeHandler} className="col-span-3" />
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor="email" className="text-right">Email</Label>
                        <Input id="email" name="email" type="email" value={input.email} onChange={changeHandler} className="col-span-3" />
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor="phoneNumber" className="text-right">Phone</Label>
                        <Input id="phoneNumber" name="phoneNumber" value={input.phoneNumber} onChange={changeHandler} className="col-span-3" />
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor="bio" className="text-right">Bio</Label>
                        <Input id="bio" name="bio" value={input.bio} onChange={changeHandler} className="col-span-3" />
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor="skills" className="text-right">Skills</Label>
                        <Input id="skills" name="skills" value={input.skills} onChange={changeHandler} placeholder="Comma separated" className="col-span-3" />
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor="file" className="text-right">Resume (Optional)</Label>
                        <Input id="file" name="file" type="file" accept="application/pdf" onChange={fileChangeHandler} className="col-span-3" />
                    </div>
                    <DialogFooter>
                        <Button type="submit" className="w-full my-4" disabled={loading}>
                            {loading ? <><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait</> : "Update"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateProfileDialog
