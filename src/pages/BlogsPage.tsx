import AIPoweredInsights from "../components/analytics/AIPoweredInsights";
import Header from "../components/common/Header"


const BlogsPage = () => {
  return (
    <div className='flex-1 overflow-auto relative z-10'>
        <Header title='Blogs' />

<main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">

    <AIPoweredInsights/>
</main>
    </div>
  )
}

export default BlogsPage;
