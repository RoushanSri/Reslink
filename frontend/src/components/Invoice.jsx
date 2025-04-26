import React from "react";
import { IoDocumentTextOutline } from "react-icons/io5";
import { IoWarning } from "react-icons/io5";
import { FaLock } from "react-icons/fa";
import { useOutletContext } from "react-router-dom";

function Invoice() {

    const { order } = useOutletContext();

  return (
    <div className="border border-gray-200 rounded-lg p-6 w-full shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <IoDocumentTextOutline className="text-2xl" />
        <h2 className="text-2xl font-bold">Invoice Management</h2>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 flex items-center gap-2">
        <IoWarning className="text-yellow-500 text-xl" />
        <span className="text-yellow-700 font-medium">Invoice Pending</span>
      </div>
      <div className="border border-dashed border-gray-300 rounded-lg p-6 mb-6 text-center">
        <div className="flex justify-center mb-4">
          <FaLock className="text-gray-500 text-4xl" />
        </div>
        <h3 className="text-xl font-bold mb-2">Operations Team Access Only</h3>
        <p className="text-gray-600">
          Only members of the operations team can upload invoices for delivered orders
        </p>
      </div>
      <div className="border border-gray-200 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-2 mb-1">
          <IoWarning className="text-gray-700" />
          <span className="font-bold">Important</span>
        </div>
        <p className="text-gray-800 ml-6">
          Please contact the operations team to upload the invoice for this order.
        </p>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-4">Invoice Requirements</h3>
        <ul className="list-disc pl-5 space-y-2 text-gray-600">
          <li>Must include the order ID ({order?.order})</li>
          <li>Must match the total amount ({order?.total})</li>
          <li>Must include vendor details and tax information</li>
          <li>Must be legible and complete</li>
        </ul>
      </div>
    </div>
  );
}

export default Invoice