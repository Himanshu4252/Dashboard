"use client"
import React, { useState, useEffect } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts';

interface DataPoint {
  name: string;
  uv: number;
  pv: number;
  amt: number;
}

const LineGraph: React.FC = () => {
  const data: DataPoint[] = [
    { name: '2010', uv: 1.67, pv: 1.67, amt: 1.67 },
    { name: '2011', uv: 1.83, pv: 1.83, amt: 1.83 },
    { name: '2012', uv: 1.82, pv: 1.82, amt: 1.82 },
    { name: '2013', uv: 1.86, pv: 1.86, amt: 1.86 },
    { name: '2014', uv: 2.04, pv: 2.04, amt: 2.04 },
    { name: '2015', uv: 2.10, pv: 2.10, amt: 2.10 },
    { name: '2016', uv: 2.29, pv: 2.29, amt: 2.29 },
    { name: '2017', uv: 2.65, pv: 2.65, amt: 2.65 },
    { name: '2018', uv: 2.70, pv: 2.70, amt: 2.70 },
    { name: '2019', uv: 2.87, pv: 2.87, amt: 2.87 },
    { name: '2020', uv: 2.66, pv: 2.66, amt: 2.66 },
    { name: '2021', uv: 3.17, pv: 3.17, amt: 3.17 },
    { name: '2022', uv: 3.73, pv: 3.73, amt: 3.73 },
    { name: '2023', uv: 3.57, pv: 3.57, amt: 3.57 },
  ];


  return (
    <div className="h-[400px] w-full border-2 border-black flex flex-col  items-center justify-around rounded-[10px] px-2">
        <h2>India&apos;s GDP since 2010(USD Trillion) </h2>
        <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
        <Line type="monotone" dataKey="uv" stroke="#3e8e41" />
        <Line type="monotone" dataKey="pv" stroke="#f1c40f" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="name" />
        <YAxis/>
      </LineChart>
      </ResponsiveContainer>
      </div>
      <p >Data being shown in the given chart is based on online resources. Consider checking from genuine sources.</p>
    </div>
  );
};

export default LineGraph;
