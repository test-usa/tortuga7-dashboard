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




import { useEffect, useState } from 'react';
import { Blog } from '../types/blog';
import { fetchBlogs, createBlog, updateBlog, deleteBlog } from '../api/blog';

import toast from 'react-hot-toast';
import BlogForm from '../components/blogs/BlogForm';

const BlogsPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [editBlog, setEditBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(false);

  const loadBlogs = async () => {
    try {
      setLoading(true);
      const data = await fetchBlogs();
      setBlogs(data.data);
    } catch (err) {
      toast.error('Failed to load blogs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const handleCreate = async (blog: Blog) => {
    try {
      await createBlog(blog);
      toast.success('Blog added!');
      loadBlogs();
    } catch {
      toast.error('Error creating blog');
    }
  };

  const handleUpdate = async (blog: Blog) => {
    if (!blog._id) return;
    try {
      await updateBlog(blog._id, blog);
      toast.success('Blog updated!');
      loadBlogs();
      setEditBlog(null);
    } catch {
      toast.error('Error updating blog');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteBlog(id);
      toast.success('Blog deleted!');
      loadBlogs();
    } catch {
      toast.error('Error deleting blog');
    }
  };

  return (
    <div className='p-6 space-y-6 flex-1 overflow-auto relative z-10'>
      <h2 className='text-2xl font-semibold'>Manage Blogs</h2>
      <BlogForm
        onSubmit={editBlog ? handleUpdate : handleCreate}
        initialData={editBlog || undefined}
        isEditing={!!editBlog}
      />

      {loading ? (
        <div className='text-center text-gray-400'>Loading blogs...</div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {blogs?.map((blog) => (
            <div
              key={blog._id}
              className='bg-gray-800 p-4 rounded-xl border border-gray-700 space-y-2'
            >
              <img src={blog.image} alt={blog.title} className='rounded-md h-40 w-full object-cover' />
              <h3 className='text-xl font-semibold text-white'>{blog.title}</h3>
              <p className='text-gray-300 line-clamp-2'>{blog.content}</p>
              <p className='text-sm text-gray-400'>By {blog.author}</p>
              <div className='flex space-x-3 mt-2'>
                <button
                  onClick={() => setEditBlog(blog)}
                  className='bg-blue-600 px-4 py-1 rounded text-white'
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(blog._id!)}
                  className='bg-red-600 px-4 py-1 rounded text-white'
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogsPage;

