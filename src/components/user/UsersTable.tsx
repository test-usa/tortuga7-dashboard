import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

type User = {
	id: string;
	name: string;
	email: string;
	role: string;
};

const UsersTable = () => {
	const [allUsers, setAllUsers] = useState<User[]>([]);
	const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

	const API_BASE = "https://tortuga7-backend.onrender.com/users";

	// Fetch users on mount
	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const res = await axios.get(API_BASE);
				setAllUsers(res.data);
				setFilteredUsers(res.data);
			} catch (error) {
				console.error("Error fetching users:", error);
			}
		};
		fetchUsers();
	}, []);

	// Handle role update
	const handleToggleRole = async (user: User) => {
		const newRole = user.role === "ADMIN" ? "CLIENT" : "ADMIN";
		try {
			await axios.patch(`${API_BASE}/${user.id}`, { role: newRole });
			const updatedUsers = allUsers.map((u) =>
				u.id === user.id ? { ...u, role: newRole } : u
			);
			setAllUsers(updatedUsers);
			setFilteredUsers(updatedUsers);
		} catch (error) {
			console.error("Failed to update role:", error);
		}
	};

	// Handle delete
	const handleDelete = async (userId: string) => {
		const confirm = window.confirm("Are you sure you want to delete this user?");
		if (!confirm) return;

		try {
			await axios.delete(`${API_BASE}/${userId}`);
			const updatedUsers = allUsers.filter((user) => user.id !== userId);
			setAllUsers(updatedUsers);
			setFilteredUsers(updatedUsers);
		} catch (error) {
			console.error("Failed to delete user:", error);
		}
	};

	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}
		>
			<div className='flex justify-between items-center mb-6'>
				<h2 className='text-xl font-semibold text-gray-100'>Users</h2>
			</div>

			<div className='overflow-x-auto'>
				<table className='min-w-full divide-y divide-gray-700'>
					<thead>
						<tr>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Name</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Email</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Role</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Actions</th>
						</tr>
					</thead>

					<tbody className='divide-y divide-gray-700'>
						{filteredUsers.map((user) => (
							<motion.tr
								key={user.id}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.3 }}
							>
								<td className='px-6 py-4 whitespace-nowrap'>
									<div className='flex items-center'>
										<div className='h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold'>
											{user.name?.charAt(0)}
										</div>
										<div className='ml-4 text-sm font-medium text-gray-100'>{user.name}</div>
									</div>
								</td>

								<td className='px-6 py-4 whitespace-nowrap'>
									<div className='text-sm text-gray-300'>{user.email}</div>
								</td>

								<td className='px-6 py-4 whitespace-nowrap'>
									<span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-800 text-blue-100'>
										{user.role}
									</span>
								</td>

								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
									<button
										onClick={() => handleToggleRole(user)}
										className='text-indigo-400 hover:text-indigo-300 mr-2'
									>
										Make {user.role === "ADMIN" ? "Client" : "Admin"}
									</button>
									<button
										onClick={() => handleDelete(user.id)}
										className='text-red-400 hover:text-red-300'
									>
										Delete
									</button>
								</td>
							</motion.tr>
						))}
					</tbody>
				</table>
			</div>
		</motion.div>
	);
};

export default UsersTable;
