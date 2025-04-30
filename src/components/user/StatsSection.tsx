import { useEffect, useState } from "react";
import axios from "axios";
import { UsersIcon, UserPlus, UserCheck, UserX } from "lucide-react";
import { motion } from "framer-motion";
import StatCard from "../common/StatCard";


interface User {
	id: string;
	name: string;
	email: string;
	role: string;
	status: "Active" | "Inactive";
	createdAt: string;
}

const StatsSection = () => {
	const [userStats, setUserStats] = useState({
		totalUsers: 0,
		newUsersToday: 0,
		activeUsers: 0,
		churnRate: "0%",
	});

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const { data } = await axios.get<User[]>("https://tortuga7-backend.onrender.com/users");

				const totalUsers = data.length;

				const activeUsers = data.filter((u) => u.status === "Active").length;
				const inactiveUsers = data.filter((u) => u.status === "Inactive").length;

				// New users today
				const today = new Date().toISOString().split("T")[0];
				const newUsersToday = data.filter((u) => u.createdAt?.startsWith(today)).length;

				// Churn rate = inactive users / total users
				const churnRate = totalUsers > 0 ? ((inactiveUsers / totalUsers) * 100).toFixed(1) + "%" : "0%";

				setUserStats({ totalUsers, newUsersToday, activeUsers, churnRate });
			} catch (err) {
				console.error("Failed to fetch user stats:", err);
			}
		};

		fetchUsers();
	}, []);

	return (
		<motion.div
			className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 1 }}
		>
			<StatCard name='Total Users' icon={UsersIcon} value={userStats.totalUsers.toLocaleString()} color='#6366F1' />
			<StatCard name='New Users Today' icon={UserPlus} value={userStats.newUsersToday} color='#10B981' />
			<StatCard name='Active Users' icon={UserCheck} value={userStats.activeUsers.toLocaleString()} color='#F59E0B' />
			<StatCard name='Churn Rate' icon={UserX} value={userStats.churnRate} color='#EF4444' />
		</motion.div>
	);
};

export default StatsSection;
