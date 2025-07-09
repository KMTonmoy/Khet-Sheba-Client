'use client'
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { FaUser, FaPhone, FaEnvelope, FaLeaf, FaComment, FaMapMarkerAlt, FaClock, FaHeadset } from 'react-icons/fa';
 
type FormData = {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
};

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('আপনার বার্তা পাঠানো হয়েছে! আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।');
    setFormData({ name: '', phone: '', email: '', service: '', message: '' });
  };

  const services: string[] = [
    "মাটি পরীক্ষা",
    "ফসল সুরক্ষা",
    "সেচ পরামর্শ",
    "বীজ ক্রয়",
    "কৃষি উপকরণ",
    "অন্যান্য"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="md:flex">
          {/* Image Section */}
          <div className="md:w-1/2 relative">
            <div className="absolute inset-0 bg-green-900/30 z-10" />
            <img
              src="https://c4.wallpaperflare.com/wallpaper/119/764/1017/green-area-farmar-valley-wallpaper-preview.jpg" // Replace with your actual image path
              alt="ক্ষেত-সেবা কৃষক"
              width={800}
              height={1000}
              className="w-full h-full object-cover"

            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-green-900/90 to-transparent p-8 z-20">
              <h2 className="text-3xl font-bold text-white mb-2">ক্ষেত-সেবা</h2>
              <p className="text-green-100">আপনার কৃষি সেবার বিশ্বস্ত সঙ্গী</p>
            </div>
          </div>

          {/* Form Section */}
          <div className="md:w-1/2 p-8 md:p-12">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-green-800 mb-2">যোগাযোগ করুন</h1>
              <p className="text-gray-600">আপনার প্রশ্ন বা পরামর্শের জন্য নিচের ফর্মটি পূরণ করুন</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Name Field */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="text-green-600" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="আপনার নাম"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                
                {/* Phone Field */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaPhone className="text-green-600" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="ফোন নম্বর"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-green-600" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="ইমেইল (ঐচ্ছিক)"
                  className="w-full pl-10 pr-4 py-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              
              {/* Service Dropdown */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLeaf className="text-green-600" />
                </div>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white"
                >
                  <option value="">সেবা নির্বাচন করুন</option>
                  {services.map((service, index) => (
                    <option key={index} value={service}>{service}</option>
                  ))}
                </select>
              </div>
              
              {/* Message Field */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 pt-3 flex items-start pointer-events-none">
                  <FaComment className="text-green-600" />
                </div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="আপনার বার্তা লিখুন"
                  required
                  rows={4}
                  className="w-full pl-10 pr-4 py-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                ></textarea>
              </div>
              
              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 shadow-lg hover:shadow-green-200"
              >
                পাঠান
              </button>
            </form>

            {/* Contact Info */}
            <div className="mt-10 space-y-4">
              <div className="flex items-center text-gray-700">
                <FaHeadset className="text-green-600 mr-3 text-xl" />
                <div>
                  <p className="font-medium">কল করুন</p>
                  <p className="text-lg font-semibold">০১৭XX-XXXXXX</p>
                </div>
              </div>
              <div className="flex items-center text-gray-700">
                <FaMapMarkerAlt className="text-green-600 mr-3 text-xl" />
                <div>
                  <p className="font-medium">ঠিকানা</p>
                  <p>ক্ষেত-সেবা অফিস, কৃষি ভবন, ঢাকা</p>
                </div>
              </div>
              <div className="flex items-center text-gray-700">
                <FaClock className="text-green-600 mr-3 text-xl" />
                <div>
                  <p className="font-medium">সময়</p>
                  <p>সকাল ৯টা - সন্ধ্যা ৬টা (শুক্রবার বন্ধ)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;