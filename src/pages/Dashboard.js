import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Table from "../components/DataTable";
import { getCar, addCar, updateCar, deleteCar, getCategories } from "../api";
import { format } from 'date-fns';
const schema = yup.object().shape({
  name: yup.string().required("Car Name is required"),
  model: yup.string().required("Car Model is required"),
  color: yup.string().required("Car Color is required"),
  makeYear: yup
    .number()
    .typeError("Make Year must be a number")
    .min(1900, "Year must be after 1900")
    .max(new Date().getFullYear(), "Year cannot be in the future")
    .required("Make Year is required"),
  registrationNumber: yup
    .string()
    .matches(/^[A-Za-z0-9]+$/, "Invalid Registration Number")
    .required("Registration Number is required"),
});

function Dashboard() {
  const [cars, setCars] = useState([]);
  const [categories, setCategories] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState("");
  const [deleteCarId, setDeleteCarId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
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
    fetchCars();
    fetchCategories();
  }, []);

  const fetchCars = async () => {
     try {
       const { data } = await getCar();
       setCars(data);
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
   
         const carsWithIndex = data.map((car, index) => ({
           ...car,
           index: index + 1, 
           createdAt: car.createdAt ? format(new Date(car.createdAt), 'dd/MM/yyyy') : '',
           updatedAt: car.updatedAt ? format(new Date(car.updatedAt), 'dd/MM/yyyy') : '',
         }));
   
         setCars(carsWithIndex);
       }
     } catch (e) {
       console.error("Error fetching cars:", e);
     }
   }

  const onSubmit = async (formData) => {
    try {
      if (formData._id) {
        await updateCar(formData);
      } else {
        await addCar(formData);
      }
      setSuccess("Car info uploaded successfully!");
      fetchCars();
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
      await deleteCar(deleteCarId);
      setSuccess("Car deleted successfully!");
      fetchCars();
      setShowDeleteModal(false);
    } catch (e) {
      console.error("Error deleting car:", e);
    }
  };
  const fetchCategories = async () => {
        try {
          const { data } = await getCategories();
          setCategories(data);
          setLoading(false);
        } catch (e) {
          console.error("Error fetching cars:", e);
        }
      };

 

  return (
    <div className="flex h-screen flex-col overflow-hidden p-4">
      <h1 className="text-4xl font-bold mb-4 text-gray-100">Overview</h1>
      <p className="text-gray-400 text-lg">
        Monitor key metrics and system performance from a unified dashboard.
      </p>

      {loading && <p className="text-gray-500">Loading cars...</p>}
      {success && <p className="text-green-500">{success}</p>}

      <div className="flex justify-end mt-8 space-x-4">
        <button
          className="mb-4 px-4 py-2 bg-gray-100 hover:bg-gray-600 text-black rounded "
          onClick={() => {
            reset();
            setShowModal(true);
          }}
        >
          Add New Car
        </button>
       
      </div>

      <Table data={cars} columns={columns} onEdit={handleEdit} onDelete={handleDelete} />

      {showModal && (
        <div className="fixed inset-0 backdrop-blur-md  bg-black bg-opacity-10 flex items-center justify-center">
          <div className="bg-black modal p-6 rounded shadow-lg  md:ml-32 p-16">
            <h2 className="text-4xl font-bold mb-4 text-white">Add / Edit Car</h2>
            <form onSubmit={handleSubmit(onSubmit)}>

            <div className="grid grid-rows-1  bg-black px-2">
      <div className="grid grid-cols-12 gap-2  justify-center">
        <div className="col-span-12 md:col-span-6">     <div className="mb-8">
                <label className="text-white text-xl font-medium font-jakarta mb-2">Car Name</label>
                <input
                  {...register("name")}
                  className="w-full bg-zinc-900 mt-2 rounded focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-100 py-3 pl-4 leading-8 transition-colors duration-200 ease-in-out"
                  placeholder="Enter car name"
                />
                {errors.name && <p className="text-red-500">{errors.name.message}</p>}
              </div>
              <div className="mb-8">
                <label className="text-white text-xl font-medium font-jakarta mb-2">Car Type</label>
                <select
                  {...register("carType")}
                  className="w-full bg-zinc-900 mt-2 rounded focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-100 py-4 pl-4 leading-8 transition-colors duration-200 ease-in-out"
                >
                  {categories.map((category) => (
    <option key={category._id} value={category._id}>
      {category.name}
    </option>
  ))}
                </select>
                {errors.carType && <p className="text-red-500">{errors.carType.message}</p>}
              </div>
              <div className="mb-8">
                <label className="text-white text-xl font-medium font-jakarta ">Car Color</label>
                <input
                  {...register("color")}
                 className="w-full bg-zinc-900 mt-2 rounded focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-100 py-3 pl-4 leading-8 transition-colors duration-200 ease-in-out"
                  placeholder="Enter car color"
                />
                {errors.color && <p className="text-red-500">{errors.color.message}</p>}
              </div>
             
</div>

        <div className="col-span-12 md:col-span-6 pl-2">
        <div className="mb-8">
                <label className="text-white text-xl font-medium font-jakarta mb-2">Car Registration Number</label>
                <input
                  {...register("registrationNumber")}
                 className="w-full bg-zinc-900 mt-2 rounded focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-100 py-3 pl-4 leading-8 transition-colors duration-200 ease-in-out"
                  placeholder="Enter registration number"
                />
                {errors.registrationNumber && <p className="text-red-500">{errors.registrationNumber.message}</p>}
              </div>
        <div className="mb-8">
                <label className="text-white text-xl font-medium font-jakarta mb-2">Car Model</label>
                <input
                  {...register("model")}
                  className="w-full bg-zinc-900 mt-2 rounded focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-100 py-3 pl-4 leading-8 transition-colors duration-200 ease-in-out"
                  placeholder="Enter car model"
                />
                {errors.model && <p className="text-red-500">{errors.model.message}</p>}
              </div>
              <div className="">
                <label className="text-white text-xl font-medium font-jakarta mb-2">Car Make Year</label>
                <input
                  {...register("makeYear")}
                  type="number"
                 className="w-full bg-zinc-900 mt-2 rounded focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-100 py-3 pl-4 leading-8 transition-colors duration-200 ease-in-out"
                  placeholder="Enter make year"
                />
                {errors.makeYear && <p className="text-red-500">{errors.makeYear.message}</p>}
              </div>
          </div></div></div>
              <div className="flex justify-end space-x-4">
                <button
                  className="px-4 py-2 bg-red-800 text-white rounded hover:bg-gray-400"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
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
    <div className="bg-black p-6 rounded  shadow-lg w-1/3">
      <h2 className="text-xl text-white font-bold mb-4">Delete Car</h2>
      <p className="text-white font-jakarta">Are you sure you want to delete this car?</p>
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

export default Dashboard;
