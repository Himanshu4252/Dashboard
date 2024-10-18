"use client"
import React, {useState, useEffect} from 'react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'

interface DataPoint {
    name: string;
    uv: number;
    amt: number;
  }

interface DayData {
  sunrise : string;
  sunset : string;
  description : string;
  datetime: string;
  temp: number;
  feelslike: number;
  hours: HourData[];
}

interface APIResponse {
  resolvedAddress: string;
  description: string;
  days: DayData[];
}

interface HourData {
  datetime: string;
  temp: number;
  feelslike: number;
}

interface CurrentData{
  sunrise : string;
  sunset: string;
  description : string;
  temp : number;
}

const WeatherBox = () => {
  const [tempdata, setTempData] = useState<DataPoint[]>([]);
  const [dayData, setDayData] = useState<CurrentData>({
    sunrise: "",         
    sunset: "",
    description: "",
    temp: 0,
});

    useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch( process.env.NEXT_PUBLIC_WEATHER_API || '');
        const result: APIResponse = await response.json();

        setDayData({
          sunrise : result.days[0].sunrise,
          sunset : result.days[0].sunset,
          description: result.days[0].description,
          temp: parseFloat(((result.days[0].temp - 32) * (5 / 9)).toFixed(1)),
        });

        const chartData: DataPoint[] = result.days[0].hours.map(hour => ({
          name: hour.datetime, // Time of day
          uv: (hour.temp - 32) * (5 / 9),       // Temperature
          amt: hour.feelslike  // Feels like temperature
        }));
        setTempData(chartData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  return ( 
    <>
    <div className='h-[400px] w-full border-2 border-black flex flex-col rounded-[10px] px-2 bg-gradient-to-t from-sky-400 to-sky-100'>
        <div className='flex h-[80px] w-full justify-between '>
        <div className='border-r-2 border-gray-600 w-[25%] flex flex-col justify-around items-center bg-gradient-to-b from-orange-300 to-sky-100'>
            <h3>Sunrise</h3>
            <p>{dayData.sunrise}</p>
        </div>
        <div className='border-r-2 border-gray-600 w-[50%] flex flex-col justify-around items-center '>
            <h1>Today</h1>
            <p>{dayData.temp}</p>
    
        </div>
        <div className=' w-[25%] flex flex-col justify-around items-center bg-gradient-to-b from-orange-300 to-sky-100'>
            <h3>Sunset</h3>
            <p>{dayData.sunset}</p>
        </div>
        </div>
        <div className='flex justify-around items-center flex-col w-full'>
                <p>{dayData.description}</p>                
            </div>
        <ResponsiveContainer width="100%" height="100%" className=''>
        <LineChart data={tempdata}>
        <Line type="monotone" dataKey="uv" stroke="#3e8e41" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="name" />
        <YAxis/>
      </LineChart>
      </ResponsiveContainer>
    </div>
    </>
  )
}

export default WeatherBox