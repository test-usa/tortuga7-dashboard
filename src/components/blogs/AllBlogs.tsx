import { motion } from "framer-motion";
import { TrendingUp, Users, ShoppingBag, DollarSign } from "lucide-react";
import BlogCard from "./BlogCard";

const INSIGHTS = [
	{
		icon: TrendingUp,
		color: "text-green-500",
		insight: "Revenue is up 15% compared to last month, driven primarily by a successful email campaign.",
	},
	{
		icon: Users,
		color: "text-blue-500",
		insight: "Customer retention has improved by 8% following the launch of the new loyalty program.",
	},
	{
		icon: ShoppingBag,
		color: "text-purple-500",
		insight: 'Product category "Electronics" shows the highest growth potential based on recent market trends.',
	},
	{
		icon: DollarSign,
		color: "text-yellow-500",
		insight: "Optimizing pricing strategy could potentially increase overall profit margins by 5-7%.",
	},
];



const blogs = [
    {
      id: '1',
      title: 'Mastering React Hooks',
      summary: 'An in-depth guide to understanding and using React Hooks effectively in modern development.',
      image: 'https://example.com/react-hooks.png',
    },
    {
      id: '1',
      title: 'Mastering React Hooks',
      summary: 'An in-depth guide to understanding and using React Hooks effectively in modern development.',
      image: 'https://example.com/react-hooks.png',
    },
    {
      id: '1',
      title: 'Mastering React Hooks',
      summary: 'An in-depth guide to understanding and using React Hooks effectively in modern development.',
      image: 'https://example.com/react-hooks.png',
    },
    // ...more blogs
  ];

const AllBlogs = () => {
	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-6 border border-gray-700'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.7 }}
		>
			<h2 className='text-xl font-semibold text-gray-100 mb-4'>AI-Powered Insights</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
		</motion.div>
	);
};
export default AllBlogs;
