import React from 'react';
import { MdOutlineWatchLater } from "react-icons/md";
import { FaShippingFast } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";

const StatusUpdates = ({ statusData })=> {
  const { 
    currentStatus = "In Transit", 
    expectedDelivery = "April 22, 2023", 
    invoiceStatus = "Pending" 
  } = statusData || {};
  
  return (
    <div className="rounded-lg border border-gray-200 p-6 shadow-sm mt-4">
      <h2 className="text-2xl font-bold mb-4">Status Updates</h2>
      
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="bg-blue-100 rounded-full p-3 h-12 w-12 flex items-center justify-center">
            <MdOutlineWatchLater className="text-blue-600 text-xl" />
          </div>
          <div>
            <p className="font-semibold text-lg">Current Status</p>
            <p className="text-gray-600">{currentStatus}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="bg-green-100 rounded-full p-3 h-12 w-12 flex items-center justify-center">
            <FaShippingFast className="text-green-600 text-xl" />
          </div>
          <div>
            <p className="font-semibold text-lg">Expected Delivery</p>
            <p className="text-gray-600">{expectedDelivery}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="bg-yellow-100 rounded-full p-3 h-12 w-12 flex items-center justify-center">
            <IoDocumentTextOutline className="text-yellow-600 text-xl" />
          </div>
          <div>
            <p className="font-semibold text-lg">Invoice Status</p>
            <p className="text-gray-600">{invoiceStatus}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatusUpdates;