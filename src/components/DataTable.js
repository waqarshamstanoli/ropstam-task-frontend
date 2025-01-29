import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa"; // Import icons

const DataTable = ({ data, columns, onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [rowsPerPage] = useState(5); // Number of rows per page

  // Calculate the start and end indices for the current page
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  // Total pages
  const totalPages = Math.ceil(data.length / rowsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="overflow-x-auto bg-black">
      <table className="min-w-full shadow-md rounded-lg">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className="px-4 py-6 text-left text-xl font-bold text-gray-100"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentRows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={rowIndex % 2 === 0 ? "" : "bg-gray-900"}
            >
              {columns.map((column, colIndex) => (
                <td
                  key={colIndex}
                  className="px-4 py-6 text-lg font-medium text-gray-100 border-t"
                >
                  {column.accessor === "Actions" ? (
                    // Render action icons
                    <div className="flex space-x-4">
                      <button
                        onClick={() => onEdit(row)}
                        className="text-gray-100 hover:text-blue-600"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => onDelete(row)}
                        className="text-gray-100 hover:text-blue-600"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ) : (
                    row[column.accessor]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center py-4 px-6 bg-gray-800">
        <button
          onClick={goToPreviousPage}
          className={`px-4 py-2 text-gray-100 bg-gray-700 rounded hover:bg-gray-600 ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-gray-100">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={goToNextPage}
          className={`px-4 py-2 text-gray-100 bg-gray-700 rounded hover:bg-gray-600 ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DataTable;
