// ProductForm.tsx
import { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom"; // if using react-router
import { Product } from "../../types/type";
import {
  createProduct,
  getProductById,
  updateProduct,
} from "../../api/productService";

export default function ProductForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [form, setForm] = useState<Partial<Product>>({
    productName: "",
    productModel: "",
    brandName: "",
    slug: "",
    description: "",
    keyApplications: [],
    keyFeatures: [],
    specifications: [],
    images: [],
    price: 0,
    available: true,
    serviceName: "",
  });

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    const data = await getProductById(id!);
    setForm(data);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      await updateProduct(id, form);
    } else {
      await createProduct(form);
    }
    navigate("/");
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        {id ? "Update" : "Create"} Product
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="productName"
          placeholder="Product Name"
          value={form.productName}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          type="text"
          name="brandName"
          placeholder="Brand Name"
          value={form.brandName}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          type="text"
          name="slug"
          placeholder="Slug"
          value={form.slug}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {id ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
}
