import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';

const filterData = [
  {
    filterType: 'Location',
    array: ['Delhi', 'Bangalore', 'Hyderabad', 'Pune', 'Mumbai']
  },
  {
    filterType: 'Industry',
    array: ['Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'Data Analyst']
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const dispatch = useDispatch();

  const changeHandler = (value) => setSelectedValue(value);

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue]);

  return (
    <div className="w-full bg-white p-5 rounded-xl shadow-md space-y-6">
      <h1 className="font-bold text-xl">Filter Jobs</h1>
      <RadioGroup value={selectedValue} onValueChange={changeHandler} className="space-y-4">
        {filterData.map(({ filterType, array }) => (
          <div key={filterType} className="space-y-2">
            <h2 className="font-semibold text-lg">{filterType}</h2>
            <div className="flex flex-col space-y-2">
              {array.map(item => {
                const itemId = `${filterType}-${item}`;
                return (
                  <div key={itemId} className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={item}
                      id={itemId}
                      className="h-5 w-5 border-gray-300 focus:ring-2 focus:ring-[#7209b7]"
                    />
                    <Label htmlFor={itemId} className="cursor-pointer">{item}</Label>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
