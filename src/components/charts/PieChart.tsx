import { PieChart as RechartsPieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

type PieChartProps = {
  data: Array<{
    name: string;
    value: number;
    color?: string;
  }>;
  dataKey?: string;
  nameKey?: string;
  height?: number;
  colors?: string[];
  innerRadius?: number;
  outerRadius?: number;
  tooltip?: boolean;
  legend?: boolean;
};

const PieChart = ({
  data,
  dataKey = 'value',
  nameKey = 'name',
  height = 300,
  colors = ['#003366', '#FFC107', '#4CAF50', '#2196F3', '#9E9E9E'],
  innerRadius = 0,
  outerRadius = 80,
  tooltip = true,
  legend = true
}: PieChartProps) => {
  // Use provided colors or fallback to defaults
  const getColors = (index: number) => {
    return data[index]?.color || colors[index % colors.length];
  };

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsPieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={outerRadius}
          innerRadius={innerRadius}
          dataKey={dataKey}
          nameKey={nameKey}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={getColors(index)} />
          ))}
        </Pie>
        {tooltip && <Tooltip />}
        {legend && (
          <Legend
            layout="vertical"
            verticalAlign="middle"
            align="right"
            wrapperStyle={{ fontSize: 12, paddingLeft: 20 }}
          />
        )}
      </RechartsPieChart>
    </ResponsiveContainer>
  );
};

export default PieChart; 