// Product.jsx
import React, { useState, useEffect } from "react";
import SideBar from "./SideBar";
import NavBar from "./Navbar";

const Product = () => {
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    packsize: 0,
    mrp: 0,
    image: "",
    status: "inactive",
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);

  // Product API routes
  const getProductApi = 'http://localhost:4000/products';

  // Fetch products function
  const fetchProducts = async () => {
    try {
      const response = await fetch(getProductApi);
      const data = await response.json();

      if (response.ok) {
        setProducts(data.data);
      } else {
        console.error('Error fetching products:', data.error || data.message);
      }
    } catch (error) {
      console.error('Error fetching products:', error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddItemClick = () => {
    setIsAddingItem(true);
    setSearchQuery('');
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setSearchQuery('');
    setIsAddingItem(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSaveProduct = async () => {
    try {
      const response = await fetch(getProductApi, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newProduct.name,
          category: newProduct.category,
          packsize: newProduct.packsize,
          mrp: newProduct.mrp,
          image: newProduct.image,
          status: newProduct.status,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setProducts((prevProducts) => [...prevProducts, data.data]);
      } else {
        console.error('Error saving product:', data.error || data.message);
      }
    } catch (error) {
      console.error('Error saving product:', error.message);
    }

    // Reset state after saving
    setIsAddingItem(false);
    setSearchQuery('');
    setNewProduct({
      name: "",
      category: "",
      packsize: 0,
      mrp: 0,
      image: "",
      status: "inactive",
    });
  };

  const handleCancelAddItem = () => {
    // Reset state without saving
    setIsAddingItem(false);
    setSearchQuery('');
    setNewProduct({
      name: "",
      category: "",
      packsize: 0,
      mrp: 0,
      image: "",
      status: "inactive",
    });
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div>
        <div>
          <NavBar />
        </div>
        <div className="flex">
          <div>
            <SideBar />
          </div>
          <div className="container mx-auto p-4">
            <div className="bg-gray-100 p-4 border">
              <h1 className="text-3xl font-bold mb-4">Product Page</h1>
              {!isAddingItem && (
                <div className="flex space-x-4 mb-4">
                  <input
                    type="text"
                    placeholder="Search Products"
                    className="p-2 border border-gray-300 rounded"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={handleAddItemClick}
                  >
                    Add Product
                  </button>
                </div>
              )}
              {isAddingItem ? (
                <div className="mb-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    className="p-2 border border-gray-300 rounded mr-2"
                    value={newProduct.name}
                    onChange={handleInputChange}
                  />

                  <input
                    type="string"
                    name="packsize"
                    placeholder="Product packsize"
                    className="p-2 border border-gray-300 rounded mr-2"
                    value={newProduct.packsize}
                    onChange={handleInputChange}
                  />

                  <input
                    type="number"
                    name="mrp"
                    placeholder="Product MRP"
                    className="p-2 border border-gray-300 rounded mr-2"
                    value={newProduct.mrp}
                    onChange={handleInputChange}
                  />

                  <input
                    type="text"
                    name="image"
                    placeholder="Product Image URL"
                    className="p-2 border border-gray-300 rounded mr-2"
                    value={newProduct.image}
                    onChange={handleInputChange}
                  />

                  <input
                    type="text"
                    name="category"
                    placeholder="Product category"
                    className="p-2 border border-gray-300 rounded mr-2"
                    value={newProduct.category}
                    onChange={handleInputChange}
                  />
                  <select
                    name="status"
                    className="p-2 border border-gray-300 rounded"
                    value={newProduct.status}
                    onChange={handleInputChange}
                  >
                    <option value="inactive">Inactive</option>
                    <option value="active">Active</option>
                  </select>
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded ml-2"
                    onClick={handleSaveProduct}
                  >
                    Save
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded ml-2"
                    onClick={handleCancelAddItem}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div>
                  {filteredProducts.map(product => (
                    <div
                      key={product._id}
                      className="cursor-pointer bg-gray-200 p-2 mb-2"
                      onClick={() => handleProductClick(product)}
                    >
                      {product.name}
                    </div>
                  ))}
                </div>
              )}
              {selectedProduct && (
                <div>
                  <h2 className="text-xl font-semibold mb-2">Product Details</h2>
                  <p>Name: {selectedProduct.name}</p>
                  <p>Pack Size: {selectedProduct.packsize}</p>
                  <p>MRP: ${selectedProduct.mrp}</p>
                  <p>Image: <img src={selectedProduct.image} alt={selectedProduct.name} /></p>
                  <p>Category: {selectedProduct.category}</p>
                  <p>Status: {selectedProduct.status}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
