'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { FaCalendarAlt, FaLeaf, FaTractor, FaSeedling } from 'react-icons/fa';

interface UpdateItem {
  id: number;
  icon: React.ReactNode;
  date: string;
  title: string;
  description: string;
  category: string;
}

const LatestUpdates = () => {
  const updates: UpdateItem[] = [
    {
      id: 1,
      icon: <FaLeaf className="text-2xl text-green-500" />,
      date: '১৫ জুন, ২০২৪',
      title: 'বর্ষা মৌসুমে ধান চাষের বিশেষ পরামর্শ',
      description: 'জেনে নিন কীভাবে অতিবৃষ্টি থেকে আপনার ধানের ক্ষেত রক্ষা করবেন',
      category: 'ধান চাষ'
    },
    {
      id: 2,
      icon: <FaTractor className="text-2xl text-blue-500" />,
      date: '২ জুন, ২০২৪',
      title: 'আধুনিক সেচ প্রযুক্তি কর্মশালা',
      description: 'ড্রিপ ইরিগেশন সিস্টেম ব্যবহার করে জলের সাশ্রয়ী পদ্ধতি শিখুন',
      category: 'প্রযুক্তি'
    },
    {
      id: 3,
      icon: <FaSeedling className="text-2xl text-amber-500" />,
      date: '২৫ মে, ২০২৪',
      title: 'জৈব সারের ব্যবহার বৃদ্ধির উপায়',
      description: 'রাসায়নিক সার ছাড়াই কীভাবে ফসলের উৎপাদন বাড়াবেন',
      category: 'জৈব কৃষি'
    }
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const headerVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={headerVariants}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            সর্বশেষ <span className="text-green-600">আপডেট</span> ও পরামর্শ
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            কৃষি সম্পর্কিত নতুন তথ্য ও নির্দেশিকা
          </p>
        </motion.div>

        {/* Updates Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {updates.map((update) => (
            <motion.div
              key={`update-${update.id}`}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-gray-50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="mr-4 p-2 bg-green-50 rounded-full">
                    {update.icon}
                  </div>
                  <div>
                    <span className="text-sm text-gray-500 flex items-center">
                      <FaCalendarAlt className="mr-1" /> {update.date}
                    </span>
                    <span className="inline-block mt-1 px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                      {update.category}
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {update.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {update.description}
                </p>
                <button className="text-green-600 hover:text-green-700 font-medium inline-flex items-center">
                  আরও পড়ুন
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg inline-flex items-center transition-colors duration-300">
            সব আপডেট দেখুন
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default LatestUpdates;