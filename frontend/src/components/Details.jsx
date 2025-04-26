import React from "react";
import { useOutletContext } from "react-router-dom";
import { IoCheckmarkCircle } from "react-icons/io5";

function Details() {
  const { order } = useOutletContext();
  
  return (
    <div className="flex flex-col gap-4 p-4 w-full bg-white rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full">
          <h1 className="text-xl font-semibold mb-4">Order Information</h1>
          <div className="space-y-2">
            <div className="flex flex-col sm:flex-row">
              <h2 className="w-full sm:w-1/3 text-gray-500">Ordered By:</h2>
              <span>{order?.person}</span>
            </div>
            <div className="flex flex-col sm:flex-row">
              <h2 className="w-full sm:w-1/3 text-gray-500">Order Date:</h2>
              <span>{order?.date}</span>
            </div>
            <div className="flex flex-col sm:flex-row">
              <h2 className="w-full sm:w-1/3 text-gray-500">Project:</h2>
              <span>{order?.project}</span>
            </div>
            <div className="flex flex-col sm:flex-row">
              <h2 className="w-full sm:w-1/3 text-gray-500">Status:</h2>
              <span>{order?.status}</span>
            </div>
          </div>
        </div>
        <div className="w-full">
          <h1 className="text-xl font-semibold mb-4">Shipping Information</h1>
          <div className="space-y-2">
            <div className="flex flex-col">
              <h2 className="text-gray-500">Delivery Address:</h2>
              <span className="break-words">{order?.address}</span>
            </div>
            <div className="flex flex-col">
              <h2 className="text-gray-500">Tracking Number:</h2>
              <span className="break-words">{order?.tracking}</span>
            </div>
            <div className="flex flex-col">
              <h2 className="text-gray-500">Est. Delivery:</h2>
              <span>{order?.delivery}</span>
            </div>
          </div>
        </div>
      </div>
      
      <hr className="my-2" />
      <div className="flex flex-col gap-3">
        <h1 className="text-xl font-semibold">Approval Status</h1>
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex gap-4 items-center">
            <div>
              <IoCheckmarkCircle size={24} color="green"/>
            </div>
            <div className="flex flex-col">
              <span className="font-medium">Kalyan Approval</span>
              <span className="text-gray-600">Approved</span>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <div>
              <IoCheckmarkCircle size={24} color="green"/>
            </div>
            <div className="flex flex-col">
              <span className="font-medium">Tanush Approval</span>
              <span className="text-gray-600">Approved</span>
            </div>
          </div>
        </div>
      </div>
      
      <hr className="my-2" />
      <div className="flex flex-col gap-1">
        <span className="font-medium">Remarks</span>
        <span className="text-gray-700">{order?.remarks || "Priority shipment"}</span>
      </div>
    </div>
  );
}

export default Details;