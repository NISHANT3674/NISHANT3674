// /src/app/admin/AdminClient.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { signOut } from "next-auth/react";
import Image from "next/image";

type Product = {
  _id: string;
  name: string;
  description?: string;
  composition?: string;
  dosage?: string;
  indications?: string[] | string;
  category?: string;
  imageUrl?: string;
  quantity?: string;
};

export default function AdminPage() {
  const formRef = useRef<HTMLFormElement | null>(null);

  const [formData, setFormData] = useState({
    _id: "",
    name: "",
    quantity: "",
    description: "",
    composition: "",
    dosage: "",
    indications: "",
    category: "",
    imageUrl: "",
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    if (data.success) setProducts(data.products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const method = formData._id ? "PUT" : "POST";
    const endpoint = formData._id
      ? `/api/products/${formData._id}`
      : "/api/products";

    const res = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        indications: formData.indications
          .split(",")
          .map((i) => i.trim())
          .filter(Boolean),
      }),
    });

    const data = await res.json();

    if (data.success) {
      setFormData({
        _id: "",
        name: "",
        quantity: "",
        description: "",
        composition: "",
        dosage: "",
        indications: "",
        category: "",
        imageUrl: "",
      });
      fetchProducts();
    }

    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    const confirmed = confirm("Are you sure you want to delete this product?");
    if (!confirmed) return;

    const res = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();
    if (data.success) fetchProducts();
    else alert("Failed to delete product");
  };

  return (
    <div className="p-6">
      <div className="flex">
        <h1 className="text-2xl font-bold mb-4 text-[#1B3F5F]">
          Admin Dashboard
        </h1>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="ml-auto mb-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 mb-6">
        <input
          type="text"
          placeholder="Product Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full p-2 border border-gray-600 text-[#1B3F5F] rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full p-2 border border-gray-600 text-[#1B3F5F] rounded"
        />
        <input
          type="text"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={(e) =>
            setFormData({ ...formData, quantity: e.target.value })
          }
          className="w-full p-2 border border-gray-600 text-[#1B3F5F] rounded"
        />
        <textarea
          placeholder="Composition"
          value={formData.composition}
          onChange={(e) =>
            setFormData({ ...formData, composition: e.target.value })
          }
          className="w-full p-2 border border-gray-600 text-[#1B3F5F] rounded"
        />
        <textarea
          placeholder="Dosage"
          value={formData.dosage}
          onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
          className="w-full p-2 border border-gray-600 text-[#1B3F5F] rounded"
        />
        <textarea
          placeholder="Indications (comma-separated)"
          value={formData.indications}
          onChange={(e) =>
            setFormData({ ...formData, indications: e.target.value })
          }
          className="w-full p-2 border border-gray-600 text-[#1B3F5F] rounded"
        />
        <input
          type="text"
          placeholder="Category"
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          className="w-full p-2 border border-gray-600 text-[#1B3F5F] rounded"
        />
        <input
          type="text"
          placeholder="Image URL (optional)"
          value={formData.imageUrl}
          onChange={(e) =>
            setFormData({ ...formData, imageUrl: e.target.value })
          }
          className="w-full p-2 border border-gray-600 text-[#1B3F5F] rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:cursor-pointer"
          disabled={loading}
        >
          {loading
            ? "Saving..."
            : formData._id
            ? "Update Product"
            : "Add Product"}
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-2 text-[#1B3F5F]">Products:</h2>
      <div className="space-y-2">
        {products.map((p) => (
          <div
            key={p._id}
            className="p-4 border border-gray-600 rounded space-y-2"
          >
            <p className="text-[#1B3F5F]">
              <strong className="text-[#1B3F5F]">{p.name}</strong> -{" "}
              <span className="text-sm text-[#1B3F5F]">{p.category}</span>
            </p>
            <p className="text-[#1B3F5F]">{p.description}</p>
            <p className="text-sm text-[#1B3F5F]">
              Composition: {p.composition}
            </p>
            <p className="text-sm text-[#1B3F5F]">Dosage: {p.dosage}</p>
            <p className="text-sm text-[#1B3F5F]">
              Indications:{" "}
              {Array.isArray(p.indications)
                ? p.indications.join(", ")
                : p.indications}
            </p>
            {p.imageUrl && (
              <Image
                src={`/products/${p.imageUrl}.png`}
                alt={p.name}
                className="h-60 object-contain rounded mb-4"
                width={200}
                height={100}
              />
            )}
            <button
              onClick={() => handleDelete(p._id)}
              className="px-3 py-1 bg-red-600 text-white rounded hover:cursor-pointer"
            >
              Delete
            </button>
            <button
              onClick={() => {
                setFormData({
                  _id: p._id,
                  name: p.name,
                  description: p.description || "",
                  composition: p.composition || "",
                  dosage: p.dosage || "",
                  indications: Array.isArray(p.indications)
                    ? p.indications.join(", ")
                    : p.indications || "",
                  category: p.category || "",
                  imageUrl: p.imageUrl || "",
                  quantity: p.quantity || "",
                });
                formRef.current?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-3 py-1 bg-yellow-500 text-white rounded ml-2 hover:cursor-pointer"
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
