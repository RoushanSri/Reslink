import React from "react";
import { Link, Outlet } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { MdOutlineFileCopy } from "react-icons/md";

function Orders() {
  return (
    <div className="w-full min-h-screen flex flex-col p-2 sm:p-4 md:px-8 lg:px-16 xl:px-24 text-black">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center rounded-lg p-2 sm:p-4 gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl sm:text-3xl font-bold">Orders</h1>
          <p className="text-gray-600 text-base sm:text-xl">
            Manage and track all procurement orders.
          </p>
        </div>
        <div className="flex gap-2 sm:gap-4">
          <button className="text-black bg-white font-bold py-1 sm:py-2 px-2 sm:px-4 rounded-sm border border-gray-300 text-sm sm:text-base">
            <span className="text-black flex gap-1 sm:gap-2 items-center">
              <MdOutlineFileCopy />
              <span className="hidden md:inline">Export</span>
            </span>
          </button>
          <button className="text-white bg-black font-bold py-1 sm:py-2 px-2 sm:px-4 rounded text-sm sm:text-base">
            <Link to={"/addOrder"} className="text-white flex gap-1 sm:gap-2 items-center">
              <FaPlus />
              <span className="hidden md:inline">New Order</span>
            </Link>
          </button>
        </div>
      </div>
      <div className="flex gap-2 mt-2 mb-2 p-2 sm:p-4 rounded-lg overflow-x-auto">
        <div className="flex gap-1 sm:gap-4 mb-2 sm:mb-4 w-full sm:w-auto md:w-1/2 lg:w-1/3 rounded-md">
          <Link to={"/"} className="rounded-sm p-1 flex-1 bg-white text-center whitespace-nowrap">
            <span className="text-black text-sm sm:text-base">All Orders</span>
          </Link>
          <Link className="rounded-sm p-1 flex-1 bg-gray-100 text-center whitespace-nowrap">
            <span className="text-gray-500 text-sm sm:text-base">Pending</span>
          </Link>
          <Link className="rounded-sm p-1 flex-1 bg-gray-100 text-center whitespace-nowrap">
            <span className="text-gray-500 text-sm sm:text-base">Needs Approval</span>
          </Link>
        </div>
      </div>
      <div className="flex-grow p-2 sm:p-4 w-full bg-white rounded-lg shadow-md">
        <Outlet />
      </div>
    </div>
  );
}

export default Orders;