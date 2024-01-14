// Category.jsx
import { useState, useEffect } from "react";
import SideBar from "./SideBar";
import NavBar from "./Navbar";

const Category = () => {
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    status: "inactive",
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:4000/categories');
      const data = await response.json();

      if (response.ok) {
        setCategories(data.data);
      } else {
        console.error('Error fetching categories:', data.error || data.message);
      }
    } catch (error) {
      console.error('Error fetching categories:', error.message);
    }
  };

  const handleAddItemClick = () => {
    setIsAddingItem(true);
    setSearchQuery('');
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSearchQuery('');
    setIsAddingItem(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  };

  const handleSaveItem = async () => {
    try {
      const response = await fetch('http://localhost:4000/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCategory),
      });

      const data = await response.json();

      if (response.ok) {
        setCategories((prevCategories) => [...prevCategories, data.data]);
      } else {
        console.error('Error saving category:', data.error || data.message);
      }
    } catch (error) {
      console.error('Error saving category:', error.message);
    }

    // Reset state after saving
    setIsAddingItem(false);
    setSearchQuery('');
    setNewCategory({
      name: "",
      description: "",
      status: "inactive",
    });
  };

  const handleCancelAddItem = () => {
    // Reset state without saving
    setIsAddingItem(false);
    setSearchQuery('');
    setNewCategory({
      name: "",
      description: "",
      status: "inactive",
    });
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
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
              <h1 className="text-3xl font-bold mb-4">Category Page</h1>
              {!isAddingItem && (
                <div className="flex space-x-4 mb-4">
                  <input
                    type="text"
                    placeholder="Search Items"
                    className="p-2 border border-gray-300 rounded"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={handleAddItemClick}
                  >
                    Add Item
                  </button>
                </div>
              )}
              {isAddingItem ? (
                <div className="mb-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Category Name"
                    className="p-2 border border-gray-300 rounded mr-2"
                    value={newCategory.name}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    name="description"
                    placeholder="Category Description"
                    className="p-2 border border-gray-300 rounded mr-2"
                    value={newCategory.description}
                    onChange={handleInputChange}
                  />
                  <select
                    name="status"
                    className="p-2 border border-gray-300 rounded"
                    value={newCategory.status}
                    onChange={handleInputChange}
                  >
                    <option value="inactive">Inactive</option>
                    <option value="active">Active</option>
                  </select>
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded ml-2"
                    onClick={handleSaveItem}
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
                  {filteredCategories.map(category => (
                    <div
                      key={category._id}
                      className="cursor-pointer bg-gray-200 p-2 mb-2"
                      onClick={() => handleCategoryClick(category)}
                    >
                      {category.name}
                    </div>
                  ))}
                </div>
              )}
              {selectedCategory && (
                <div>
                  <h2 className="text-xl font-semibold mb-2">Category Details</h2>
                  <p>Name: {selectedCategory.name}</p>
                  <p>Description: {selectedCategory.description}</p>
                  <p>Status: {selectedCategory.status}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;
