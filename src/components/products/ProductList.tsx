// ProductList.tsx
import { useEffect, useState } from "react";
import { Product } from "../../types/type";
import { deleteProduct, getProducts } from "../../api/productService";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const data = await getProducts();
    console.log(data)
    setProducts(data);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(id);
      fetchProducts();
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <ul className="space-y-4">
        {products.map((product) => (
          <li key={product.id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{product.productName}</h2>
            <p className="text-gray-600">{product.brandName}</p>
            <div className="flex gap-2 mt-2">
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded"
                onClick={() => alert(JSON.stringify(product, null, 2))}>
                View
              </button>
              <button
                className="bg-green-500 text-white px-3 py-1 rounded"
                onClick={() => window.location.href = `/edit/${product.id}`}>
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => handleDelete(product.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
