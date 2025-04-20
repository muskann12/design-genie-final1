'use client';
import { OrderDataType } from '@/helper/componentTypes';
import React, { useEffect, useState } from 'react';
import { PaymentOptions } from './handlePayment';
import { motion } from "framer-motion";

export const Payment_Component = () => {
  const [orderData, setOrderData] = useState<OrderDataType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem('currentOrder');
      if (data) {
        try {
          setOrderData(JSON.parse(data));
        } catch (error) {
          console.error("Error parsing order data:", error);
        }
      }
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f9fafb]">
        <div className="animate-pulse text-center">
          <div className="h-8 w-8 rounded-full bg-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-sm">Fetching payment details...</p>
        </div>
      </div>
    );
  }

  if (!orderData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f9fafb] px-4">
        <div className="max-w-sm text-center bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">No Active Order</h2>
          <p className="text-gray-500 mb-4 text-sm">It looks like you haven’t placed any orders yet.</p>
          <button className="bg-black text-white px-5 py-2 rounded-full text-sm hover:bg-gray-800 transition-all duration-200">
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      <div className="max-w-md mx-auto px-4 py-16">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 text-center"
        >
          <h1 className="text-4xl font-semibold text-gray-900">Checkout</h1>
          <p className="text-sm text-gray-500 mt-2">Secure and seamless payment</p>
        </motion.div>

        {/* Payment Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-xl bg-white shadow-lg p-6 border border-gray-100"
        >
          <PaymentOptions orderData={orderData} />
        </motion.div>

        {/* Security Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-8 text-center text-xs text-gray-400"
        >
          Transactions are protected with end-to-end encryption.
        </motion.div>
      </div>
    </div>
  );
};
