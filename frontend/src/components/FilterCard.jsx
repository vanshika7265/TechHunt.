import React, { useEffect, useState } from 'react';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useDispatch } from 'react-redux';
import { setSearchedQuery, setCompanyFilter, setJobTypeFilter } from '@/redux/jobSlice';


const filterData = [
    { filterType: "Location", array: ["Delhi", "Bangalore", "Hyderabad", "Pune", "Chennai", "Mumbai"] },
    { filterType: "Job Type", array: ["Full-time", "Part-time", "Internship"] },
];

const FilterCard = () => {
    const dispatch = useDispatch();
    const [filters, setFilters] = useState({ location: "", company: "", jobType: "" });

    const handleChange = (filterType, value) => {
        const updated = { ...filters, [filterType.toLowerCase().replace(" ", "")]: value };
        setFilters(updated);
    };

    useEffect(() => {
        dispatch(setSearchedQuery(filters.location));
        dispatch(setCompanyFilter(filters.company));
        dispatch(setJobTypeFilter(filters.jobType));
    }, [filters]);

    return (
        <div className='w-full bg-white p-3 rounded-md'>
            <h1 className='font-bold text-lg'>Filter Jobs</h1>
            <hr className='mt-3' />
            {filterData.map((data, index) => (
                <div key={index} className="mt-3">
                    <h1 className='font-medium text-lg'>{data.filterType}</h1>
                    <RadioGroup
                        value={filters[data.filterType.toLowerCase().replace(" ", "")]}
                        onValueChange={(val) => handleChange(data.filterType, val)}
                    >
                        {data.array.map((item, idx) => {
                            const itemId = `r${index}-${idx}`;
                            return (
                                <div key={idx} className="flex items-center space-x-2 my-2">
                                    <RadioGroupItem value={item} id={itemId} />
                                    <Label htmlFor={itemId}>{item}</Label>
                                </div>
                            );
                        })}
                    </RadioGroup>
                </div>
            ))}
        </div>
    );
};

export default FilterCard;
