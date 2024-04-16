"use client"
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const data = [
    { name: 'Biratnagar', value: 400 },
    { name: 'Pokhara', value: 300 },
    { name: 'Chitwan', value: 300 },
    { name: 'Kathmandu', value: 200 },
    { name: 'Inaruwa', value: 600 },
];

const COLORS = [
    '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF3E3E', '#7D3C98',
    '#FF6B6B', '#FFD700', '#32CD32', '#4B0082', '#8A2BE2', '#FF1493',
    '#1E90FF', '#FF8C00', '#6A5ACD', '#00CED1', '#8B4513', '#2E8B57',
    '#800000', '#008B8B'
];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

function VisitorByBranch() {
    return (
        <section className="p-2 text-black h-[20rem] bg-sky-50 shadow">
            <h1 className="py-3 font-semibold text-center text-gray-700">Visitor By Branch</h1>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart width={400} height={400}>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={115}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </section>
    );
}

export default VisitorByBranch;
