"use client";

import { useState, useEffect } from "react";
import { signOut } from "next-auth/react";
import { useRef } from "react";

export default function AdminPage() {
  const formRef = useRef<HTMLFormElement | null>(null);

  const [formData, setFormData] = useState({
    _id: "",
    name: "",
    description: "",
    composition: "",
    dosage: "",
    indications: "",
    category: "",
    imageUrl: "",
  });

  const [products, setProducts] = useState([]);
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
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
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
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full p-2 border rounded"
        />
        <textarea
          placeholder="Composition"
          value={formData.composition}
          onChange={(e) =>
            setFormData({ ...formData, composition: e.target.value })
          }
          className="w-full p-2 border rounded"
        />
        <textarea
          placeholder="Dosage"
          value={formData.dosage}
          onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <textarea
          placeholder="Indications (comma-separated)"
          value={formData.indications}
          onChange={(e) =>
            setFormData({ ...formData, indications: e.target.value })
          }
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Category"
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Image URL (optional)"
          value={formData.imageUrl}
          onChange={(e) =>
            setFormData({ ...formData, imageUrl: e.target.value })
          }
          className="w-full p-2 border rounded"
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

      <h2 className="text-xl font-semibold mb-2">Products:</h2>
      <div className="space-y-2">
        {products.map((p: any) => (
          <div key={p._id} className="p-4 border rounded space-y-2">
            <p>
              <strong>{p.name}</strong> -{" "}
              <span className="text-sm">{p.category}</span>
            </p>
            <p>{p.description}</p>
            <p className="text-sm text-gray-600">
              Composition: {p.composition}
            </p>
            <p className="text-sm text-gray-600">Dosage: {p.dosage}</p>
            <p className="text-sm text-gray-600">
              Indications:{" "}
              {Array.isArray(p.indications)
                ? p.indications.join(", ")
                : p.indications}
            </p>
            {p.imageUrl && (
              <img
                src={`/products/${p.imageUrl}.png`}
                alt={p.name}
                className="h-40 mt-2"
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
                  description: p.description,
                  composition: p.composition,
                  dosage: p.dosage,
                  indications: Array.isArray(p.indications)
                    ? p.indications.join(", ")
                    : p.indications,
                  category: p.category,
                  imageUrl: p.imageUrl,
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
