import { useEffect, useState } from "react";
import { BarChart2, ShoppingBag, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";
import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import CategoryDistributionChart from "../components/overview/CategoryDistributionChart";
// import SalesOverviewChart from "../components/overview/SalesOverviewChart";
import SalesChannelChart from "../components/overview/SalesChannelChart";


const OverviewPage =  () => {
	const [products, setProducts] = useState([]);
	const [services, setServices] = useState([]);
	const [users, setUsers] = useState([])
	// const users = useUsers()
	console.log(users)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [productRes, serviceRes, userRes] = await Promise.all([
					fetch("https://tortuga7-backend.onrender.com/products"),
					fetch("https://tortuga7-backend.onrender.com/services"),
					fetch("https://tortuga7-backend.onrender.com/users"),
				]);

				const productData = await productRes.json();
				const serviceData = await serviceRes.json();
				const userData = await userRes.json()

				setProducts(productData?.data || []);
				setServices(serviceData || []);
				setUsers(userData || [])
			} catch (error) {
				console.error("Failed to fetch data:", error);
			}
		};

		fetchData();
	}, []);

	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='Overview' />
			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				{/* STATS */}
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard name='Total Services' icon={Zap} value={services.length} color='#6366F1' />
					<StatCard name='Total Users' icon={Users} value={users.length} color='#8B5CF6' />
					<StatCard name='Total Products' icon={ShoppingBag} value={products.length.toString()} color='#EC4899' />
					<StatCard name='Conversion Rate' icon={BarChart2} value='12.5%' color='#10B981' />
				</motion.div>

				{/* CHARTS */}
				<div className='grid grid-cols-1 lg:grid-cols-1 gap-8'>
					{/* <SalesOverviewChart /> */}
					<CategoryDistributionChart services={services}/>
					<SalesChannelChart />
				</div>
			</main>
		</div>
	);
};

export default OverviewPage;
