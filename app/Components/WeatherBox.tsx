"use client"
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store';
import { fetchWeather } from '../store/slices/weatherSlice';
import { RootState } from '../store'; // import RootState to access state types
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface DataPoint {
  name: string;
  Temprature: number;
  amt: number;
}


const WeatherBox = () => {
  // Using useDispatch to dispatch actions and useSelector to access store
  const dispatch = useDispatch<AppDispatch>();
  const { tempData, currentDay, loading, error } = useSelector((state: RootState) => state.weather);

   // Fetch weather data when the component mounts
  useEffect(() => {
    dispatch(fetchWeather());
  }, [dispatch]);

  // Handle loading and error states
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='h-[400px] w-full border-2 border-black flex flex-col rounded-[10px] px-2 bg-gradient-to-t from-sky-400 to-sky-100'>
      <div className='flex h-[80px] w-full justify-between '>
        <div className='border-r-2 border-gray-600 w-[25%] flex flex-col justify-around items-center bg-gradient-to-b from-orange-300 to-sky-100'>
          <h3>Sunrise</h3>
          <p>{currentDay.sunrise}</p>
        </div>
        <div className='border-r-2 border-gray-600 w-[50%] flex flex-col justify-around items-center '>
          <h1>Today</h1>
          <p>{currentDay.temp} °C</p>
        </div>
        <div className=' w-[25%] flex flex-col justify-around items-center bg-gradient-to-b from-orange-300 to-sky-100'>
          <h3>Sunset</h3>
          <p>{currentDay.sunset}</p>
        </div>
      </div>
      <div className='flex justify-around items-center flex-col w-full'>
        <p>{currentDay.description}</p>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart width={600} height={300} data={tempData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <Line type="monotone" dataKey="Temprature" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default WeatherBox;

