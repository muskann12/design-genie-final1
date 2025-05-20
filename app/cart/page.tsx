'use client';
import { useState, useEffect } from "react";
import { Trash2, Plus, Minus, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { CartItem } from "@/helper/componentTypes";
import Payment_Confirmation from "../payment_process/page";

const CartPage = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [discount, setDiscount] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(200);
  const [discountCode, setDiscountCode] = useState("");
  const [isDiscountApplied, setIsDiscountApplied] = useState(false);
  const router = useRouter();

  // Form fields
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        try {
          const parsedCart = JSON.parse(storedCart).map((item: any) => ({
            ...item,
            quantity: item.quantity || 1,
            id: item.id || Math.random().toString(36).substring(2, 9)
          }));
          setCart(parsedCart);
        } catch (error) {
          console.error("Error parsing cart data:", error);
          localStorage.removeItem("cart");
        }
      }
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const removeItemFromCart = (index: number) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success("Item removed from cart");
  };

  const updateQuantity = (index: number, increment: boolean) => {
    const updatedCart = [...cart];
    const item = updatedCart[index];
    item.quantity = Math.max(1, item.quantity + (increment ? 1 : -1));
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success("Quantity updated");
  };

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const applyDiscount = () => {
    if (isDiscountApplied) {
      toast.info("Discount already applied");
      return;
    }
    
    if (discountCode === "WELCOME500") {
      setDiscount(500);
      setIsDiscountApplied(true);
      toast.success("PKR 500 discount applied!");
    } else if (discountCode === "SAVE250") {
      setDiscount(250);
      setIsDiscountApplied(true);
      toast.success("PKR 250 discount applied!");
    } else {
      toast.error("Invalid discount code");
    }
  };

  const resetDiscount = () => {
    setDiscount(0);
    setDiscountCode("");
    setIsDiscountApplied(false);
  };

  const finalTotal = Math.max(0, calculateSubtotal() - discount + deliveryFee);

  const validateForm = () => {
    if (!fullName.trim()) {
      toast.error("Please enter your full name");
      return false;
    }
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Please enter a valid email");
      return false;
    }
    if (!contactNumber.trim() || contactNumber.length < 10) {
      toast.error("Please enter a valid contact number");
      return false;
    }
    if (!city.trim()) {
      toast.error("Please enter your city");
      return false;
    }
    if (!fullAddress.trim()) {
      toast.error("Please enter your full address");
      return false;
    }
    return true;
  };

  const handleCheckout = async () => {
    if (!validateForm()) return;
    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    const orderData = {
      items: cart,
      customer: {
        fullName,
        email,
        contactNumber,
        address: {
          city,
          area,
          fullAddress
        }
      },
      payment: {
        subtotal: calculateSubtotal(),
        discount,
        deliveryFee,
        total: finalTotal
      },
      createdAt: new Date().toISOString()
    };

    try {
      console.log("Order submitted:", orderData);
      localStorage.setItem("currentOrder", JSON.stringify(orderData));
      router.push("/payment_process");
      //<Payment_Confirmation />
      
      // Clear cart after successful order
      setCart([]);
      localStorage.removeItem("cart");
      
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Failed to place order. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-pulse flex flex-col items-center">
          <ShoppingCart className="w-12 h-12 text-gray-400 mb-4" />
          <p className="text-gray-500">Loading your cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Shopping Cart</h1>
          <button 
            onClick={() => router.push("/shop")}
            className="mt-4 inline-flex items-center px-4 py-2 bg-blue-950 text-white rounded-md hover:bg-blue-900 transition-colors"
          >
            Continue Shopping
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <ShoppingCart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h2 className="text-xl font-medium text-gray-600">Your cart is empty</h2>
            <p className="text-gray-500 mt-2">Browse our products to add items to your cart</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item, index) => (
                <div key={item.id} className="bg-white  rounded-lg shadow-sm overflow-hidden">
                  <div className="p-4 md:p-6 flex flex-col md:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-32 h-32 object-contain rounded border border-gray-200"
                      />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                        <button
                          onClick={() => removeItemFromCart(index)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                      
                      {item.designArea && (
                        <p className="text-sm text-gray-600 mt-1">Design: {item.designArea}</p>
                      )}
                      <p className="text-sm text-gray-600">Color: {item.color}</p>
                      {item.size && <p className="text-sm text-gray-600">Size: {item.size}</p>}
                      
                      <div className="mt-4 flex items-center text-black justify-between">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => updateQuantity(index, false)}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                          >
                            <Minus className="w-4 h-4 text-gray-700" />
                          </button>
                          <span className="font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(index, true)}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                          >
                            <Plus className="w-4 h-4 text-gray-700" />
                          </button>
                        </div>
                        <p className="text-lg font-semibold">PKR {(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg text-black font-bold mb-4">Order Summary</h2>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium text-black" >PKR {calculateSubtotal().toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery</span>
                    <span className="font-medium text-black">PKR {deliveryFee.toLocaleString()}</span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-PKR {discount.toLocaleString()}</span>
                    </div>
                  )}
                  
                  <div className="border-t pt-3 flex text-black justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>PKR {finalTotal.toLocaleString()}</span>
                  </div>
                </div>

                <div className="mt-6">
                  <label htmlFor="discount" className="block text-sm font-medium text-gray-700 mb-1">
                    Discount Code
                  </label>
                  <div className="flex gap-2 text-black">
                    <input
                      type="text"
                      id="discount"
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                      className="flex-1 px-3 py-2 border rounded-md text-gray-700 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter code"
                      disabled={isDiscountApplied}
                    />
                    {isDiscountApplied ? (
                      <button
                        onClick={resetDiscount}
                        className="px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                      >
                        Remove
                      </button>
                    ) : (
                      <button
                        onClick={applyDiscount}
                        className="px-3 py-2 bg-blue-950 text-white rounded-md hover:bg-blue-900 transition-colors"
                      >
                        Apply
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Customer Information */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-bold mb-4 text-black">Customer Information</h2>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md text-gray-700 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md text-gray-700 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700 mb-1">
                      Contact Number *
                    </label>
                    <input
                      type="tel"
                      id="contactNumber"
                      value={contactNumber}
                      onChange={(e) => setContactNumber(e.target.value)}
                      className="w-full px-3 text-blackpy-2 border rounded-md text-gray-700 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      id="city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md text-gray-700 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-1">
                      Area / Landmark
                    </label>
                    <input
                      type="text"
                      id="area"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md text-gray-700 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Address *
                    </label>
                    <textarea
                      id="address"
                      value={fullAddress}
                      onChange={(e) => setFullAddress(e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border rounded-md text-gray-700 focus:ring-blue-500 focus:border-blue-500"
                      required
                    ></textarea>
                  </div>
                </div>
                
                <button
                  onClick={handleCheckout}
                  className="w-full mt-6 py-3 bg-blue-950 text-white rounded-md hover:bg-blue-900 transition-colors font-medium"
                >
                  Proceed to Checkout - PKR {finalTotal.toLocaleString()}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;