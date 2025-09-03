import React from "react";
import { FaInstagram, FaFacebookF, FaEnvelope, FaWhatsapp } from "react-icons/fa";
import "@fontsource/inter/400.css";

const Footer: React.FC = () => {
  const phoneNumber = "+92-3205421692"; // Your phone number
  const whatsappUrl = `https://wa.me/${phoneNumber}`; // WhatsApp URL

  return (
    <footer className="bg-gradient-to-r from-[#000] to-[#09203f] text-white p-8 rounded-tl-[150px]">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Stay Connected Section */}
        <div className="flex flex-col ml-16 items-center md:items-start">
          <h2 className="text-3xl ml-7 font-extrabold mb-4">STAY CONNECTED</h2>
          <input
            type="email"
            placeholder="Enter Your Email Address"
            className="p-8 rounded-[88px] w-full md:w-96 text-gray-200 focus:outline-none focus:ring-2 focus:ring-black-400"
          />
        </div>

        {/* Social Icons */}
        <div className="flex space-x-6 mt-7 md:mt-0 mr-[39px]">
          <a href="https://www.instagram.com/design.genie.shop/" target="_blank" className="relative group font-inter">
            <div className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-white">
              <FaInstagram className="text-white text-2xl group-hover:text-gray-400" />
            </div>
          </a>
          <a href="https://www.facebook.com/profile.php?id=61579150530934" target="_blank" rel="noopener noreferrer" className="relative group font-inter">
            <div className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-white">
              <FaFacebookF className="text-white text-2xl group-hover:text-gray-400" />
            </div>
          </a>
          <a href="mailto: designgenie.pakistan@gmail.com" rel="noopener noreferrer" target="_blank" className="relative group font-inter">
            <div className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-white">
              <FaEnvelope className="text-white text-2xl group-hover:text-gray-400" />
            </div>
          </a>
        </div>
      </div>

      {/* Footer Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 text-center md:text-left font-inter">
        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links:</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-gray-400">Home</a></li>
            <li><a href="/about" className="hover:text-gray-400">About Us</a></li>
            <li><a href="/shop" className="hover:text-gray-400">Shop</a></li>
            <li><a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">Chat on WhatsApp</a></li>
            <li><a href="#" className="hover:text-gray-400">FAQs</a></li>
          </ul>
        </div>

        {/* Help & Support */}
        <div>
          <h3 className="text-lg font-semibold mb-4 font-iN">Help & Support:</h3>
          <ul className="space-y-2">
            <li><a href="/privacy" className="hover:text-gray-400">Privacy Policy</a></li>
            <li><a href="/t-c" className="hover:text-gray-400">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Information:</h3>
          <ul className="space-y-2">
            <li>Email: designgenie.pakistan@gmail.com</li>
            <li>Phone: {phoneNumber}</li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-8 border-t border-gray-600 pt-4 font-inter">
        <p>&copy; 2025 [Design Genie]. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;