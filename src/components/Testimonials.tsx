'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  content: string;
  image: string;
}

const Testimonials = () => {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'মোহাম্মদ আলী',
      location: 'যশোর',
      rating: 5,
      content: 'ক্ষেত-সেবার পরামর্শে আমার ধানের উৎপাদন ৪০% বেড়েছে। বিশেষজ্ঞদের সরাসরি সহায়তা পেয়ে খুব উপকৃত হয়েছি।',
      image: '/images/farmer1.jpg'
    },
    {
      id: 2,
      name: 'সুমিতা রানী',
      location: 'রংপুর',
      rating: 4,
      content: 'জৈব কৃষি সম্পর্কে যে প্রশিক্ষণ পেয়েছি তা আমার চাষাবাদ পদ্ধতি সম্পূর্ণ বদলে দিয়েছে। ধন্যবাদ ক্ষেত-সেবা টিম।',
      image: '/images/farmer2.jpg'
    },
    {
      id: 3,
      name: 'করিম উদ্দিন',
      location: 'কুষ্টিয়া',
      rating: 5,
      content: 'মোবাইল অ্যাপের মাধ্যমে সার প্রয়োগের পরামর্শ পেয়ে আমার খরচ কমেছে এবং ফসলের ফলন বেড়েছে।',
      image: '/images/farmer3.jpg'
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
    hidden: { y: 50, opacity: 0 },
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
    <section className="py-16 bg-gray-50">
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
            কৃষকদের <span className="text-green-600">মতামত</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            আমাদের সেবা সম্পর্কে কৃষক ভাইয়াদের প্রতিক্রিয়া
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={`testimonial-${testimonial.id}`}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
            >
              <div className="flex items-start mb-4">
                <div className="mr-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-green-100">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{testimonial.name}</h3>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                  <div className="flex mt-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar 
                        key={i}
                        className={`text-sm ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="relative">
                <FaQuoteLeft className="text-green-100 text-3xl absolute -top-2 left-0" />
                <p className="text-gray-600 pl-8 relative z-10">
                  {testimonial.content}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;