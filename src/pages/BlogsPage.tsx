// import AllBlogs from "../components/blogs/AllBlogs";
// import Header from "../components/common/Header"

// const BlogsPage = () => {
//   return (
//     <div className='flex-1 overflow-auto relative z-10'>
//         {/* <Header title='Blogs' />

// <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">

//     <AllBlogs/>
// </main> */}

//     </div>
//   )
// }

// export default BlogsPage;

import { useEffect, useState } from "react";
import { Blog, BlogResponse } from "../types/blog";
import { fetchBlogs, updateBlog, deleteBlog } from "../api/blog";
import toast from "react-hot-toast";
import BlogForm from "../components/blogs/BlogForm";
import Header from "../components/common/Header";
import { AnimatePresence, motion } from "framer-motion";

const BlogsPage = () => {
  const [blogs, setBlogs] = useState<BlogResponse | null>(null);
  const [editBlog, setEditBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const loadBlogs = async () => {
    try {
      setLoading(true);
      const data = await fetchBlogs();
      setBlogs(data);
    } catch (err) {
      toast.error("Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteBlog(id);
      toast.success("Blog deleted!");
      loadBlogs();
    } catch {
      toast.error("Error deleting blog");
    }
  };

  return (
    <div className="space-y-6 flex-1 overflow-auto relative z-10">
      <Header title="Manage Blogs" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <div className="flex items-center justify-end mb-10">
          <button
            onClick={() => setShowModal(true)}
            className="bg-green-600 px-4 py-2 rounded text-white hover:bg-green-700 transition"
          >
            + Create Blog
          </button>
        </div>

        {loading ? (
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="w-12 h-12 border-4 border-purple-400 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogs?.data?.map((blog: Blog) => (
              <motion.div
                key={blog?.id}
                className="bg-gray-800 p-4 rounded-xl border border-gray-700 space-y-2"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <img
                  src={blog?.image}
                  alt={blog?.title}
                  className="rounded-md h-40 w-full object-cover"
                />
                <h3 className="text-xl font-semibold text-white">
                  {blog?.title}
                </h3>
                <p className="text-gray-300 line-clamp-2">{blog.content}</p>
                <div className="flex space-x-3 mt-2">
                  <button
                    onClick={() => setEditBlog(blog)}
                    className="bg-blue-600 px-4 py-1 rounded text-white hover:bg-blue-700 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(blog.id!)}
                    className="bg-red-600 px-4 py-1 rounded text-white hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Animated Modal */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Backdrop */}
              <motion.div
                className="absolute inset-0 bg-black bg-opacity-50"
                onClick={() => setShowModal(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />

              {/* Modal content */}
              <motion.div
                className="relative z-10 bg-gray-900 p-6 rounded-xl max-w-xl w-full border border-gray-700"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-white">
                    Create New Blog
                  </h3>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-white hover:text-red-500 text-2xl font-bold"
                  >
                    &times;
                  </button>
                </div>
                <BlogForm
                  onSuccess={() => {
                    loadBlogs();
                    setShowModal(false);
                  }}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default BlogsPage;
