"use client";
import React from "react";
import { PieChart, Pie, Cell } from "recharts";
import Image from "next/image";

const RADIAN = Math.PI / 180;
const data: { name: string; value: number; color: string }[] = [
  { name: "A", value: 80, color: "#ff0000" },
  { name: "B", value: 45, color: "#00ff00" },
  { name: "C", value: 25, color: "#0000ff" },
];

const cx: number = 200;
const cy: number = 250;
const iR: number = 50;
const oR: number = 100;
const value: number = 50;

const needle = (
  value: number,
  data: { name: string; value: number; color: string }[],
  cx: number,
  cy: number,
  iR: number,
  oR: number,
  color: string
): JSX.Element[] => {
  let total: number = data.reduce((sum, entry) => sum + entry.value, 0);
  const angle: number = 180.0 * (1 - value / total);

  const length: number = (iR + 2 * oR) / 3;
  const sin: number = Math.sin(-RADIAN * angle);
  const cos: number = Math.cos(-RADIAN * angle);
  const r: number = 5;

  const x0: number = cx;
  const y0: number = cy;
  const xba: number = x0 + r * sin;
  const yba: number = y0 - r * cos;
  const xbb: number = x0 - r * sin;
  const ybb: number = y0 + r * cos;
  const xp: number = x0 + length * cos;
  const yp: number = y0 + length * sin;

  return [
    <circle key="needle-circle" cx={x0} cy={y0} r={r} fill={color} stroke="none" />,
    <path
      key="needle-path"
      d={`M${xba} ${yba} L${xbb} ${ybb} L${xp} ${yp} Z`}
      fill={color}
      stroke="none"
    />,
  ];
};

const ProgressIndicatorChart: React.FC = () => {
  return (
    <div className="bg-white rounded-xl w-full h-full p-4">
      {/* TITLE */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold">Student Progress</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>

      {/* PIE CHART */}
      <PieChart width={400} height={500}>
        <Pie
          dataKey="value"
          startAngle={180}
          endAngle={0}
          data={data}
          cx={cx}
          cy={cy}
          innerRadius={iR}
          outerRadius={oR}
          fill="#8884d8"
          stroke="none"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        {needle(value, data, cx, cy, iR, oR, "#d0d000")}
      </PieChart>
    </div>
  );
};

export default ProgressIndicatorChart;
