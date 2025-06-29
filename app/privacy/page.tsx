export default function PrivacyPolicy() {
    return (
      <div className="min-h-screen bg-gray-200 text-black px-4 md:px-8 py-10">
        <div className="max-w-5xl mx-auto space-y-8">
          <h1 className="text-4xl font-extrabold text-black text-center mb-6">Privacy Policy</h1>
  
          {[
            {
              title: "1. Information We Collect",
              text: "We collect personal details such as your name, email address, shipping address, and payment information to fulfill your orders and enhance your shopping experience."
            },
            {
              title: "2. Use of Your Data",
              text: "We use your data for order processing, improving our products, sending updates, and resolving customer queries."
            },
            {
              title: "3. Cookies & Tracking",
              text: "Cookies help us track website performance, user behavior, and personalize your shopping experience. You can control cookies from your browser settings."
            },
            {
              title: "4. Third-Party Services",
              text: "We may use third-party services for payment processing and delivery, who are obligated to protect your data."
            },
            {
              title: "5. User Rights",
              text: "You can request to view, edit, or delete your personal data by contacting our support team."
            },
            {
              title: "6. Data Retention",
              text: "We retain your data only for as long as necessary for legal or business purposes."
            },
            {
              title: "7. Account Deletion",
              text: "You may delete your account at any time by contacting support. Some data may be retained for legal compliance."
            },
            {
              title: "8. Security",
              text: "We apply strict security measures to safeguard your data, including encryption and regular audits."
            },
            {
              title: "9. Children's Privacy",
              text: "Our services are not directed to individuals under 13. We do not knowingly collect data from children."
            },
            {
              title: "10. Changes to Policy",
              text: "We reserve the right to update our Privacy Policy. Continued use of our services implies acceptance of those changes."
            },
            {
              title: "11. Contact Us",
              text: "For any privacy-related concerns, email us at designgenie.pakistan@gmail.com."
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