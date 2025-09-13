'use client'
import { useState } from "react";

export default function TopHeader() {
  const [show, setShow] = useState(true);

  return (
    show && (
      <div className="bg-[#040b1f] text-white py-1 flex justify-center items-center">
        <p className="text-lg font-thin text-center animate-pulse">
         PARVAAZ – Grab Your <span className="font-bold">10% OFF</span> Today!
        </p>
      </div>
    )
  );
}
