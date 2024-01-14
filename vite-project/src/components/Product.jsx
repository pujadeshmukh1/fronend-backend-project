import { useState, useEffect } from 'react';
import SideBar from './SideBar';
import NavBar from './Navbar';

const Products = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({
    Category: '',
    ProductName: '',
    PackSize: '',
    MRP: '',
    ProductImage: '',
    Status: 'inactive',
  });
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:4000/products');
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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleAddProductClick = () => {
    setIsAddingProduct(true);
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
      // Ensure the provided category exists
      const existingCategory = await fetch(`http://localhost:4000/categories/${newProduct.Category}`);
  
      if (!existingCategory.ok) {
        const errorData = await existingCategory.json();
        console.error('Error saving product:', errorData.message || 'Category not found');
        // You can display a user-friendly message or take other actions here
        return; // Exit the function if the category is not found
      }
  
      const response = await fetch('http://localhost:4000/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setProducts((prevProducts) => [...prevProducts, data.data]);
      } else {
        console.error('Error saving product:', data.error || data.message);
        // You can display a user-friendly message or take other actions here
      }
    } catch (error) {
      console.error('Error saving product:', error.message);
      // You can display a user-friendly message or take other actions here
    }
  
    // Reset state after saving
    setIsAddingProduct(false);
    setSearchQuery('');
    setNewProduct({
      Category: '',
      ProductName: '',
      PackSize: '',
      MRP: '',
      ProductImage: '',
      Status: 'inactive',
    });
  };
  
  
  

  const handleCancelAddProduct = () => {
    // Reset state without saving
    setIsAddingProduct(false);
    setSearchQuery('');
    setNewProduct({
      Category: '',
      ProductName: '',
      PackSize: '',
      MRP: '',
      ProductImage: '',
      Status: 'inactive',
    });
  };

  const filteredProducts = products.filter((product) =>
    product.Category.toLowerCase().includes(searchQuery.toLowerCase())
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
          <div className="flex container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Products Page</h1>
            {isAddingProduct ? (
              <div className="mb-4">
                {/* Add Product Form */}
                <input
                  type="text"
                  name="Category"
                  placeholder="Category"
                  className="p-2 border border-gray-300 rounded mr-2"
                  value={newProduct.Category}
                  onChange={handleInputChange}
                />

                <input
                  type="text"
                  name="ProductName"
                  placeholder="Product Name"
                  className="p-2 border border-gray-300 rounded mr-2"
                  value={newProduct.ProductName}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="PackSize"
                  placeholder="Pack Size"
                  className="p-2 border border-gray-300 rounded mr-2"
                  value={newProduct.PackSize}
                  onChange={handleInputChange}
                />
                <input
                  type="number"
                  name="MRP"
                  placeholder="MRP"
                  className="p-2 border border-gray-300 rounded mr-2"
                  value={newProduct.MRP}
                  onChange={handleInputChange}
                />
                <input
                  type="file"
                  name="ProductImage"
                  placeholder="ProductImage"
                  className="p-2 border border-gray-300 rounded mr-2"
                  value={newProduct.ProductImage}
                  onChange={handleInputChange}
                />
                <select
                  name="Status"
                  className="p-2 border border-gray-300 rounded"
                  value={newProduct.Status}
                  onChange={handleInputChange}
                >
                  <option value="inactive">Inactive</option>
                  <option value="active">Active</option>
                </select>
                <div>
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded ml-2"
                    onClick={handleSaveProduct}
                  >
                    Save Product
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded ml-2"
                    onClick={handleCancelAddProduct}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-x-4 mb-4">
                {/* Search Input and Add Product Button */}
                <input
                  type="text"
                  placeholder="Search Products"
                  className="p-2 border border-gray-300 rounded"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={handleAddProductClick}
                >
                  Add Product
                </button>
              </div>
            )}
            <div className="">
              <h2 className="text-xl font-semibold mb-2">Product List</h2>
              <ul>
                {filteredProducts.map((product) => (
                  <li key={product._id} className="mb-1">
                    {product.Category}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
