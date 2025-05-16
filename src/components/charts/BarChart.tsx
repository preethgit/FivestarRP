import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type BarChartProps = {
  data: Array<{
    name: string;
    value: number;
    [key: string]: any;
  }>;
  dataKey: string;
  xAxisKey?: string;
  height?: number;
  color?: string;
  tooltip?: boolean;
  grid?: boolean;
};

const BarChart = ({
  data,
  dataKey,
  xAxisKey = 'name',
  height = 300,
  color = '#003366',
  tooltip = true,
  grid = false
}: BarChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsBarChart
        data={data}
        margin={{
          top: 5,
          right: 5,
          left: 5,
          bottom: 5,
        }}
      >
        {grid && <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E0E0E0" />}
        <XAxis 
          dataKey={xAxisKey} 
          axisLine={false} 
          tickLine={false} 
          tick={{ fontSize: 12, fill: '#757575' }}
        />
        <YAxis 
          axisLine={false} 
          tickLine={false} 
          tick={{ fontSize: 12, fill: '#757575' }} 
          tickFormatter={(value) => {
            if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
            if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
            return value;
          }}
        />
        {tooltip && <Tooltip />}
        <Bar dataKey={dataKey} fill={color} radius={[4, 4, 0, 0]} />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};

export default BarChart; 