import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Table from "../components/DataTable";
import { getCategories, addCategory, updateCategory, deleteCategory } from "../api";
import { format } from "date-fns";
const schema = yup.object().shape({
  name: yup.string().required("Car Name is required"),
});

function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState("");
  const [deleteCarId, setDeleteCarId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [columns, setColumns] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data } = await getCategories();
      setCategories(data);
      setLoading(false);
  
      if (data.length > 0) {
        const dynamicColumns = Object.keys(data[0])
          .filter((key) => key !== '__v' && key !== '_id') 
          .map((key) => ({
            header: key.charAt(0).toUpperCase() + key.slice(1), 
            accessor: key,
          }));
  
        setColumns([
          { header: "Index", accessor: "index", sortable: true }, 
          ...dynamicColumns,
          { header: "Actions", accessor: "actions", sortable: true }, 
        ]);
        const categoriesWithIndex = data.map((category, index) => ({
          ...category,
          index: index + 1, 
          createdAt: category.createdAt ? format(new Date(category.createdAt), 'dd/MM/yyyy') : '',
          updatedAt: category.updatedAt ? format(new Date(category.updatedAt), 'dd/MM/yyyy') : '',
        }));
  
        setCategories(categoriesWithIndex);
      }
    } catch (e) {
      console.error("Error fetching categories:", e);
    }
  };

  const onSubmit = async (formData) => {
    try {
      if (formData._id) {
        await updateCategory(formData);
      } else {
        await addCategory(formData);
      }
      setSuccess("Car info uploaded successfully!");
      fetchCategories();
      reset();
      setShowModal(false);
    } catch (e) {
      console.error("Error submitting form:", e);
    }
  };

  const handleEdit = (car) => {
    setShowModal(true);
    Object.keys(car).forEach((key) => setValue(key, car[key]));
  };

  const handleDelete = (carId) => {
    setShowDeleteModal(true);
    setDeleteCarId(carId);
  };

  const confirmDelete = async () => {
    try {
      await deleteCategory(deleteCarId);
      setSuccess("Car deleted successfully!");
      fetchCategories();
      setShowDeleteModal(false);
    } catch (e) {
      console.error("Error deleting car:", e);
    }
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden p-4">
      <h1 className="text-4xl font-bold mb-4 text-gray-100">Categories</h1>
      <p className="text-gray-400 text-lg">Monitor key metrics and system performance from a unified dashboard.</p>

      {loading && <p className="text-gray-500">Loading categories...</p>}
      {success && <p className="text-green-500">{success}</p>}

      <div className="flex justify-end mt-8 space-x-4">
        <button
          className="mb-4 px-4 py-2 bg-gray-100 hover:bg-gray-600 text-black rounded "
          onClick={() => {
            reset();
            setShowModal(true);
          }}
        >
          Add New Category
        </button>
       
      </div>

      <Table data={categories} columns={columns} onEdit={handleEdit} onDelete={handleDelete} />

      {showModal && (
        <div className="fixed inset-0 backdrop-blur-md  bg-black bg-opacity-10 flex items-center justify-center">
          <div className="bg-black modal p-6 rounded shadow-lg  md:ml-32 p-16">
            <h2 className="text-4xl font-bold mb-4 text-white">Add / Edit Car</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-rows-1  bg-black px-2">
                <div className="grid grid-cols-12 gap-2  justify-center">
                  <div className="col-span-12 md:col-span-6">
                    {" "}
                    <div className="mb-8">
                      <label className="text-white text-xl font-medium font-jakarta mb-2">Car Name</label>
                      <input {...register("name")} className="w-full bg-zinc-900 mt-2 rounded focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-100 py-3 pl-4 leading-8 transition-colors duration-200 ease-in-out" placeholder="Enter car name" />
                      {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                    </div>
                   
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button className="px-4 py-2 bg-red-800 text-white rounded hover:bg-gray-400" type="button" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button className="px-4 py-2 bg-gray-100 text-black rounded hover:bg-green-600" type="submit">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

{showDeleteModal && (
  <div className="fixed inset-0 bg-black backdrop-blur-md bg-opacity-50 flex items-center justify-center">
    <div className="bg-black p-6 rounded shadow-lg w-1/3">
      <h2 className="text-xl font-bold text-white mb-4">Delete Category</h2>
      <p className="text-white font-jakarta">Are you sure you want to delete this category?</p>
      <div className="flex justify-end mt-4 space-x-2">
        <button
          className="px-4 py-2 bg-gray-300 text-white rounded hover:bg-gray-400"
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
