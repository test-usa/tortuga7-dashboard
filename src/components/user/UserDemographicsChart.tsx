import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import axios from "axios";

const COLORS = ["#6366F1", "#10B981", "#F59E0B", "#EF4444"]; // Extendable for more roles

const UserRolesChart = () => {
  const [roleData, setRoleData] = useState<{ name: string; value: number }[]>(
    []
  );

  useEffect(() => {
    const fetchUserRoles = async () => {
      try {
        const { data } = await axios.get(
          "https://tortuga7-backend.onrender.com/users"
        );

        const roleCount: Record<string, number> = {};

        data.forEach((user: any) => {
          const role = user.role || "unknown";
          roleCount[role] = (roleCount[role] || 0) + 1;
        });

        const formattedData = Object.entries(roleCount).map(
          ([role, count]) => ({
            name: role.charAt(0).toUpperCase() + role.slice(1), // Capitalize
            value: count,
          })
        );

        setRoleData(formattedData);
      } catch (error) {
        console.error("Failed to fetch user roles:", error);
      }
    };

    fetchUserRoles();
  }, []);

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 lg:col-span-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <h2 className="text-xl font-semibold text-gray-100 mb-4">
        User Roles Distribution
      </h2>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={roleData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
            >
              {roleData.map((_entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55, 0.8)",
                borderColor: "#4B5563",
              }}
              itemStyle={{ color: "#E5E7EB" }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default UserRolesChart;
