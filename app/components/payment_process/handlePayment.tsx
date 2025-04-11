'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import { ChevronDown } from 'lucide-react'

export const PaymentOptions = ({ orderData }: any) => {
  const router = useRouter()
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [accountName, setAccountName] = useState("")

  const paymentMethods = [
    { label: 'JazzCash', method: 'jazzcash', img: '/images/jazzcash-logo.png' },
    { label: 'EasyPaisa', method: 'easypaisa', img: '/images/easypaisa-logo.jpg' },
    { label: 'NayaPay', method: 'nayapay', img: '/images/nayapay-logo.png' },
    { label: 'Cash on Delivery', method: 'cod', img: '/images/cod-logo.jpg' },
  ]

  const paymentDetails: any = {
    jazzcash: { number: '+923205421692', link: 'https://play.google.com/store/apps/details?id=com.techlogix.mobilinkcustomer&hl=en' },
    easypaisa: { number: '03182325757', link: 'https://play.google.com/store/apps/details?id=pk.com.telenor.phoenix&hl=en' },
    nayapay: { number: 'PK91NAYA1234503182325757', link: 'https://play.google.com/store/apps/details?id=com.nayapay.app&hl=en' },
  }

  const handleConfirm = async () => {
  if (!selectedMethod) return alert('Please select a payment method');

  setOpenModal(true);

  console.log(orderData)

  const mergedItems = orderData.items.reduce((acc: any, item: any, index: number) => {
    acc[`item${index + 1}`] = item;
    return acc;
  }, {});
  
  const paymentData = {
    orderData: {
      ...orderData,
      items: mergedItems,   // <-- Items ab Object ban gaya
    },
    selectedMethod: selectedMethod,
    accountName: accountName,
    paymentDetails: paymentDetails[selectedMethod],
    delivered: false,
    total_pay_completed: false,
  };

 try {
  const response = await fetch('/api/order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(paymentData, null, 2),
  });
  
  if (response.ok) {
    const result = await response.json();
    console.log(result);
    toast.success('Payment Details Submitted Successfully!')
  } else {
    console.error('Error saving payment data');
    toast.error('Something went wrong while submitting your order. Please try again.')
  }
 } catch(error) {
  console.error('Something went wrong:', error)
    toast.error('Something went wrong. Please try later!')
 }

  console.log("Order Data:", orderData);
  console.log("Selected Method:", selectedMethod);
  console.log("Account Name:", accountName);
};

  return (
    <div className="p-[2rem] space-y-4 min-h-screen max-w-md mx-auto relative z-10 px-4 sm:px-6 lg:px-8 py-12 bg-gradient-to-b from-blue-950 to-gray-600 rounded-lg text-white font-sans">

      <h2 className="text-2xl font-bold mb-4 text-center pb-2 border-b-2">Safe & Easy Payment</h2>

      {/* Dropdown */}
      <div
        onClick={() => setOpen(!open)}
        className="border p-3 rounded-lg flex justify-between items-center cursor-pointer bg-transparent"
      >
        <div className="flex items-center gap-2">
          {selectedMethod ? (
            <>
              <span>{paymentMethods.find(pm => pm.method === selectedMethod)?.label}</span>
              <img src={paymentMethods.find(pm => pm.method === selectedMethod)?.img} alt="" className="w-6 h-6 object-contain" />
            </>
          ) : (
            <span>Select Payment Method</span>
          )}
        </div>
        <div>
        </div>
        <ChevronDown className={`w-5 h-5 duration-200 ${open ? 'rotate-180' : ''}`} />
      </div>

      {open && (
        <div className="border rounded-lg divide-y bg-transparent">
          {paymentMethods.map((pm) => (
            <div
              key={pm.method}
              onClick={() => {
                setSelectedMethod(pm.method)
                setOpen(false)
              }}
              className="flex justify-between items-center p-3 cursor-pointer hover:bg-gray-900/35"
            >
              <span>{pm.label}</span>
              <img src={pm.img} alt={pm.label} className="w-10 h-10 object-contain" />
            </div>
          ))}
        </div>
      )}

      {selectedMethod && selectedMethod !== 'cod' && (
        <div className="bg-gradient-to-b from-blue-300 to bg-gray-300 p-4 rounded space-y-2 text-center">
          <p className="text-sm">Send Payment to this Number:</p>
          <p className="font-bold text-lg pb-2">{paymentDetails[selectedMethod]?.number}</p>
          <a href={paymentDetails[selectedMethod]?.link} target="_blank" className="text-blue-950 border px-4 py-2 rounded-md text-sm hover:bg-blue-950 hover:text-white hover:border-blue-950">
            Pay Now
          </a>
          <p className="text-xs text-gray-600 mt-1 pt-4">After sending payment, enter your account name and click Confirm.</p>
        </div>
      )}

      <div className='flex flex-col gap-4'>
      <div className=''>
                    <label htmlFor="accountName" className="block text-sm font-medium text-white mb-1">
                      Account Name or Receiver Name*
                    </label>
                    <input
                      type="text"
                      id="accountName"
                      value={accountName}
                      onChange={(e) => setAccountName(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md text-white focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
      <button
        onClick={handleConfirm}
        className="w-full bg-gradient-to-b  to-gray-300 text-white border border-white p-3 rounded-lg hover:bg-blue-950 hover:border-blue-950 duration-200 text-sm"
      >
        Confirm Payment
      </button>
      </div>

      {openModal && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
    <div className="bg-gradient-to-b from-blue-950 to-gray-600 p-5 font-mono rounded">
      <h2 className="text-xl font-bold mb-2">Thank You!</h2>
      <p>Your order has been placed successfully ❤</p>
      <p>Thank you for trusting us ❤ <br />Our team will contact you shortly 📞</p>
      <p>Come again.</p>
      <button onClick={() => router.push('/cart')} className="mt-4 px-4 py-2 hover:bg-blue-950 hover:text-white hover:border-blue-950 text-white border border-white rounded">
        Close
      </button>
    </div>
  </div>
)}

    </div>
  )
}
