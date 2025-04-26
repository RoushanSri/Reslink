import React from 'react';
import { MdOutlineWatchLater } from "react-icons/md";
import { FaShippingFast } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";

const OrderSummary=({ orderData })=>{
  const { subtotal = 79.98, shipping = "Free", tax = 8.00, total = 87.98 } = orderData || {};
  
  return (
    <div className="rounded-lg border border-gray-200 p-6 shadow-sm mt-4">
      <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
      
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span>USD {subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span>{shipping}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Tax</span>
          <span>USD {tax.toFixed(2)}</span>
        </div>
        
        <div className="border-t border-gray-200 pt-3 mt-3"></div>
        
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>USD {total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;