import React, { useState, useEffect } from 'react';
import { getCars } from '../features/carDetails';
import { Link } from 'react-router-dom';

const Home = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const carsData = await getCars();
        setCars(carsData.data);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };
    fetchCars();
  }, []);

  return (
    <div className='flex flex-col items-center px-[150px]'>
      <h1 className='mt-[100px] text-8xl font-bold text-[#4D869C]'>Welcome to Car Rental</h1>
      <h2 className='mt-[30px] text-2xl font-semibold text-[#7AB2B2]'>We offer car rentals on hourly, daily, weekly basis.</h2>
      <div className='mt-[100px] flex flex-col items-start px-[50px] border-2 border-[#CDE8E5] rounded-xl'>
        <h3 className='mt-[50px] text-4xl font-semibold text-[#4D869C]'>Choose the car you want for rent</h3>
      <div className='mt-[50px] grid grid-cols-3 gap-11'>
        {cars && cars.map((car) => (
          <div key={car.id} className='max-w-[300px] border-2 rounded-lg'>
            <div className='py-[20px] border-b-2'>
            <img className='h-[150px]' src={car.imageURL} />
            </div>
            <div className='px-[10px] my-4'>
            <h2 className='text-[#4D869C] text-xl font-semibold'>{car.make} <span>{car.model}</span> <span className='text-[#7AB2B2]'>({car.year})</span></h2>
            <p className='text-[#4D869C] text-lg font-semibold'>Seats: {car.seats}</p>
            <div className='flex flex-wrap gap-2 border-t-2 pt-2'>
                <p className='text-[#4D869C] text-lg font-semibold'>Hourly: {car.rates.hourly}$</p>
                <p className='text-[#4D869C] text-lg font-semibold'>daily: {car.rates.daily}$</p>
                <p className='text-[#4D869C] text-lg font-semibold'>weekly: {car.rates.weekly}$</p>
                
            </div>
            <div className='w-full bg-[#4D869C] flex justify-center py-2 rounded-md mt-3'>
            <Link className='text-[#CDE8E5] text-lg font-semibold' to="/invoice-generator" state={car}>Rent</Link>
            </div>
            </div>
          </div>
        ))}
      </div>
      </div>
      
    </div>
  );
};

export default Home;