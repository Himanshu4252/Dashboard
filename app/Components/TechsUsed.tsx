import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

// Data type definition
interface DataItem {
  name: string;
  value: number;
}

// Data for the chart
const data: DataItem[] = [
  { name: 'JavaScript', value: parseFloat(((65.6 / 320.2) * 100).toFixed(1)) },
  { name: 'HTML/CSS', value: parseFloat(((55.1 / 320.2) * 100).toFixed(1)) },  
  { name: 'Python', value: parseFloat(((43.7 / 320.2) * 100).toFixed(1)) },  
  { name: 'SQL', value: parseFloat(((49.6 / 320.2) * 100).toFixed(1)) },     
  { name: 'TypeScript', value: parseFloat(((34.3 / 320.2) * 100).toFixed(1)) },
  { name: 'Bash/Shell', value: parseFloat(((20.3 / 320.2) * 100).toFixed(1)) },
  { name: 'Java', value: parseFloat(((31.4 / 320.2) * 100).toFixed(1)) },   
  { name: 'C++', value: parseFloat(((20.2 / 320.2) * 100).toFixed(1)) },  
];

// Colors for the pie slices
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA00FF', '#FF0099', '#FF3333', '#33FF66'];

// For calculating the label position
const RADIAN = Math.PI / 180;

// Type definition for label props
interface LabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
}

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: LabelProps) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#333333" // Dark color for the text
      fontSize={10} // Smaller font size
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${data[index].name} ${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const TechsUsedChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default TechsUsedChart;
