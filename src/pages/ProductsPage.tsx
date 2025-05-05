import Header from "../components/common/Header";
import ProductList from "../components/products/ProductList";
// import ProductForm from "../components/products/ProductForm";

const ProductsPage = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Services -> Products" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <ProductList />
        {/* <ProductForm /> */}
      </main>
    </div>
  );
};
export default ProductsPage;
