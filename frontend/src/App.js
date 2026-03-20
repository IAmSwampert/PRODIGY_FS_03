import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/products")
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <div style={{ fontFamily: "Arial", background: "#f5f5f5", minHeight: "100vh" }}>
      
      {/* Navbar */}
      <div style={{
        background: "#222",
        color: "white",
        padding: "15px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <h2>Swayam Mart 🛒</h2>
        <div>Cart: {cart.length}</div>
      </div>

      <div style={{ padding: "20px" }}>
        <h2 style={{ marginBottom: "20px" }}>Products</h2>

        {/* Product Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "20px"
        }}>
          {products.map((p) => (
            <div key={p._id} style={{
              background: "white",
              borderRadius: "10px",
              padding: "15px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              textAlign: "center"
            }}>
              
              {/* ✅ FIXED IMAGE */}
              <img
  src={`/images/${p.name.toLowerCase()}.webp`}
  alt={p.name}
  onError={(e) => {
    e.target.src = "/images/default.webp";
  }}
  style={{
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: "8px"
  }}
/>

              <h3 style={{ margin: "10px 0" }}>{p.name}</h3>
              <p style={{ fontSize: "14px", color: "gray" }}>{p.description}</p>
              <h4 style={{ margin: "10px 0" }}>₹{p.price}</h4>

              <button
                onClick={() => addToCart(p)}
                style={{
                  background: "#007bff",
                  color: "white",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "5px",
                  cursor: "pointer"
                }}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        {/* Cart Section */}
        <h2 style={{ marginTop: "40px" }}>Cart</h2>
        <div style={{
          background: "white",
          padding: "15px",
          borderRadius: "10px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
        }}>
          {cart.length === 0 ? (
            <p>No items in cart</p>
          ) : (
            cart.map((item, index) => (
              <div key={index} style={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "1px solid #eee",
                padding: "8px 0"
              }}>
                <span>{item.name}</span>
                <span>₹{item.price}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;