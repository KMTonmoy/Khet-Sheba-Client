'use client'
import React, { useRef } from 'react';
import { FaLeaf, FaTint, FaChartLine, FaShoppingCart, FaPhoneAlt } from 'react-icons/fa';
import { motion, useInView, Variants } from 'framer-motion';

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Services = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const services: Service[] = [
    {
      icon: <FaLeaf className="text-3xl text-green-600" />,
      title: 'মৃত্তিকা পরীক্ষা',
      description: 'বৈজ্ঞানিক পদ্ধতিতে মাটির গুণাগুণ বিশ্লেষণ ও সুপারিশ'
    },
    {
      icon: <FaTint className="text-3xl text-blue-500" />,
      title: 'সেচ ব্যবস্থাপনা',
      description: 'জলের দক্ষ ব্যবহারে আধুনিক প্রযুক্তির পরামর্শ'
    },
    {
      icon: <FaChartLine className="text-3xl text-yellow-500" />,
      title: 'ফসল ব্যবস্থাপনা',
      description: 'মৌসুমভিত্তিক ফসলের যত্ন ও রোগ নির্ণয়'
    },
    {
      icon: <FaShoppingCart className="text-3xl text-orange-500" />,
      title: 'বাজার সংযোগ',
      description: 'ফসল বিক্রয়ের জন্য সরাসরি ক্রেতার সাথে যোগাযোগ'
    }
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <section ref={ref} className="py-16 bg-gradient-to-b from-white to-green-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            আমাদের <span className="text-green-600">সেবাসমূহ</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            কৃষকের সাফল্যের জন্য সমন্বিত সমাধান
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={`service-${index}`}
              variants={itemVariants}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100"
              whileHover={{ y: -5 }}
            >
              <div className="flex justify-center mb-4">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">
                {service.title}
              </h3>
              <p className="text-gray-600 text-center">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2 }}
          className="mt-12 text-center"
        >
          <motion.button
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-full inline-flex items-center transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaPhoneAlt className="mr-2" />
            বিনামূল্যে পরামর্শ নিন
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;