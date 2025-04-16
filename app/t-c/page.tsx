export default function TermsAndConditions() {
    return (
      <div className="min-h-screen bg-gray-200  text-black px-4 md:px-8 py-10">
        <div className="max-w-5xl mx-auto space-y-8">
          <h1 className="text-4xl font-extrabold text-black text-center mb-6">Terms and Conditions</h1>
  
          {[
            {
              title: "1. Introduction",
              text: "By accessing Design Genie, you agree to the terms laid out on this page. If you disagree with any part, please discontinue using our services."
            },
            {
              title: "2. Orders & Payment",
              text: "Orders must be paid in full before processing. All prices are in PKR and include applicable taxes."
            },
            {
              title: "3. Shipping & Delivery",
              text: "Orders are shipped within 2-3 working days. Estimated delivery time is 5-7 days depending on location."
            },
            {
              title: "4. Returns & Refunds",
              text: "You may return unused products within 7 days. Refunds are initiated after quality check. Return shipping costs may apply."
            },
            {
              title: "5. Product Availability",
              text: "All products are subject to availability. If a product is unavailable after ordering, you will be notified and refunded."
            },
            {
              title: "6. User Responsibilities",
              text: "You agree to provide accurate details and avoid misuse of the platform. You are responsible for keeping your login credentials secure."
            },
            {
              title: "7. Prohibited Uses",
              text: "You may not use our platform for any unlawful purpose, harassment, or harm to the service, company, or other users."
            },
            {
              title: "8. Intellectual Property",
              text: "All content, logos, and designs on Design Genie are our property and protected under copyright law."
            },
            {
              title: "9. Limitation of Liability",
              text: "Design Genie is not liable for indirect damages resulting from your use or inability to use the site."
            },
            {
              title: "10. Changes to Terms",
              text: "We may revise these terms without notice. Continued use of the website constitutes acceptance of the updated terms."
            },
            {
              title: "11. Governing Law",
              text: "These terms shall be governed under the laws of Pakistan. Any disputes will be resolved in the courts of Karachi."
            },
            {
              title: "12. Contact",
              text: "For legal or terms-related queries, reach out to us at support@designgenie.com."
            },
          ].map((section, index) => (
            <section key={index} className="bg-white/10 p-6 rounded-xl shadow-md backdrop-blur-sm border border-white/10">
              <h2 className="text-2xl font-semibold mb-2">{section.title}</h2>
              <p className="text-black leading-relaxed">{section.text}</p>
            </section>
          ))}
        </div>
      </div>
    );
  }