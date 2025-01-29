import React, { useState, useEffect } from "react";
import Table from "../components/DataTable";
import { getCategories, addCategory, updateCategory, deleteCategory } from "../api";
import AlertSuccess from "../components/AlertSuccess";
import AlertOne from "../components/AlertOne";
const newCar = {
  name: "",
};
function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); // State to toggle modal
  const [success, setSuccess] = useState([]);
  const [form, setForm] = useState(newCar);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteCategory, setDeleteCategory] = useState(false);
  const fetchCategories = async () => {
    try {
      const { data } = await getCategories();
      setCategories(data);
    } catch (e) {}
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async () => {
    try {
      if (form._id) {
        const { data } = await updateCategory(form);
      } else {
        const { data } = await addCategory(form);
      }

      setSuccess(["Car info is uploaded successfully"]);
      setForm(newCar);
    } catch (e) {}
  };
  const changeInput = (e) => {
    setError([]);
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(form);
  };
  const handleEdit = async (category) => {
    setShowModal(true);
    setForm({ ...category });
  };

  const handleDelete = async (category) => {
    setShowDeleteModal(true);
    setDeleteCategory(category)

  };
  const confirmDelete = async(category) => {
    alert(category)
    try {
      const { data } = await deleteCategory(deleteCategory);
      setSuccess(["Car info is uploaded successfully"]);
      setForm(newCar);
    } catch (e) {}
  };

  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Actions", accessor: "Actions" },
  ];

  return (
    <div className="flex h-screen flex-col overflow-hidden p-4">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>

      {loading && <p className="text-gray-500">Loading categories...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      <div className="flex justify-end space-x-4">
        <button className="mb-4 w-100 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => setShowModal(true)}>
          Add Category
        </button>
      </div>
      <Table data={categories} columns={columns} onEdit={handleEdit} onDelete={handleDelete} />
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">{form._id ? "Edit Category" : "Add New Category"}</h2>
            <input type="text" onChange={changeInput} name={"name"} value={form.name} className="w-full bg-zinc-900 rounded  focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-100 py-3 pl-4 leading-8 transition-colors duration-200 ease-in-out" placeholder="Category Name" />
            <div className="flex justify-end space-x-4">
              <button className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600" onClick={handleAddCategory}>
                Add
              </button>
            </div>
          </div>
       
        </div>
      )}
       {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Delete Category</h2>
            <p>Are you sure you want to delete "?</p>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Categories;
