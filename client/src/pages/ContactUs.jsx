import React, { useState } from 'react'
import SocialIcons from '../components/common/SocialIcons'

// const ContactUs = () => {
//   return (
//      <div className="flex flex-col items-center gap-8 py-24 h-screen">
//       <h2 className="text-3xl">Contact Us</h2>
//       <div className="w-1/2 flex flex-col gap-4">
//         <p>
//           We’re here to help!
//         </p>
//         <p><span className="font-bold">Email: </span>khushi.johri01@gmail.com</p>
//         <p><span className="font-bold">Social Media: </span> <div className='inline-block ml-5'><SocialIcons /></div></p>
//         <p><span className="font-bold">Office Hours: </span>All time</p>
//         <p>Feel free to contact us directly whenever you face any issues.</p>
//         </div>
//     </div>
//   )
// }


const ContactUs = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for contacting us! We'll respond soon.");
    // In real app → send data to backend / email service
  };

  return (
    <div className="flex flex-col items-center gap-8 my-24 h-screen">
      <div className="max-w-2xl w-full bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Contact Us
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            rows="4"
            required
            className="w-full p-3 border rounded-lg"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>

        {/* Business Details Section */}
        <div className="mt-8 border-t pt-6 text-sm text-gray-700">
          <h3 className="font-semibold mb-2">Our Contact Information</h3>
          <p>📍 Business Address: 123 Main Street, Delhi, India</p>
          <p>📞 Phone: +91 9876543210</p>
          <p>📧 Email: support@startribe.site</p>
          <p>🕒 Business Hours: Mon – Fri, 10:00 AM – 6:00 PM</p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs