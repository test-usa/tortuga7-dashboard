import { useState } from 'react';
import { Blog } from '../../types/blog';
import { createBlog } from '../../api/blog';
import toast from 'react-hot-toast';

const BlogForm = () => {
  const [blog, setBlog] = useState<Blog>({
    title: '',
    content: '',
    finalWords: '',
    image: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createBlog(blog);
      toast.success('Blog posted successfully!');
      setBlog({ title: '', content: '', finalWords: '', image: '' });
    } catch (error) {
      toast.error('Failed to post blog');
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='space-y-4 p-6 bg-gray-800 rounded-xl border border-gray-700 max-w-xl mx-auto'
    >
      <input
        name='title'
        value={blog.title}
        onChange={handleChange}
        placeholder='Blog Title'
        className='w-full p-2 rounded bg-gray-700 text-white'
        required
      />
      <textarea
        name='content'
        value={blog.content}
        onChange={handleChange}
        placeholder='Content'
        rows={4}
        className='w-full p-2 rounded bg-gray-700 text-white'
        required
      />
      <textarea
        name='finalWords'
        value={blog.finalWords}
        onChange={handleChange}
        placeholder='Final Words'
        rows={2}
        className='w-full p-2 rounded bg-gray-700 text-white'
        required
      />
      <input
        name='image'
        value={blog.image}
        onChange={handleChange}
        placeholder='Image URL'
        className='w-full p-2 rounded bg-gray-700 text-white'
        required
      />
      <button type='submit' className='w-full bg-indigo-600 py-2 rounded text-white'>
        Post Blog
      </button>
    </form>
  );
};

export default BlogForm;
