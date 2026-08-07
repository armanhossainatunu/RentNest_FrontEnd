"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  data: {
    year: string;
    revenue: number;
  }[];
}

export default function YearlyRevenueChart({ data }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Yearly Revenue</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="year" />

              <YAxis />

              <Tooltip
                formatter={(value) => `৳ ${Number(value).toLocaleString()}`}
              />

              <Line
                type="monotone"
                dataKey="revenue"
                name="Revenue"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
