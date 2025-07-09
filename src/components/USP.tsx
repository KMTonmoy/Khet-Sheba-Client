'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { FaShieldAlt, FaClock, FaRupeeSign, FaHeadset } from 'react-icons/fa';

interface USPItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const USP = () => {
  const uspItems: USPItem[] = [
    {
      icon: <FaShieldAlt className="text-3xl text-green-500" />,
      title: "গুণগত নিশ্চয়তা",
      description: "কৃষি বিশেষজ্ঞদের দ্বারা যাচাইকৃত পরামর্শ"
    },
    {
      icon: <FaClock className="text-3xl text-blue-500" />,
      title: "২৪/৭ সমর্থন",
      description: "যেকোনো সময় কৃষি বিষয়ক সহায়তা"
    },
    {
      icon: <FaRupeeSign className="text-3xl text-amber-500" />,
      title: "খরচ-কার্যকর",
      description: "সাশ্রয়ী মূল্যে প্রিমিয়াম সেবা"
    },
    {
      icon: <FaHeadset className="text-3xl text-purple-500" />,
      title: "বাংলা সমর্থন",
      description: "স্থানীয় ভাষায় বিশেষজ্ঞ পরামর্শ"
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
    hidden: { y: 20, opacity: 0 },
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
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={headerVariants}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            কেন <span className="text-green-600">ক্ষেত-সেবা</span> বেছে নেবেন?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            কৃষকের সাফল্যের জন্য আমাদের অঙ্গীকার
          </p>
        </motion.div>

        {/* USP Items Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {uspItems.map((item, index) => (
            <motion.div
              key={`usp-item-${index}`}
              variants={itemVariants}
              whileHover={{ 
                y: -5,
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
              }}
              className="bg-white p-6 md:p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 flex flex-col items-center"
            >
              <div className="mb-4 p-3 bg-green-50 rounded-full">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-center text-gray-800 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 text-center">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default USP;