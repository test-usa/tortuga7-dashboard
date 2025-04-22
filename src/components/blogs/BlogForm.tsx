import { useState, useEffect } from 'react';
import { Blog } from '../../types/blog';

interface BlogFormProps {
  onSubmit: (blog: Blog) => void;
  initialData?: Blog;
  isEditing?: boolean;
}

const BlogForm = ({ onSubmit, initialData, isEditing }: BlogFormProps) => {
  const [blog, setBlog] = useState<Blog>({
    title: '',
    content: '',
    image: '',
    date: "",
  });

  useEffect(() => {
    if (initialData) setBlog(initialData);
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(blog);
    setBlog({ title: '', content: '', image: '', date: "", finalWords: ""});
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4 p-6 bg-gray-800 rounded-xl border border-gray-700'>
      <input
        name='title'
        value={blog.title}
        onChange={handleChange}
        placeholder='Title'
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
      <input
        name='image'
        value={blog.image}
        onChange={handleChange}
        placeholder='Image URL'
        className='w-full p-2 rounded bg-gray-700 text-white'
        required
      />
      {/* <input
        name='author'
        value={blog.author}
        onChange={handleChange}
        placeholder='Author Name'
        className='w-full p-2 rounded bg-gray-700 text-white'
        required
      /> */}
      <button type='submit' className='w-full bg-indigo-600 py-2 rounded text-white'>
        {isEditing ? 'Update Blog' : 'Add Blog'}
      </button>
    </form>
  );
};

export default BlogForm;
