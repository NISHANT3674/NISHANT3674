"use client";

import { useEffect, useState } from "react";

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);

  const addProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/products", {
      method: "POST",
      body: JSON.stringify({ name, description, price }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (data.success) {
      setProducts([...products, data.product]);
      setName("");
      setDescription("");
      setPrice("");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Manage Products</h1>

      <form onSubmit={addProduct}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />
        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <br />
        <button type="submit">Add Product</button>
      </form>

      <hr />
      <h2>Product List:</h2>
      <ul>
        {products.map((p) => (
          <li key={p._id}>
            {p.name} - ₹{p.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
