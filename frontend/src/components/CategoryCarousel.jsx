import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const categories = ["Frontend Developer", "Backend Developer", "Data Science", "Analyst", "FullStack Developer", "UI/UX Designer", "Product Manager"];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = (category) => {
    dispatch(setSearchedQuery(category));
    navigate("/browse");
  };

  return (
    <section className="max-w-7xl mx-auto my-16 px-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Explore Job Categories</h2>
      <Carousel className="w-full">
        <CarouselContent className="flex gap-4">
          {categories.map((cat, idx) => (
            <CarouselItem key={idx} className="md:basis-1/3 lg:basis-1/4">
              <Button onClick={() => handleSearch(cat)} variant="outline"
                className="w-full py-4 rounded-xl bg-white hover:bg-blue-50 shadow hover:shadow-md transition font-medium text-gray-700">
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="text-[#6A38C2] hover:text-[#5b30a6]" />
        <CarouselNext className="text-[#6A38C2] hover:text-[#5b30a6]" />
      </Carousel>
    </section>
  );
};

export default CategoryCarousel;
