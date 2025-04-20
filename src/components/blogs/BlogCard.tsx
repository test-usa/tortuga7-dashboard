import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // or next/link if using Next.js

const BlogCard = ({ blog }: { blog: any }) => {
  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <img
        src={blog.image}
        alt={blog.title}
        className="rounded-lg mb-4 w-full h-48 object-cover"
      />
      <h2 className="text-xl font-semibold text-gray-100 mb-2">{blog.title}</h2>
      <p className="text-gray-300 mb-4">{blog.summary}</p>
      <Link
        to={`/blogs/${blog.id}`}
        className="inline-block px-4 py-2 rounded-md bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-medium hover:opacity-90 transition"
      >
        Read More
      </Link>
    </motion.div>
  );
};

export default BlogCard